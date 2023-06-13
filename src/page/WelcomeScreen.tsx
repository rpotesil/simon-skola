import React from "react"
import { Link } from "react-router-dom"
import { toggleFullScreen } from "../helpers/toggleFullscreen"



export const WelcomeScreen: any = (props) => {
    const { setPage } = props;
    return (
        <>


            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <div className="menu-button icon-close"></div>
            </div>

            <div className="challenge text-center">
                <div className="challenge-inner">

                    <h1 className="menu-title">Angličtina 1. B</h1>
                    <ul className="menu-list">
                        <li>
                            <button onClick={() => setPage("game")} className="menu-cta">Hrát</button>
                        </li>
                        <li>
                            <button onClick={() => setPage("dictionary")} className="menu-cta2">Slovník</button>
                        </li>
                        <li>
                            <button onClick={() => setPage("share")} className="menu-cta2">Sdílet</button>
                        </li>
                        <li>
                            <button onClick={() => setPage("test")} className="menu-cta2">Test</button>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}