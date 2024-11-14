import { lazy } from "react";
import { Route } from "@/routes/index.route";

const PostDetail = lazy(() => import("./post/detail/post-detail"));
const PostDetailEmpty = lazy(() => import("./post/detail/post-detail-empty"));

function MainPage() {
	const { data } = Route.useLoaderData();

	if (!data || data.data.length < 1) return <PostDetailEmpty />;

	return <PostDetail post={data.data[0]} />;
}

export default MainPage;
