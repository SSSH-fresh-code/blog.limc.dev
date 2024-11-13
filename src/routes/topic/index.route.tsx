import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { readTopicListApi, readTopicListKey } from "@/lib/api/topic-api";

const TopicList = React.lazy(
	() => import("@/components/custom-ui/topic/list/topic-list"),
);

export const Route = createFileRoute("/topic/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.TOPIC);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> = {
			page: Number(search.page ?? 1),
			take: Number(search.take ?? 10),
			orderby: search.oderby ? String(search.orderby) : "createdAt",
			direction: search.direction ? String(search.direction) : "desc",
		};

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const topicQueryOptions = queryOptions({
			queryKey: readTopicListKey(deps),
			queryFn: () => readTopicListApi(deps),
		});

		return await queryClient.ensureQueryData(topicQueryOptions);
	},
	component: () => <TopicList />,
});
