import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import Popular from "./components/Popular";

// Component
// State
// LifeCycle
// UI

class App extends React.Component {

    render() {
        return (
            <Popular />
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;