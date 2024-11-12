import { readPostApi, readPostKey } from "@/lib/api/post-api";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const PostDetail = lazy(
	() => import("@/components/custom-ui/post/detail/post-detail"),
);
const PostDetailEmpty = lazy(
	() => import("@/components/custom-ui/post/detail/post-detail-empty"),
);

export const Route = createFileRoute("/post/$title/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.POST);
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
	loader: async ({ params, context: { queryClient } }) => {
		const { title } = params;

		const postQueryOptions = queryOptions({
			queryKey: readPostKey(title),
			queryFn: () => readPostApi(title),
		});

		return await queryClient.ensureQueryData(postQueryOptions);
	},
	component: () => {
		const { data } = Route.useLoaderData();

		if (!data) return <PostDetailEmpty />;

		return <PostDetail post={data} />;
	},
});
