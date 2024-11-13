import type { SsshDataTableOptions } from "@/components/custom-ui/common/sssh-data-table";
import { truncate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { convertUnderbar } from "sssh-library";
import type { ReadSeriesDto } from "sssh-library";

export const SeriesListColumn: ColumnDef<ReadSeriesDto>[] = [
	{
		id: "name",
		header: "연재명",
		accessorFn: (value) => truncate(convertUnderbar(value.name, true), 20),
	},
	{
		id: "topicName",
		header: "주제",
		accessorFn: (value) => truncate(convertUnderbar(value.topic.name, true), 7),
	},
	{
		id: "createdAt",
		header: "생성일시",
		accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
	},
];

export const SeriesListOption: SsshDataTableOptions<ReadSeriesDto> = {
	href: "/post?where__seriesId=",
	key: "id",
	responsiveHide: ["createdAt"],
};
