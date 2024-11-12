import type { SsshDataTableOptions } from "@/components/custom-ui/common/sssh-data-table";
import { truncate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { convertUnderbar, type ReadPostDto } from "sssh-library";

export const PostListColumn: ColumnDef<ReadPostDto>[] = [
	{
		header: "제목",
		accessorFn: (value) => truncate(convertUnderbar(value.title, true), 20),
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

export const PostListOption: SsshDataTableOptions<ReadPostDto> = {
	href: "/post/",
	key: "title",
	responsiveHide: ["seriesName", "createdAt"],
};
