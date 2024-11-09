import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import type { Menu } from "@/lib/store/menu.store";
import SSSH from "../../../assets/sssh.svg";
import { useNavigate } from "@tanstack/react-router";
import type { UseNavigateResult } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function HeaderMenu({
	className,
	menu,
	move,
}: { className: string; menu: Menu; move: UseNavigateResult<string> }) {
	return (
		<span
			onClick={() => move({ to: `/${menu.path}` })}
			onKeyDown={() => {}}
			className={className}
		>
			{menu.name}
		</span>
	);
}

function Header() {
	const navigate = useNavigate();
	const { current } = useMenuStore();

	const cn = "cursor-pointer mr-5 w-[125px] border-black";
	const [className, setClassName] = useState<string>(cn);

	useEffect(() => {
		if (current.name === MenuEnum.HOME.name) {
			setClassName(`${cn} border-b-4`);
		} else {
			setClassName(cn);
		}
	}, [current]);

	return (
		<div className="p-[15px] pt-0 flex items-end justify-between">
			<img
				className={className}
				src={SSSH}
				alt="Home Icon"
				onClick={() => navigate({ to: "/" })}
				onKeyDown={() => {}}
			/>
			<div className="pb-[5px] text-[0.9em] flex space-x-3">
				{Object.keys(MenuEnum).map((k) => {
					if (k === "HOME") return <></>;
					const menu = MenuEnum[k];

					let cl =
						"cursor-pointer hover:border-black border-b whitespace-nowrap";

					if (current.name === menu.name) cl = `${cl} border-black`;

					return (
						<HeaderMenu
							className={cl}
							menu={menu}
							move={navigate}
							key={`menu-${k}`}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Header;
