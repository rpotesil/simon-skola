import React, { useEffect } from "react";
import { learnData } from "../data/english";
import { toggleFullScreen } from "../helpers/toggleFullscreen";
import { playSound } from "../start";
import { ed } from "../helpers/dom";

declare const startConfetti;
declare const stopConfetti;
// declare const sound1;

export const Test = (props) => {
    const { setPage } = props;
    const maxRounds = 5;
    const message = "Kolo 4";
    const round = 3;
    const score = 9;

    // useEffect(() => {
    //     startConfetti();
    //     return () => {
    //         stopConfetti();
    //     };
    // }, []);
    const shout = (id: string, lang: string) => {
        ed(id + lang).style.display = "block";
    }


    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <button onClick={() => setPage("welcome")} className="menu-button icon-close" aria-label="Back"></button>
            </div>


            {/* <div className="game-center-center text-center">
                <div className="menu-title mb-8">Hotovo!</div>
                <div className="game-score mb-48">
                    <span className="value">Skóre: {score}</span>
                    <span className="icon icon-star"></span>
                </div>
                <button onClick={() => setPage("welcome")} className="menu-cta2">Pokračovat</button>
            </div> */}


            <div className="challenge">
                <div className="challenge-long">


                    {
                        learnData.map((o, index) => {
                            return (<>
                                <div key={o.cs} className="dict-item" id={o.id + "cs"} style={{ display: "none" }}>
                                    <audio controls>
                                        <source src={`./asset/cs/${o.id}-cs.mp3`} onError={() => shout(o.id, "cs")} type="audio/mpeg" />
                                    </audio>
                                    {o.cs}
                                </div>
                                <div key={o.cs} className="dict-item" id={o.id + "en"} style={{ display: "none" }}>
                                    <audio controls>
                                        <source src={`./asset/en/${o.id}.mp3`} onError={() => shout(o.id, "en")} type="audio/mpeg" />
                                    </audio>
                                    {o.en}
                                </div>
                            </>
                            )
                        })
                    }
                </div>
            </div>


        </>
    )
}