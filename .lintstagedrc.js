module.exports = {
  // Run ESLint on changes to JavaScript/TypeScript files
  "**/*.(ts|tsx|js|jsx)": (filenames) => `pnpm eslint --fix ${filenames.join(" ")}`,

  // Run Prettier on changes to any file
  "**/*.*": (filenames) => `pnpm prettier --write ${filenames.join(" ")}`,
};
