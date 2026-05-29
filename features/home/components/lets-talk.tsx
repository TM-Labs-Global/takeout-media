"use client";

import { LetsTalk as SharedLetsTalk } from "@/shared/components";

/**
 * Home-specific wrapper for the shared LetsTalk section.
 * This keeps the feature-sliced architecture consistent while reusing the shared UI.
 */
export function LetsTalk() {
    return <SharedLetsTalk />;
}

export default LetsTalk;
