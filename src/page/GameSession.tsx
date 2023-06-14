import React, { useEffect, useState } from "react";
import { toggleFullScreen } from "../helpers/toggleFullscreen";
import { Game } from "./Game";
import classNames from "classnames";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { playSound } from "../start";

declare const startConfetti;
declare const stopConfetti;
export const GameSession = (props) => {
    const { setPage } = props;
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [show, setShow] = useState("round");
    const [message, setMessage] = useState("");
    const maxRounds = 3;

    const onSuccess = (eligiblePoints) => {
        let newScore = score + eligiblePoints;
        let newRound = round + 1;
        setScore(newScore);

        if (newRound > maxRounds) {
            playSound("done");
            setShow("done");
            startConfetti();
            return;
        }
        playSound("round");
        setShow("round");
        setMessage("Kolo " + newRound);
        setRound(newRound);
        setTimeout(() => {
            setShow("game");
        }, 1200);
    }

    const onNav = (page: string) => {
        playSound("connect");
        setPage(page);
    }

    useEffect(() => {
        playSound("start");
        setMessage("Kolo 1");
        setTimeout(() => {
            setShow("game");
        }, 1200);
        return () => {
            stopConfetti();
        };
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
                    {[...Array(maxRounds)].map((e, i) => <span className={classNames("gr-badge", { "is-done icon icon-check": (i + 1 < round), "is-current": (round == i + 1) })} key={i}></span>)}
                </div>
            </div>

            <SwitchTransition>
                <CSSTransition timeout={300} key={show}>
                    <div className="router-wrapper">
                        {
                            show == "game" && <Game round={round} onSuccess={onSuccess} maxRounds={maxRounds} />
                        }
                        {
                            show == "done" && <div className="game-center-center text-center">
                                <div className="menu-title mb-8">Hotovo!</div>
                                <div className="game-score mb-48">
                                    <span className="value">Skóre: {score}</span>
                                    <span className="icon icon-star"></span>
                                </div>
                                <button onClick={() => onNav("welcome")} className="menu-cta2">Pokračovat</button>
                            </div>
                        }
                        {
                            show == "round" && <div className="game-center-center">
                                <div className="menu-title mb-24">{message}</div>
                            </div>
                        }
                    </div>
                </CSSTransition>
            </SwitchTransition >
        </>
    )
}