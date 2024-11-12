import { AvatarIcon, TimerIcon } from "@radix-ui/react-icons";
import type { ReadUserDto } from "sssh-library";

function PostDetailInfo({
	author,
	time,
}: { author: ReadUserDto; time: string }) {
	return (
		<div className="flex justify-between text-[13px] text-gray-400 font-light date">
			<span className="flex items-center">
				<AvatarIcon className="mr-1 w-5 h-5" /> {author.name}
			</span>
			<span className="flex items-center">
				<TimerIcon className="mr-1 font-bold" />{" "}
				<span>{new Date(time).toLocaleString()}</span>
			</span>
		</div>
	);
}

export default PostDetailInfo;
