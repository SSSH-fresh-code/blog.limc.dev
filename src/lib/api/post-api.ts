import { req } from "../api";
import type { Page, ReadPostDto } from "sssh-library";

/**
 * 게시글 리스트 조회 key
 */
export const readPostsKey = (params: Record<string, unknown>) => [
	"post",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
	params.where__topicId,
	params.where__seriesId,
	params.where__authorName,
	params.like__title,
	params.like__content,
];

/**
 * 게시글 리스트 조회 api - get /post
 * @param readLogKey params
 */
export const readPostsApi = (params: Record<string, unknown>) =>
	req<Page<ReadPostDto>>("post", "get", params);

/**
 * 게시글 조회 key
 */
export const readPostKey = (title: string) => ["post", "single", title];

/**
 * 게시글 조회 api - get /post
 * @param readLogKey params
 */
export const readPostApi = (title: string) =>
	req<ReadPostDto>(`post/${title}`, "get");
