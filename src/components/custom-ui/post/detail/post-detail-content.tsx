import Markdown from "react-markdown";

function PostDetailContent({ content }: { content: string }) {
	return <Markdown>{content}</Markdown>;
}

export default PostDetailContent;
