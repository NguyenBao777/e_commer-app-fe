import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, Main, CreateMain } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunction";
import { actionType } from "./context/reducer";

function App() {
	const [{}, dispatch] = useStateValue();

	const fetchData = async () =>{
		await getAllFoodItems().then(data => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

	useEffect(()=>{
		fetchData();
	},[])

	return (
		<AnimatePresence exitBeforeEnter>
			<div className="w-screen h-auto flex flex-col">
				<Header />

				<Routes>
					<Route path="/*" element={<Main />} />
					<Route path="/createItem" element={<CreateMain />} />
				</Routes>
			</div>
		</AnimatePresence>
	);
}

export default App;
