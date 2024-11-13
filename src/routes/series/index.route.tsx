import { readSeriesListApi, readSeriesListKey } from "@/lib/api/series-api";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const SeriesList = lazy(
	() => import("@/components/custom-ui/series/list/series-list"),
);

export const Route = createFileRoute("/series/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.SERIES);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> = {
			page: Number(search.page ?? 1),
			take: Number(search.take ?? 10),
			orderby: search.oderby ? String(search.orderby) : "createdAt",
			direction: search.direction ? String(search.direction) : "desc",
		};

		if (search.where__topicId) result.where__topicId = search.where__topicId;
		if (search.like__name) result.like__name = search.like__name;

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const seriesQueryOptions = queryOptions({
			queryKey: readSeriesListKey(deps),
			queryFn: () => readSeriesListApi(deps),
		});

		return await queryClient.ensureQueryData(seriesQueryOptions);
	},
	component: () => <SeriesList />,
});
