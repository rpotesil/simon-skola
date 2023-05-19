import React, { useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRoot } from "./app-root";
import { AppContext, AppState, IAppState } from "./app-state";

export const App = () => {
    const [appState, setAppState] = useState<IAppState>(AppState);


    return (

        <HashRouter>
            <AppContext.Provider value={{ appState, setAppState }}>
                <AppRoot />
            </AppContext.Provider>
        </HashRouter>

    )
}