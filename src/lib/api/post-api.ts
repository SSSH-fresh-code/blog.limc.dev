import { req } from "../api";
import type { Page, ReadPostDto } from "sssh-library";

/**
 * 게시글 리스트 조회 key
 */
export const readPostsKey = (params: Record<string, unknown>) => [
	"log",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
];

/**
 * 게시글 리스트 조회 api - get /post
 * @param readLogKey params
 */
export const readPostsApi = (params: Record<string, unknown>) =>
	req<Page<ReadPostDto>>("post", "get", params);
