module.exports = {
  // Only process files in the current directory and immediate subdirectories
  // Use more restrictive patterns to avoid node_modules
  './*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  './*.{json,css,md}': 'prettier --write',
  './apps/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  './apps/**/*.{json,css,md}': 'prettier --write',
  './packages/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  './packages/**/*.{json,css,md}': 'prettier --write',
};
