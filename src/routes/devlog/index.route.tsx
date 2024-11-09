import useMenuStore, { MenuEnum } from "@/lib/store/menu.store";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const DevLog = lazy(() => import("@/components/custom-ui/devlog/dev-log"));

export const Route = createFileRoute("/devlog/")({
	beforeLoad: () => {
		useMenuStore.getState().changeMenu(MenuEnum.DEVLOG);
	},
	component: () => <DevLog />,
});
