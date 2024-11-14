import { Route } from "@/routes/post/index.route";
import {
	SsshDataTable,
	SsshDataTableHeader,
} from "../../common/sssh-data-table";
import { useNavigate } from "@tanstack/react-router";
import {
	PostListColumn,
	PostListOption,
} from "@/lib/schema/post/post-list.schema";
import { convertUnderbar } from "sssh-library";

function PostList() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();
	const deps = Route.useLoaderDeps();

	if (!data) return <></>;

	let isFiltering = false;
	const param = Object.keys(deps)
		.map((key) => {
			const depsKey = [
				"where__topicId",
				"where__seriesId",
				"where__authorName",
			];

			if (depsKey.includes(key)) {
				const value = deps[key];

				if (value) {
					isFiltering = true;
					return `${key}=${value}`;
				}
			}

			return "";
		})
		.filter((text) => text !== "")
		.join("&");

	return (
		<>
			{deps.where__seriesId && (
				<>
					<div className="">
						<span
							className="font-bold text-xl mr-2 underline cursor-pointer"
							onClick={() => {
								navigate({ to: "/series" });
							}}
							onKeyUp={() => {}}
						>
							{convertUnderbar(data.data[0].series?.name ?? "", true)}
						</span>
						<span className="font-light text-xs text-gray-400">
							로 연재중인 게시글 목록
						</span>
					</div>
					<hr className="my-3" />
				</>
			)}
			{deps.where__topicId && (
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
							주제로 쓰여진 게시글 목록
						</span>
					</div>
					<hr className="my-3" />
				</>
			)}
			<SsshDataTableHeader info={data.info}>
				<div className="flex gap-2 justify-end items-end">
					{isFiltering && (
						<span
							className="font-light text-[11px] flex items-end justify-end hover:underline cursor-pointer"
							onClick={() => {
								navigate({ to: "/post" });
							}}
							onKeyUp={() => {}}
						>
							검색필터 초기화
						</span>
					)}
				</div>
			</SsshDataTableHeader>
			<SsshDataTable
				data={data}
				columns={PostListColumn}
				options={PostListOption}
				param={param}
			/>
		</>
	);
}

export default PostList;
