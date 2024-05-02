/** @format */

import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import MainContainer from "./components/Containers/mainContainer";
// import { useState } from "react";
import { useState, useEffect } from "react";
function App() {
	const [clearMessages, setClearMessages] = useState(false);

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	const [hideSideBar, setHideSidebar] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setHideSidebar(window.innerWidth <= 768);
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup function
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	function toggleSidebar() {
		setHideSidebar(!hideSideBar);
	}
	// const [hideSideBar, setHideSidebar] = useState(false);

	// const handleShowSidebar = () => {
	//   setHideSidebar(!hideSideBar);
	// };
	return (
		<div className=" h-screen flex bg-chatgpt-light-gray overflow-hidden ">
			<Sidebar className="" ismmobile={isMobile} toggleSidebar={toggleSidebar} hideSideBar={hideSideBar} />

			<div className="h-screen flex-1 -32   ">
				{/* content */}
				<div className=" h-full   flex flex-col text-white">
					{/* Topbar */}
					<div class="flex items-center justify-between py-1 border-chatgpt-border-gray my-2 px-2 ">
						<div
							className="flex items-center hover:bg-chatgpt-border-gray  hover:rounded-xl cursor-pointer py-2 pl-4 pr-7"
							onClick={() => setHideSidebar(!hideSideBar)}
						>
							<button class="text-white">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6ZM4 12C4 11.4477 4.44772 11 5 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H5C4.44772 13 4 12.5523 4 12ZM4 18C4 17.4477 4.44772 17 5 17H12C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19H5C4.44772 19 4 18.5523 4 18Z"
										fill="currentColor"
									></path>
								</svg>
							</button>
							<h2 className="text-white text-lg font-semibold ml-2">
								ChatGPT 3.5
							</h2>
						</div>
					</div>
					{/* end of topbar */}
					<MainContainer />
				</div>
			</div>
		</div>
	);
}

export default App;
