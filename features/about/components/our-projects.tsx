"use client";

import { OurProjects as SharedOurProjects } from "@/shared/components";

/**
 * About-specific wrapper for the shared OurProjects section.
 * Reuses the core logic while keeping the feature-specific entry point.
 */
export function OurProjects() {
    return <SharedOurProjects />;
}

export default OurProjects;
