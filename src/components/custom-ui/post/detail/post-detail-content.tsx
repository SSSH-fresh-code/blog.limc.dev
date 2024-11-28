import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function PostDetailContent({ content }: { content: string }) {
	return (
		<Markdown
			rehypePlugins={[rehypeHighlight]}
			components={{
				img: ({ node, ...props }) => (
					<>
						<img
							{...props}
							alt={props.alt}
							loading="lazy"
							style={{ margin: "0 auto", objectFit: "scale-down" }}
						/>
						<div
							style={{
								textAlign: "center",
								color: "gray",
								fontSize: "0.9em",
								paddingBottom: "10px",
							}}
						>
							{props.alt}
						</div>
					</>
				),
			}}
		>
			{content}
		</Markdown>
	);
}

export default PostDetailContent;
