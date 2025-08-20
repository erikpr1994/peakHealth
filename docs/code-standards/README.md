# PeakHealth Code Standards

This directory contains documentation for the code standards and best practices used in the PeakHealth codebase. These standards ensure consistency, maintainability, and quality across the codebase.

## Standards Documents

- [Naming Conventions](./naming-conventions.md) - Standards for naming files, components, variables, and more
- [Code Organization](./code-organization.md) - Standards for organizing code within files and directories
- [CSS Modules](./css-modules.md) - Standards for using CSS Modules for styling
- [Error Handling](./error-handling.md) - Standards for handling errors consistently
- [State Management](./state-management.md) - Standards for managing state in React components
- [Cursor Rules](./cursor-rules.md) - Standards for cursor behavior in the UI

## Purpose

These standards serve several important purposes:

1. **Consistency**: Ensure that code looks and behaves consistently across the codebase
2. **Maintainability**: Make it easier to maintain and update code over time
3. **Onboarding**: Help new developers understand the codebase more quickly
4. **Quality**: Promote best practices that lead to higher quality code
5. **Efficiency**: Reduce the time spent on decisions about code style and organization

## How to Use These Standards

1. **Read Before Coding**: Familiarize yourself with these standards before writing code
2. **Reference During Code Reviews**: Use these standards as a reference during code reviews
3. **Update as Needed**: Suggest updates to these standards as the codebase evolves
4. **Automate When Possible**: Use linting and formatting tools to enforce these standards

## Contributing to Standards

If you have suggestions for improving these standards:

1. Discuss the proposed changes with the team
2. Create a PR with the changes
3. Update any related tooling (linters, formatters, etc.)
4. Communicate the changes to the team

## Enforcement

These standards are enforced through:

1. **Code Reviews**: Reviewers should check for adherence to these standards
2. **Linting**: ESLint and other linting tools are configured to enforce many of these standards
3. **Formatting**: Prettier is configured to enforce formatting standards
4. **CI/CD**: Continuous integration checks ensure that standards are met before code is merged

## Exceptions

There may be cases where it makes sense to deviate from these standards. In such cases:

1. Discuss the exception with the team
2. Document the reason for the exception in the code
3. Ensure that the exception doesn't create inconsistency in the codebase
