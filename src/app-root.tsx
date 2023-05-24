import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dictionary } from "./page/Dictionary";
import { GameSession } from "./page/GameSession";
import { WelcomeScreen } from "./page/WelcomeScreen";


export const AppRoot = (props) => {

    return (
        <>
            <Routes>
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/game" element={<GameSession />} />
                <Route path="*" element={<WelcomeScreen />} />
            </Routes>

        </>

    )
}