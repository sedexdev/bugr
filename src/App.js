import React, { useEffect } from "react";

import SidePanel from "./components/side_panel/SidePanel";
import Main from "./components/main/Main";

import "./App.css";

function App() {
    useEffect(() => {
        document.title = "Bugr";
    });

    return (
        <div className='App'>
            <SidePanel />
            <Main />
        </div>
    );
}

export default App;
