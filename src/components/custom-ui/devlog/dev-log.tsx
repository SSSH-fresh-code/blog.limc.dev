import { Badge } from "@/components/ui/badge";
import "github-markdown-css";

function DevLog() {
	return (
		<>
			<div className="markdown-body">
				<Badge className="bg-green-500 cursor-pointer">개발일지</Badge>
				<h1>싱싱상회 블로그 개발일지</h1>
				<hr />
				<p>
					<h2>2024.11.10</h2>
					<ul>
						<li> 메인 페이지 제작</li>
						<li> 개발록 페이지 제작</li>
						<li> 게시글 컴포넌트 제작</li>
						<li> 헤더 컴포넌트 제작</li>
						<li> git commit -m "initial commit"</li>
					</ul>
				</p>
			</div>
		</>
	);
}

export default DevLog;
