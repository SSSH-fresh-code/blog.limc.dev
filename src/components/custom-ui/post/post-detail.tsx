import "github-markdown-css";
import { lazy } from "react";
import type { ReadPostDto } from "sssh-library";

const PostDetailInfo = lazy(() => import("./post-detail-info"));
const PostDetailTopic = lazy(() => import("./detail/post-detail-topic"));
const PostDetailTitle = lazy(() => import("./detail/post-detail-title"));
const PostDetailSeries = lazy(() => import("./detail/post-detail-series"));
const PostDetailContent = lazy(() => import("./detail/post-detail-content"));
const PostDetailThumbnail = lazy(
	() => import("./detail/post-detail-thumbnail"),
);

function PostDetail({ post }: { post: ReadPostDto }) {
	return (
		<div className="markdown-body">
			{post.thumbnail && (
				<PostDetailThumbnail
					href={post.thumbnail}
					alt={`${post.title}-썸네일`}
				/>
			)}
			<div className="flex space-x-1">
				<PostDetailTopic topic={post.topic} />
				{post.series && <PostDetailSeries series={post.series} />}
			</div>
			<PostDetailTitle title={post.title} />
			<PostDetailInfo author={post.author} time={post.createdAt} />
			<PostDetailContent content={post.content} />
		</div>
	);
}

export default PostDetail;
