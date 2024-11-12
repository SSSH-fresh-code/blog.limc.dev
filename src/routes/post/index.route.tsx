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
	loaderDeps: () => {
		const dto: Record<string, unknown> = {
			page: 1,
			take: 10,
			orderby: "createdAt",
			direction: "desc",
		};

		return dto;
	},
	loader: async ({ deps, context: { queryClient } }) => {
		const postQueryOptions = queryOptions({
			queryKey: readPostsKey(deps),
			queryFn: () => readPostsApi(deps),
		});

		return await queryClient.ensureQueryData(postQueryOptions);
	},
	component: () => <PostList />,
});
