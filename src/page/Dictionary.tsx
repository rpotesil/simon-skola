import React from "react"
import { Link } from "react-router-dom"
import { learnData } from "../data/english"
import { ed } from "../helpers/dom"

export const Dictionary: any = () => {

    const onPlay = (o: any, lang: string) => {
        let aud: any = document.getElementById(lang + "audio" + o.id);
        aud.play();
    }
    return (
        <div className="challenge">
            <div className="challenge-inner">
                <Link to="/" className="menu-close icon-close" aria-label="Back"></Link>
                <h2>České</h2>
                {learnData.map((o, index) => {

                    return (
                        <div key={o.cs} className="item">
                            <audio id={`csaudio${o.id}`} controls={false} autoPlay={false}>
                                <source src={`./asset/${o.id}-cs.mp3`} type="audio/mpeg" />
                            </audio>
                            <button type="button" onClick={() => onPlay(o, "cs")} className="audio-play icon-play"></button>
                            <span className="text">{o.cs}</span>
                        </div>
                    )
                })}
                <h2>English</h2>
                {learnData.map((o, index) => {

                    return (
                        <div key={o.en} className="item">
                            <audio id={`enaudio${o.id}`} controls={false} autoPlay={false}>
                                <source src={`./asset/${o.id}.mp3`} type="audio/mpeg" />
                            </audio>
                            <button type="button" onClick={() => onPlay(o, "en")} className="audio-play icon-play"></button>
                            <span className="text">{o.en}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}