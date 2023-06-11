import React, { useState } from "react"
import { learnData } from "../data/english"
import { toggleFullScreen } from "../helpers/toggleFullscreen"

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
                                        <audio id={`csaudio${o.id}`} controls={false} autoPlay={false} onCanPlay={() => onLoad(o, "cs")}>
                                            <source src={`./asset/cs/${o.id}-cs.mp3`} type="audio/mpeg" />
                                        </audio>
                                        <button disabled={!loaded.includes(o.id + "cs")} type="button" onClick={() => onPlay(o, "cs")} className="audio-play icon-play"></button>
                                        <span className="di-text">{o.cs}</span>
                                    </div>
                                    <div className="di-right">
                                        <audio id={`enaudio${o.id}`} controls={false} autoPlay={false} onCanPlay={() => onLoad(o, "en")}>
                                            <source src={`./asset/en/${o.id}.mp3`} type="audio/mpeg" />
                                        </audio>
                                        <button disabled={!loaded.includes(o.id + "en")} type="button" onClick={() => onPlay(o, "en")} className="audio-play icon-play"></button>
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