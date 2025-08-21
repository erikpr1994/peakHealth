# CI Workflow Documentation

This document explains how the CI workflow in this repository works, particularly how it optimizes builds by only running tasks on affected packages.

## Overview

The CI workflow is designed to be efficient by only building, testing, linting, and type-checking projects that have been changed. This is achieved through a combination of git diff analysis and Turborepo's dependency graph.

## Workflow Structure

The workflow consists of several jobs:

1. **determine-affected**: Determines which packages are affected by changes
2. **setup-environment**: Sets up the environment and caches
3. **lint**: Runs linting on affected packages
4. **type-check**: Runs type checking on affected packages
5. **test**: Runs unit tests on affected packages
6. **build**: Builds affected packages
7. **yaml-lint**: Runs YAML linting if YAML files have changed

## How Affected Package Detection Works

The affected package detection is implemented in the `.github/scripts/get-affected-packages.sh` script and works as follows:

1. **Determine the base SHA**:
   - For pull requests, it uses the merge base between the PR base and head
   - For pushes to main, it considers all packages affected
   - For other pushes, it compares with the previous commit

2. **Get changed files**:
   - Uses `git diff` to get a list of files that have changed between the base SHA and the current SHA

3. **Map changed files to workspace packages**:
   - Identifies which workspace packages contain the changed files

4. **Use Turborepo to find dependent packages**:
   - Uses Turborepo's dependency graph to find all packages that depend on the directly affected packages

5. **Handle special cases**:
   - If root configuration files (package.json, pnpm-lock.yaml, turbo.json, etc.) have changed, considers all packages affected
   - If no packages are affected, returns an empty string

## Optimized Task Execution

Each job (lint, type-check, test, build) uses the list of affected packages to optimize task execution:

1. If all packages are affected (`affected=all`), runs the task on all packages
2. If specific packages are affected, creates a filter string for Turborepo to only run the task on those packages
3. If no packages are affected, skips the task

## Core Packages

The build job has special handling for core packages (`@peakhealth/ui`, `@peakhealth/auth-types`, `@peakhealth/auth-utils`):

- If any core package is affected, all core packages are built
- This ensures that dependencies between core packages are properly handled

## Debugging

The workflow includes detailed logging to help debug issues:

- Each job logs the affected packages it's processing
- The exact commands being executed are logged
- Group annotations (`::group::` and `::endgroup::`) are used to organize the logs

## Caching

The workflow uses caching to speed up builds:

- pnpm store cache
- Turborepo cache
- Build cache
- Test cache

## Troubleshooting

If the affected package detection is not working correctly:

1. Check the logs of the `determine-affected` job to see what packages were detected
2. Verify that the BASE_SHA is being calculated correctly
3. Ensure that the git history is available (not a shallow clone)
4. Check if the Turborepo filter syntax is correct for the version being used
