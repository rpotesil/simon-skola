import React from "react";
import { Route, Routes } from "react-router-dom";
import { WelcomeScreen } from "./page/WelcomeScreen";
import { Game } from "./page/Game";
import { Dictionary } from "./page/Dictionary";


export const AppRoot = (props) => {

    return (
        <>
            <Routes>
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<WelcomeScreen />} />
            </Routes>

        </>

    )
}