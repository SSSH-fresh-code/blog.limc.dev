import { create } from "zustand";
import type { StateCreator, StoreApi } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type Menu = {
	name: string;
	path: string;
};

export const MenuEnum: Record<string, Menu> = {
	HOME: {
		name: "홈",
		path: "",
	},
	POST: {
		name: "글",
		path: "post",
	},
	SERIES: {
		name: "연재물",
		path: "series",
	},
	TOPIC: {
		name: "주제",
		path: "topic",
	},
	DEVLOG: {
		name: "개발록",
		path: "devlog",
	},
} as const;

function getCurrentMenu() {
	const href = window.location.href;
	const url = new URL(href);

	const paths = url.pathname.split("/");

	const keys = Object.keys(MenuEnum) as [keyof typeof MenuEnum];

	for (const key of keys) {
		const menu = MenuEnum[key];

		if (paths.length > 1 && paths[1] === menu.path) {
			return menu;
		}
	}

	return MenuEnum.HOME;
}

export interface MenuState {
	current: Menu;
	changeMenu: (menu: Menu) => void;
}

const menuStore: (s: StoreApi<MenuState>["setState"]) => MenuState = (set) => ({
	current: getCurrentMenu(),
	changeMenu: (menu: Menu) => {
		set((s) => ({ ...s, current: menu }));
	},
});

const useMenuStore = create<MenuState>(menuStore);

export default useMenuStore;
