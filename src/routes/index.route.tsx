import { readPostsApi, readPostsKey } from "@/lib/api/post-api";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const MainPage = lazy(() => import("@/components/custom-ui/main-page"));

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.HOME);
	},
	loaderDeps: () => {
		const dto: Record<string, unknown> = {
			page: 1,
			take: 1,
			orderby: "createdAt",
			direction: "desc",
		};

		return dto;
	},
	loader: async ({ deps, context: { queryClient } }) => {
		const seriesQueryOptions = queryOptions({
			queryKey: readPostsKey(deps),
			queryFn: () => readPostsApi(deps),
		});

		return await queryClient.ensureQueryData(seriesQueryOptions);
	},
	component: () => <MainPage />,
});
