
import { SwitchTransition, CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import { AppContext, AppState, IAppState } from "./app-state";
import { Dictionary } from "./page/Dictionary";
import { GameSession } from "./page/GameSession";
import { WelcomeScreen } from "./page/WelcomeScreen";
import { Share } from "./page/Share";

export const App = () => {
    const [appState, setAppState] = useState<IAppState>(AppState);
    const [page, setPage] = useState("welcome");

    return (

        <AppContext.Provider value={{ appState, setAppState }}>
            <SwitchTransition>
                <CSSTransition timeout={300} key={page}>
                    <div className="router-wrapper">
                        {page == "dictionary" && <Dictionary setPage={setPage} />}
                        {page == "game" && <GameSession setPage={setPage} />}
                        {page == "welcome" && <WelcomeScreen setPage={setPage} />}
                        {page == "share" && <Share setPage={setPage} />}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </AppContext.Provider>

    )
}