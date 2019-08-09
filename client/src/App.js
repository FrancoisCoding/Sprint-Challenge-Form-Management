import React from "react";
import "./App.css";
import FormikForm from "./components/TheForm";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <FormikForm />
      </div>
    );
  }
}

export default App;
