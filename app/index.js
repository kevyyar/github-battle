import React from "react";
import ReactDOM from "react-dom";
import './index.css';

// Component
// State
// LifeCycle
// UI

class App extends React.Component {
    render() {
        return (
            <div>
                hello world!!
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;