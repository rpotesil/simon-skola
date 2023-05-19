import React from "react"
import { Link } from "react-router-dom"



export const WelcomeScreen: any = () => {
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    return (
        <div className="challenge">
            <div className="challenge-inner">
                <div className="ch-top-right">
                    <button className="menu-button icon-dots" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                </div>
                <ul className="menu">
                    <li>
                        <Link to="/game" className="menu-cta">Start</Link>
                    </li>
                    <li>
                        <Link to="/dictionary" className="menu-cta">Slovník</Link>
                    </li>
                </ul>

                <img src="./asset/app-qr.svg" width={200} height={200} />
            </div>
        </div>
    )
}