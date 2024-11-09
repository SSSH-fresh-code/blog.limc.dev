import { Badge } from "@/components/ui/badge";
import type { ReadSeriesDto } from "sssh-library";

function PostDetailSeries({ series }: { series: ReadSeriesDto }) {
	// const navigate = useNavigate();

	const onClick = () => {
		if (confirm(`'${series.name}' 시리즈 정보로 이동하시겠습니까?`)) {
		}
	};

	return (
		<Badge onClick={onClick} className="bg-gray-400 cursor-pointer">
			{series.name}
		</Badge>
	);
}

export default PostDetailSeries;
