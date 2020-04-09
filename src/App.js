import React from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import Covid from "./Covid";

const store = ConfigureStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Covid />
			</Provider>
		);
	}
}

export default App;
