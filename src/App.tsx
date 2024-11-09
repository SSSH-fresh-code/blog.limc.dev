import { Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const Header = lazy(() => import("@/components/custom-ui/header/header"));

function App() {
	return (
		<div className="p-2 md:p-4">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
