import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/routes/topic/index.route";
import { useNavigate } from "@tanstack/react-router";
import { SsshDataTablePagination } from "../../common/sssh-data-table";
import { convertUnderbar } from "sssh-library";

function TopicList() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();

	if (!data) return <></>;

	return (
		<div className="grid grid-cols-1 p-5 gap-5 sm:grid-cols-2">
			{data.data.map((topic) => (
				<Card key={topic.id}>
					<CardHeader>
						<span className="text-sm text-gray-400">주제명</span>
						<CardTitle className="text-3xl font-bold">
							{convertUnderbar(topic.name, true)}
						</CardTitle>
					</CardHeader>
					<CardContent className="mt-auto flex flex-col w-full items-end p-3 gap-2">
						<Button
							className="w-full bg-gray-700"
							onClick={() =>
								navigate({ to: `/series?where__topicId=${topic.id}` })
							}
						>
							해당 주제의 연재물 목록
						</Button>
						<Button
							className="w-full bg-gray-500"
							onClick={() =>
								navigate({ to: `/post?where__topicId=${topic.id}` })
							}
						>
							해당 주제의 게시글 목록
						</Button>
					</CardContent>
				</Card>
			))}
			<div className="col-span-1 sm:col-span-2">
				<SsshDataTablePagination info={data.info} href="/topic" />
			</div>
		</div>
	);
}

export default TopicList;
