import { lazy } from "react";
import { Route } from "@/routes/index.route";

const PostDetail = lazy(() => import("./post/post-detail"));
const PostDetailEmpty = lazy(() => import("./post/post-detail-empty"));

function MainPage() {
	const { data } = Route.useLoaderData();

	if (!data) return <PostDetailEmpty />;

	return (
		<>
			<PostDetail post={data.data[0]} />
		</>
	);
}

export default MainPage;
