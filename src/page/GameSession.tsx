import React, { useState } from "react";
import { Game } from "./Game";
import { Link } from "react-router-dom";
import { toggleFullScreen } from "../helpers/toggleFullscreen";

export const GameSession = () => {
    const [round, setRound] = useState(1);
    const [showGame, setShowGame] = useState(true);
    const [message, setMessage] = useState("");
    const maxRounds = 3;
    const onSuccess = () => {
        setShowGame(false);
        setMessage("Kolo " + (round + 1));
        setTimeout(() => {
            setRound(round + 1);
            setShowGame(true);
        }, 3000);
    }
    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <Link to="/" className="menu-button icon-close" aria-label="Back"></Link>
            </div>
            {
                showGame ? <>
                    <Game round={round} onSuccess={onSuccess} maxRounds={maxRounds} />
                </>
                    :
                    <div className="challenge">
                        <div className="challenge-inner">
                            <div className="menu-title">{message}</div>
                        </div>
                    </div>
            }
        </>
    )
}