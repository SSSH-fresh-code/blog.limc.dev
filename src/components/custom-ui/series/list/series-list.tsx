import { Route } from "@/routes/series/index.route";
import {
	SsshDataTable,
	SsshDataTableHeader,
} from "../../common/sssh-data-table";
import { useNavigate } from "@tanstack/react-router";
import {
	SeriesListColumn,
	SeriesListOption,
} from "@/lib/schema/series/series-list.schema";
import { convertUnderbar } from "sssh-library";

function SeriesList() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();
	const deps = Route.useLoaderDeps();

	const where__topicId = deps.where__topicId as string | undefined;

	if (!data) return <></>;

	return (
		<>
			{where__topicId && (
				<>
					<div className="">
						<span
							className="font-bold text-xl mr-2 underline cursor-pointer"
							onClick={() => {
								navigate({ to: "/topic" });
							}}
							onKeyUp={() => {}}
						>
							{convertUnderbar(data.data[0].topic.name, true)}
						</span>
						<span className="font-light text-xs text-gray-400">
							주제로 쓰여진 연재물 목록
						</span>
					</div>
					<hr className="my-3" />
				</>
			)}
			<SsshDataTableHeader info={data.info}>
				<div className="flex gap-2 justify-end items-end font-light text-[10px]">
					{where__topicId ? (
						<span
							className=" flex items-end justify-end hover:underline cursor-pointer"
							onClick={() => {
								navigate({ to: "/post" });
							}}
							onKeyUp={() => {}}
						>
							검색필터 초기화
						</span>
					) : (
						<span className="text-gray-400 font-light">
							클릭시 연재물로 쓰여진 게시글 목록으로 이동합니다.
						</span>
					)}
				</div>
			</SsshDataTableHeader>
			<SsshDataTable
				data={data}
				columns={SeriesListColumn}
				options={SeriesListOption}
			/>
		</>
	);
}

export default SeriesList;
