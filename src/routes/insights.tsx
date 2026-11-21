import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout for the /insights section.
//
// The index and the article pages are siblings under this route, so this
// component has to render an <Outlet />. Without it the index page renders
// for every article URL and the article body never reaches the page.
export const Route = createFileRoute("/insights")({ component: InsightsLayout });

function InsightsLayout() { return <Outlet />; }
