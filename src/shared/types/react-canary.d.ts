/*
 * `ViewTransition` ships in React's canary channel, and the App Router already
 * runs on it: `react@19.2.4`'s own runtime does not export the component, but
 * Next aliases `react` to its vendored copy, which does. So the import works
 * and only the types are missing.
 *
 * A triple-slash reference rather than `"types": ["react/canary"]` in
 * tsconfig. That field is a replacement, not an addition — writing it would
 * stop `@types/node` and `@types/react` from being picked up automatically and
 * take `process` and the JSX namespace down with it.
 */
/// <reference types="react/canary" />
