import { Route } from "@/routes/post/index.route";
import {
	SsshDataTable,
	SsshDataTableHeader,
} from "../../common/sssh-data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
	PostListColumn,
	PostListOption,
} from "@/lib/schema/post/post-list.schema";

function PostList() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();
	const { where__topicId, where__seriesId, where__authorName } =
		Route.useLoaderDeps();

	const isFiltering =
		!!where__topicId || !!where__seriesId || !!where__authorName;

	if (!data) return <></>;

	return (
		<>
			<SsshDataTableHeader info={data.info}>
				<div className="flex gap-2 justify-end items-end">
					{isFiltering && (
						<Button
							variant="link"
							className="font-light text-[11px] flex items-end justify-end"
							onClick={() => {
								navigate({ to: "/post" });
							}}
						>
							검색필터 초기화
						</Button>
					)}
				</div>
			</SsshDataTableHeader>
			<SsshDataTable
				data={data}
				columns={PostListColumn}
				options={PostListOption}
			/>
		</>
	);
}

export default PostList;
