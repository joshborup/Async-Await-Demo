import React, { Component } from "react";
import AsyncDemo from "./Component/AsyncDemo";
import StarWars from "./Component/StarWars";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<AsyncDemo />
				{/* <StarWars /> */}
			</div>
		);
	}
}

export default App;
