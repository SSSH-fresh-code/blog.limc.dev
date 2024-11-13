import { req } from "../api";
import type { Page, ReadSeriesDto } from "sssh-library";

/**
 * 시리즈 리스트 조회 key
 */
export const readSeriesListKey = (params: Record<string, unknown>) => [
	"series",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
	params.where__topicId,
];

/**
 * 시리즈 리스트 조회 api
 */
export const readSeriesListApi = (params: Record<string, unknown>) =>
	req<Page<ReadSeriesDto>>("series", "get", params);

/**
 * 시리즈 조회 key
 */
export const readSeriesKey = (name: string) => ["series", "single", name];

/**
 * 시리즈 조회 api
 */
export const readSeriesApi = (name: string) =>
	req<ReadSeriesDto>(`series/${name}`, "get");
