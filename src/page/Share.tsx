import React from "react";
import { toggleFullScreen } from "../helpers/toggleFullscreen";
import { playSound } from "../start";

export const Share = (props) => {
    const { setPage } = props;
    const onNav = (page: string) => {
        playSound("connect");
        setPage(page);
    }
    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <button onClick={() => setPage("welcome")} className="menu-button icon-close" aria-label="Back"></button>
            </div>

            <div className="challenge text-center">
                <div className="challenge-inner">

                    <h1 className="menu-title">Sdílet aplikaci</h1>

                    <div className="pb-0">
                        <img src="./asset/appqr.svg" width={300} height={300} />
                    </div>
                    <p className="text-lead">https://untitled.cz/learn</p> 

                    <ul className="menu-list">
                        <li>
                            <button onClick={() => onNav("welcome")} className="menu-cta2">Zpět</button>
                        </li>
                    </ul>
                    <p>&copy; 2023 Radim Potěšil</p>
                </div>
            </div>
        </>
    )
}