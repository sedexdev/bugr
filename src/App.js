import React from "react";

import Ribbon from "./components/ribbon/Ribbon";
import SidePanel from "./components/side_panel/SidePanel";
import Main from "./components/main/Main";

import "./App.css";

function App() {
    return (
        <div className='App'>
            <Ribbon />
            <SidePanel />
            <Main />
        </div>
    );
}

export default App;
