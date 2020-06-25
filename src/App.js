import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Random from "./pages/Random";
import AddMath from "./pages/AddMath";
import Demo from "./pages/Demo";
import VersionOne from "./pages/VersionOne";
import VersionTwo from "./pages/VersionTwo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/Random" component={Random} />
        <Route path="/Add" component={AddMath} />
        <Route path="/Demo" component={Demo} />
        <Route path="/v1" component={VersionOne} />
        <Route path="/v2" component={VersionTwo} />
      </BrowserRouter>
    </div>
  );
}

export default App;
