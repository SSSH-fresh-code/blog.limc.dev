import { readPostApi, readPostKey } from "@/lib/api/post-api";
import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { Helmet } from "react-helmet";
import { convertUnderbar } from "sssh-library";

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

		return (
			<>
				<Helmet>
					<title>{convertUnderbar(data.title, true)} - 싱싱상회</title>
					{data.series ? (
						<meta
							name="description"
							content={`${data.topic.name}-${data.series.name}시리즈로 작성된 게시글입니다.`}
						/>
					) : (
						<meta
							name="description"
							content={`${data.topic.name}주제로 작성된 게시글입니다.`}
						/>
					)}
					<meta
						name="keywords"
						content={data.title
							.replace(/[^가-힣a-zA-Z0-9]/g, "-")
							.split("-")
							.filter((t) => t)
							.join(",")}
					/>
					<meta property="og:title" content={data.title} />
					{data.series ? (
						<meta
							name="og:description"
							content={`${data.topic.name}-${data.series.name}시리즈로 작성된 게시글입니다.`}
						/>
					) : (
						<meta
							name="og:description"
							content={`${data.topic.name}주제로 작성된 게시글입니다.`}
						/>
					)}
					{data.thumbnail && (
						<meta property="og:image" content={data.thumbnail} />
					)}
				</Helmet>
				<PostDetail post={data} />;
			</>
		);
	},
});
