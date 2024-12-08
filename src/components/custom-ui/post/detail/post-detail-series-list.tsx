import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { readPostsApi, readPostsKey } from "@/lib/api/post-api";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
	type ReadPostDto,
	type ReadSeriesDto,
	convertUnderbar,
} from "sssh-library";

function PostDetailSeriesList({
	series,
	postTitle,
	postThumbnail,
}: { series: ReadSeriesDto; postTitle: string; postThumbnail: string }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [postList, setPostList] = useState<ReadPostDto[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const postListOption = {
		page: 1,
		take: 9999,
		orderBy: "id",
		direction: "asc",
		where__seriesId: series.id,
	};

	const postQueryOptions = queryOptions({
		queryKey: readPostsKey(postListOption),
		queryFn: () => readPostsApi(postListOption),
	});

	useEffect(() => {
		queryClient.ensureQueryData(postQueryOptions).then(({ data }) => {
			setPostList(data?.data ?? []);
		});
	}, [queryClient, postQueryOptions]);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className={!postThumbnail ? "mb-3" : ""}
		>
			<CollapsibleTrigger className="w-full">
				<div
					className={`w-full flex text-[.8em] font-semibold items-center justify-between bg-gray-100 py-2 px-4 rounded-md ${
						isOpen ? "rounded-b-none" : ""
					}`}
				>
					<span>연재물 | {convertUnderbar(series.name, true)}</span>
					{isOpen ? (
						<ChevronUpIcon className="w-5 h-5" />
					) : (
						<ChevronDownIcon className="w-5 h-5" />
					)}
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="flex flex-col bg-gray-200 p-2 rounded-md rounded-t-none text-sm">
					<ol className="!mb-0">
						{postList.map((post) => {
							if (postTitle === post.title) {
								return (
									<li key={post.id} className="font-bold underline">
										{convertUnderbar(post.title, true)}
									</li>
								);
							}
							return (
								<li
									key={post.id}
									onClick={() => {
										navigate({ to: `/post/${post.title}` });
										setIsOpen(false);
									}}
									onKeyDown={() => {}}
									className="cursor-pointer hover:underline"
								>
									{convertUnderbar(post.title, true)}
								</li>
							);
						})}
					</ol>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

export default PostDetailSeriesList;
