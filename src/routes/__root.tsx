import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { lazy } from "react";

const App = lazy(() => import("@/App"));

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => <App />,
	preloadStaleTime: 0,
});
