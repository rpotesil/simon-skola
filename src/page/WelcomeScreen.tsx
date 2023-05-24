import React from "react"
import { Link } from "react-router-dom"
import { toggleFullScreen } from "../helpers/toggleFullscreen"



export const WelcomeScreen: any = () => {

    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
            </div>

            <div className="challenge text-center">
                <div className="challenge-inner">

                    <h1 className="menu-title">Angličtina 1.B.</h1>
                    <ul className="menu-list">
                        <li>
                            <Link to="/game" className="menu-cta">Hrát</Link>
                        </li>
                        <li>
                            <Link to="/dictionary" className="menu-cta2">Slovník</Link>
                        </li>
                    </ul>
                    <div className="pb-48">
                        <img src="./asset/app-qr.svg" width={200} height={200} />
                    </div>
                </div>
            </div>
        </>
    )
}