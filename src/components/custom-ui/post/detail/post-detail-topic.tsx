import { Badge } from "@/components/ui/badge";
import type { ReadTopicDto } from "sssh-library";

function PostDetailTopic({ topic }: { topic: ReadTopicDto }) {
	const onClick = () => {
		if (confirm(`'${topic.name}' 주제 정보로 이동하시겠습니까?`)) {
		}
	};
	return (
		<Badge onClick={onClick} className="bg-gray-500 cursor-pointer">
			{topic.name}
		</Badge>
	);
}

export default PostDetailTopic;
