import React, { useEffect, useState } from "react";
import { Game } from "./Game";
import { Link } from "react-router-dom";
import { toggleFullScreen } from "../helpers/toggleFullscreen";

export const GameSession = (props) => {
    const { setPage } = props;
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [showGame, setShowGame] = useState(false);
    const [message, setMessage] = useState("");
    const maxRounds = 7;

    const onSuccess = (eligiblePoints) => {
        setShowGame(false);
        setScore(score + eligiblePoints);
        setMessage("Kolo " + (round + 1));
        setTimeout(() => {
            setRound(round + 1);
            setShowGame(true);
        }, 1200);
    }

    useEffect(() => {
        setMessage("Kolo 1");
        setTimeout(() => {
            setShowGame(true);
        }, 1200);
    }, []);




    return (
        <>
            <div className="game-top-right">
                <button className="menu-button icon-fullscreen" aria-label="Fullscreen" onClick={toggleFullScreen}></button>
                <button onClick={() => setPage("welcome")} className="menu-button icon-close" aria-label="Back"></button>
            </div>

            <div className="game-top-left">
                <div className="game-score">
                    <span className="value">{score}</span>
                    <span className="icon icon-star"></span>
                </div>
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