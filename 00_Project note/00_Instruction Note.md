# Project Instructions

## Workflow: Revising Note System

For every task requested by the user, the agent will follow this process:

1.  **Summarize Task**: Before starting, summarize the new requirements in the `02_Revising note.md` file using a checkbox list.
2.  **Date Headers**: Use Date headers (e.g., `## 2026-01-10`) to organize notes.
3.  **Execute & Update**: As tasks are completed, mark the corresponding checkbox as checked (`[x]`).
4.  **Persistence**: This file serves as the primary history of all revisions. Always maintain the same format.
5.  **English Naming**: Ensure all project note filenames are in English.

## UI/UX Specifics
- **Mouse Cursor**: The default mouse cursor should be hidden whenever it is over the poster container. No custom cursor icon is needed at this time.
- **Scroll Lock**: The app should use `100dvh` and `overflow: hidden` on the root elements to prevent accidental scrolling on mobile/small screens.

## Release Management
- **Versioning**: Follow Semantic Versioning (`vMajor.Minor.Patch`).
  - Major: Large changes or total redesigns.
  - Minor: New features or significant tweaks.
  - Patch: Bug fixes and minor layout adjustments.
- **Branch**: Always use the `main` branch as the target for new releases.
