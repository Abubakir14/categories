import React from "react";
import Category from "./components/catigories/categories";
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <Category categoryName="Categories" />
    </div>
  );
};

export default App;
