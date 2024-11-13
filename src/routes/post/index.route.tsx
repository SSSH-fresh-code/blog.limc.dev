import { readPostsApi, readPostsKey } from "@/lib/api/post-api";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const PostList = lazy(
	() => import("@/components/custom-ui/post/list/post-list"),
);

export const Route = createFileRoute("/post/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.POST);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> = {
			page: Number(search.page ?? 1),
			take: Number(search.take ?? 10),
			orderby: search.oderby ? String(search.orderby) : "createdAt",
			direction: search.direction ? String(search.direction) : "desc",
		};

		if (search.where__topicId) result.where__topicId = search.where__topicId;
		if (search.where__seriesId) result.where__seriesId = search.where__seriesId;
		if (search.where__authorName)
			result.where__authorName = search.where__authorName;
		if (search.like__title) result.like__title = search.like__title;
		if (search.like__content) result.like__content = search.like__content;

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const postQueryOptions = queryOptions({
			queryKey: readPostsKey(deps),
			queryFn: () => readPostsApi(deps),
		});

		return await queryClient.ensureQueryData(postQueryOptions);
	},
	component: () => <PostList />,
});
