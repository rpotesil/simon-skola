import React, { useState } from "react"
import { learnData } from "../data/english"
import { toggleFullScreen } from "../helpers/toggleFullscreen"
import { playSound } from "../start";

export const Dictionary: any = (props) => {

    const { setPage } = props;
    const [loaded, setLoaded] = useState([]);

    const onPlay = (o: any, lang: string) => {
        let aud: any = document.getElementById(lang + "audio" + o.id);
        aud.play();
    }
    const onLoad = (o: any, lang: string) => {
        let thisId = o.id + lang;
        if (!loaded.includes(thisId)) { setLoaded((loaded) => [...loaded, thisId]); }
    }

    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <button onClick={() => setPage("welcome")} className="menu-button icon-close" aria-label="Back"></button>
            </div>



            <div className="challenge">
                <div className="challenge-long">
                    <h1 className="menu-title">Slovník</h1>
                    <div className="pb-48">
                        {learnData.map((o, index) => {

                            return (
                                <div key={o.cs} className="dict-item">
                                    <div className="di-num">
                                        {(index + 1)}
                                    </div>
                                    <div className="di-left">
                                        <button type="button" onClick={() => playSound(`cs/${o.id}-cs`)} className="audio-play icon-play"></button>
                                        <span className="di-text">{o.cs}</span>
                                    </div>
                                    <div className="di-right">
                                        <button type="button" onClick={() => playSound("en/" + o.id)} className="audio-play icon-play"></button>
                                        <span className="di-text">{o.en}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* <h2>English</h2>
                    {learnData.map((o, index) => {

                        return (
                            <div key={o.en} className="item">
                             
                                <span className="text">{o.en}</span>
                            </div>
                        )
                    })} */}
                </div>
            </div>

        </>

    )
}