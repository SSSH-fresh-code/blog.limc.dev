import { CircleBackslashIcon } from "@radix-ui/react-icons";

function PostDetailEmpty() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center text-center space-y-3">
			<CircleBackslashIcon className="text-gray-500 w-20 h-20" />
			<span className="text-gray-500 line-h leading-6">
				찾는 게시글이 없습니다.
				<br />
				게시글이 삭제되었거나, 잘못된 경로로 진입하셨습니다.
			</span>
		</div>
	);
}

export default PostDetailEmpty;
