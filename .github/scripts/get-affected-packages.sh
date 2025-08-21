#!/bin/bash
set -e

# This script determines which packages in the monorepo are affected by changes
# It uses a combination of git diff and Turborepo's dependency graph

# Usage: ./get-affected-packages.sh [base_sha]
# If base_sha is not provided, it will be calculated based on the event type

# Function to log with timestamp
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Determine the base SHA to compare against
if [ -n "$1" ]; then
  BASE_SHA="$1"
  log "Using provided BASE_SHA: ${BASE_SHA}"
elif [[ "$GITHUB_EVENT_NAME" == "pull_request" ]]; then
  BASE_SHA=$(git merge-base "$GITHUB_EVENT_PULL_REQUEST_BASE_SHA" "$GITHUB_SHA")
  log "PR detected. Using merge-base: ${BASE_SHA}"
else
  # For push to main or other events, use the previous commit
  BASE_SHA=$(git rev-parse HEAD~1)
  log "Push detected. Using previous commit: ${BASE_SHA}"
fi

log "Current SHA: ${GITHUB_SHA}"
log "Base SHA: ${BASE_SHA}"

# Step 1: Get list of changed files
log "Getting list of changed files..."
CHANGED_FILES=$(git diff --name-only "${BASE_SHA}" "${GITHUB_SHA}" || echo "")

if [ -z "$CHANGED_FILES" ]; then
  log "No changed files detected. This might be an issue with git history."
  log "Checking if this is a shallow clone..."
  
  if git rev-parse --is-shallow-repository; then
    log "This is a shallow repository. Fetching more history..."
    git fetch --prune --unshallow
    
    # Try again with more history
    CHANGED_FILES=$(git diff --name-only "${BASE_SHA}" "${GITHUB_SHA}" || echo "")
    
    if [ -z "$CHANGED_FILES" ]; then
      log "Still no changed files detected after fetching more history."
      echo "all"
      exit 0
    fi
  else
    log "Not a shallow repository, but still no changed files detected."
    echo "all"
    exit 0
  fi
fi

log "Changed files:"
echo "$CHANGED_FILES"

# Step 2: Map changed files to workspace packages
log "Mapping changed files to workspace packages..."

# Get all workspace packages
WORKSPACE_PACKAGES=$(find apps packages -maxdepth 2 -type f -name "package.json" | grep -v "node_modules" | xargs dirname)

# Initialize affected packages array
AFFECTED_PACKAGES=()

# Check each workspace package
for PACKAGE_PATH in $WORKSPACE_PACKAGES; do
  PACKAGE_NAME=$(node -e "console.log(require('./${PACKAGE_PATH}/package.json').name || '')")
  
  if [ -z "$PACKAGE_NAME" ]; then
    log "Warning: Could not determine package name for ${PACKAGE_PATH}"
    continue
  fi
  
  # Check if any changed file is in this package
  for FILE in $CHANGED_FILES; do
    if [[ "$FILE" == "$PACKAGE_PATH"/* ]]; then
      log "Package affected by changed file: ${PACKAGE_NAME} (${FILE})"
      AFFECTED_PACKAGES+=("$PACKAGE_NAME")
      break
    fi
  done
done

# Step 3: Use Turborepo to find dependent packages
log "Using Turborepo to find dependent packages..."

# Create a temporary file with the list of directly affected packages
TEMP_FILE=$(mktemp)
printf "%s\n" "${AFFECTED_PACKAGES[@]}" > "$TEMP_FILE"

# Use Turborepo to get the full list of affected packages including dependencies
if [ ${#AFFECTED_PACKAGES[@]} -gt 0 ]; then
  log "Directly affected packages: ${AFFECTED_PACKAGES[*]}"
  
  # Create a filter string for Turborepo
  FILTER_STRING=""
  for PKG in "${AFFECTED_PACKAGES[@]}"; do
    FILTER_STRING="${FILTER_STRING}${PKG}..."
    if [ "$PKG" != "${AFFECTED_PACKAGES[-1]}" ]; then
      FILTER_STRING="${FILTER_STRING} "
    fi
  done
  
  if [ -n "$FILTER_STRING" ]; then
    log "Running Turborepo with filter: $FILTER_STRING"
    
    # Run Turborepo to get all affected packages including dependencies
    TURBO_OUTPUT=$(pnpm turbo run build --filter="$FILTER_STRING" --dry-run=json 2>/dev/null || echo '{"tasks": []}')
    DEPENDENT_PACKAGES=$(echo "$TURBO_OUTPUT" | jq -r '.tasks[] | .package // empty' 2>/dev/null | sort -u | tr '\n' ',' | sed 's/,$//')
    
    if [ -n "$DEPENDENT_PACKAGES" ]; then
      log "All affected packages (including dependencies): $DEPENDENT_PACKAGES"
      echo "$DEPENDENT_PACKAGES"
    else
      log "No dependent packages found or Turborepo error. Falling back to directly affected packages."
      echo "${AFFECTED_PACKAGES[*]}" | tr ' ' ','
    fi
  else
    log "No filter string created. Falling back to directly affected packages."
    echo "${AFFECTED_PACKAGES[*]}" | tr ' ' ','
  fi
else
  log "No directly affected packages found."
  
  # Check if any root files changed that might affect all packages
  ROOT_CONFIG_CHANGED=$(echo "$CHANGED_FILES" | grep -E '^(package.json|pnpm-lock.yaml|turbo.json|tsconfig.*\.json)$' || true)
  
  if [ -n "$ROOT_CONFIG_CHANGED" ]; then
    log "Root configuration files changed, affecting all packages:"
    echo "$ROOT_CONFIG_CHANGED"
    echo "all"
  else
    log "No packages affected."
    echo ""
  fi
fi

# Clean up
rm -f "$TEMP_FILE"

