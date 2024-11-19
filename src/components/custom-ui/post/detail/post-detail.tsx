import "github-markdown-css";
import { lazy } from "react";
import type { ReadPostDto } from "sssh-library";

const PostDetailInfo = lazy(() => import("./post-detail-info"));
const PostDetailTopic = lazy(() => import("./post-detail-topic"));
const PostDetailTitle = lazy(() => import("./post-detail-title"));
const PostDetailSeries = lazy(() => import("./post-detail-series"));
const PostDetailContent = lazy(() => import("./post-detail-content"));
const PostDetailThumbnail = lazy(() => import("./post-detail-thumbnail"));

function PostDetail({ post }: { post: ReadPostDto }) {
	return (
		<div className="markdown-body">
			<div className="flex space-x-1">
				<PostDetailTopic topic={post.topic} />
				{post.series && <PostDetailSeries series={post.series} />}
			</div>
			<PostDetailTitle title={post.title} />
			<PostDetailInfo author={post.author} time={post.createdAt} />
			{post.thumbnail && (
				<PostDetailThumbnail
					href={post.thumbnail}
					alt={`${post.title}-썸네일`}
				/>
			)}
			<PostDetailContent content={post.content} />
		</div>
	);
}

export default PostDetail;
