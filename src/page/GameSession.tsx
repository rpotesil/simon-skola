import React, { useEffect, useState } from "react";
import { toggleFullScreen } from "../helpers/toggleFullscreen";
import { Game } from "./Game";
import classNames from "classnames";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export const GameSession = (props) => {
    const { setPage } = props;
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [showGame, setShowGame] = useState(false);
    const [message, setMessage] = useState("");
    const maxRounds = 3;

    const onSuccess = (eligiblePoints) => {
        setShowGame(false);
        setScore(score + eligiblePoints);
        setMessage("Kolo " + (round + 1));
        setRound(round + 1);
        setTimeout(() => {
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
            <div className="game-bottom-center">
                <div className="game-round">
                    {[...Array(maxRounds)].map((e, i) => <span className={classNames("gr-badge", { "is-done icon icon-check": (i + 1 < round), "is-current": (round == i + 1) })} key={i}><span>{i + 1}</span></span>)}
                </div>
            </div>

            <SwitchTransition>
                <CSSTransition timeout={300} key={showGame.toString()}>
                    <div className="router-wrapper">
                        {
                            showGame ? <>
                                <Game round={round} onSuccess={onSuccess} maxRounds={maxRounds} />
                            </>
                                :
                                <div className="game-center-center">
                                    <div className="menu-title mb-24">{message}</div>
                                    <div className="game-round">
                                        {[...Array(maxRounds)].map((e, i) => <span className={classNames("gr-badge", { "is-done icon icon-check": (i + 1 < round), "is-current": (round == i + 1) })} key={i}><span>{i + 1}</span></span>)}
                                    </div>
                                </div>
                        }
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </>
    )
}