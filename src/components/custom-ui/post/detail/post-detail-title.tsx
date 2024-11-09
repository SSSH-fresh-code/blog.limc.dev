import { convertUnderbar } from "sssh-library";

function PostDetailTitle({ title }: { title: string }) {
	return (
		<>
			<h1>{convertUnderbar(title, true)}</h1>
			<hr className="top-hr" />
		</>
	);
}

export default PostDetailTitle;
