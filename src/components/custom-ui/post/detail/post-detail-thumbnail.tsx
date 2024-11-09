import { AspectRatio } from "@radix-ui/react-aspect-ratio";

function PostDetailThumbnail({ href, alt }: { href: string; alt: string }) {
	return (
		<div className="py-6">
			<AspectRatio ratio={8 / 4} className="bg-muted">
				<img
					alt={alt}
					src={href}
					className="h-full w-full rounded-md object-cover"
				/>
			</AspectRatio>
		</div>
	);
}

export default PostDetailThumbnail;
