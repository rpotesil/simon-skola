import React, { useEffect } from "react";
import { learnData } from "../data/english";
import { toggleFullScreen } from "../helpers/toggleFullscreen";
import { playSound } from "../start";

declare const startConfetti;
declare const stopConfetti;
// declare const sound1;

export const Test = (props) => {
    const { setPage } = props;
    const maxRounds = 5;
    const message = "Kolo 4";
    const round = 3;
    const score = 9;

    useEffect(() => {
        startConfetti();
        return () => {
            stopConfetti();
        };
    }, []);



    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <button onClick={() => setPage("welcome")} className="menu-button icon-close" aria-label="Back"></button>
            </div>


            <div className="game-center-center text-center">
                <div className="menu-title mb-8">Hotovo!</div>
                <div className="game-score mb-48">
                    <span className="value">Skóre: {score}</span>
                    <span className="icon icon-star"></span>
                </div>
                <button onClick={() => setPage("welcome")} className="menu-cta2">Pokračovat</button>
            </div>


            {/* <div className="challenge">
                <div className="challenge-long">
                    <button onClick={() => playSound("connect")} className="menu-cta2">Test1</button>
                    <button onClick={() => playSound("success")} className="menu-cta2">Test1</button>
                    <button onClick={() => playSound("en/cap")} className="menu-cta2">Test1</button>

                    {
                        learnData.map((o, index) => {
                            return (
                                <div key={o.cs} className="dict-item">
                                    {o.en}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
     */}

        </>
    )
}