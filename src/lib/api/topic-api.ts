import { req } from "../api";
import type { Page, ReadTopicDto } from "sssh-library";

/**
 * 주제 리스트 조회 key
 */
export const readTopicListKey = (params: Record<string, unknown>) => [
	"topic",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
];

/**
 * 주제 리스트 조회 api
 */
export const readTopicListApi = (params: Record<string, unknown>) =>
	req<Page<ReadTopicDto>>("topic", "get", params);
