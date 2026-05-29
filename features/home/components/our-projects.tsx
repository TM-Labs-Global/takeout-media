"use client";

import { OurProjects as SharedOurProjects } from "@/shared/components";

/**
 * Home-specific wrapper for the shared OurProjects section.
 * This keeps the feature-sliced architecture consistent while reusing the shared UI.
 */
export function OurProjects() {
    return <SharedOurProjects />;
}

export default OurProjects;
