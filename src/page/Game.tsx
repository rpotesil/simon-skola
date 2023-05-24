import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { learnData } from "../data/english";
import { ed, eq } from "../helpers/dom";
import { shuffleArray } from "../helpers/shuffleArray";




export const Game = (props: any) => {
    const { round, onSuccess, maxRounds } = props;
    // const answerWidth = 300;
    // const answerHeight = 100;
    const [evaluating, setEvaluating] = useState(false);
    const [showEval, setShowEval] = useState<null | "fail" | "success">(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [info, setInfo] = useState("");
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const connectRef = useRef<any>();
    const successRef = useRef<any>();
    const failRef = useRef<any>();
    const svgRef = useRef<any>();
    const pathRef = useRef<SVGPathElement>();
    const [mouseX, setMouseX] = useState(0);
    const [startSide, setStartSide] = useState<null | "left" | "right">(null);
    const [endSide, setEndSide] = useState<null | "left" | "right">(null);
    const [startIndex, setStartIndex] = useState<null | number>(null);
    const [endIndex, setEndIndex] = useState<null | number>(null);
    const [connections, setConnections] = useState([]);

    const testConnections = () => {
        if (questions.length !== answers.length) return false;
        for (const connection of connections) {
            const fromIndex = connection.from - 1; // Adjusting for zero-based index
            const toIndex = connection.to - 1; // Adjusting for zero-based index

            if (fromIndex < 0 || fromIndex >= questions.length || toIndex < 0 || toIndex >= answers.length) {
                // Invalid index in connections array
                return false;
            }

            const fromWord = questions[fromIndex];
            const toWord = answers[toIndex];

            if (fromWord !== toWord) {
                // Words don't match for the given connection
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        var randomIds = [];
        const learnDataCopy = [...learnData]; // Create a copy of the original array to avoid modifying it
        while (randomIds.length < 3 && learnDataCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * learnDataCopy.length); // Get a random index within the array
            const randomId = learnDataCopy[randomIndex].id; // Get the id at the random index
            if (!randomIds.includes(randomId)) { // Check if the random id is already in the array
                randomIds.push(randomId); // Add the random id to the array of random ids
            }
            learnDataCopy.splice(randomIndex, 1); // Remove the object at the random index from the copy of the array
        }
        setQuestions(randomIds);
        setAnswers(shuffleArray([...randomIds]));
        // const questions = getRandomIds(learnData);

    }, []);

    const addConnection = () => {
        let from = startSide == "left" ? startIndex : endIndex;
        let to = startSide == "left" ? endIndex : startIndex;
        var newConnections = [];
        for (let i = 0; i < connections.length; i++) {
            let act = connections[i];
            let include = true;
            if (act.from == from) include = false;
            if (act.to == to) include = false;
            if (include) newConnections.push(act);
        }
        newConnections.push({ from: from, to: to });
        setConnections(newConnections);
        setStartSide(null);
        setEndSide(null);
        connectRef.current.play();
        if (newConnections.length == 3) onSubmit();
    }

    const getKnobPosition = (side: string, index: number) => {
        let rect = svgRef.current.getBoundingClientRect();
        let answerDOM = eq('#' + side + 'knot' + index)[0];
        let knobRect = answerDOM.getBoundingClientRect();
        let sx = (knobRect.left - rect.left);
        let sy = (knobRect.top - rect.top);
        return [sx + 9, sy + 9];
    }

    const onMouseDown = (e: any) => {
        let side = e.target.dataset.side;
        let index = e.target.dataset.index;
        if (!side) return; //click into free space
        if (side == "left") ed(`enaudio${index}`).play();
        if (side == "right") ed(`csaudio${index}`).play();
        if (startSide == null) {
            setStartSide(side);
            setStartIndex(index);
            setDragging(true);
            return;
        }
    }

    useEffect(() => {
        if (endSide == "left") ed(`enaudio${endIndex}`).play();
        if (endSide == "right") ed(`csaudio${endIndex}`).play();
    }, [endSide, endIndex]);

    const onMouseMove = (e: any) => {
        if (!dragging) return;
        const vx = (e.clientX || e.touches[0].pageX);
        const vy = (e.clientY || e.touches[0].pageY);
        const elementTouched: any = document.elementFromPoint(vx, vy);
        const rect = svgRef.current.getBoundingClientRect();
        const isAnswer = elementTouched.dataset.answer;
        var rx = vx - rect.left;
        var ry = vy - rect.top;
        const [sx, sy] = getKnobPosition(startSide, startIndex);
        if (isAnswer) {
            const side = elementTouched.dataset.side;
            const index = elementTouched.dataset.index;
            if (side !== startSide) {
                setEndSide(side);
                setEndIndex(index);
                const [ex, ey] = getKnobPosition(side, index);
                drawLine(sx, sy, ex, ey);
            } else {
                drawLine(sx, sy, rx, ry);
            }
        } else {
            drawLine(sx, sy, rx, ry);
        }
    }

    const onMouseUp = (e: any) => {

        pathRef.current.setAttribute("d", "");

        setDragging(false);
        if (endSide && startSide) {
            if (startSide !== endSide) {
                addConnection();
            } else {
                setStartSide(null);
                setEndSide(null);
            }
        }
        if (startSide && !endSide) {
            // if (e.target.dataset.side == startSide) {
            setStartSide(null);
            // }
        }
    }

    const onSubmit = () => {
        setEvaluating(true);
        setTimeout(() => {
            if (testConnections()) {
                successRef.current.play();
                setShowEval("success");
                setTimeout(() => {
                    onSuccess();
                }, 3500);
            } else {
                failRef.current.play();
                setShowEval("fail");
                setTimeout(() => {
                    setShowEval(null);
                    setConnections([]);
                    setEvaluating(false);
                }, 3500);
            }
        }, 500);

        console.log(questions, answers);
    }

    const drawLine = (sx, sy, x, y) => {
        var d = "M" + sx + "," + sy + " L" + x + "," + y;
        pathRef.current.setAttribute("d", d);
    }

    // const onPlay = (o: any, lang: string) => {
    //     let aud: any = document.getElementById(lang + "audio" + o.id);
    //     aud.play();
    // }
    // let [vw, vh] = useViewport();

    // <div className="game-screen" style={{ height: `${vh - 0}px` }}>
    return (
        <div className="game-screen">
            {showEval == "fail" && <div className="cross"></div>}
            {showEval == "success" && <div className="tick"></div>}

            <audio ref={connectRef} controls={false} autoPlay={false}>
                <source src={`./asset/connect.mp3`} type="audio/mpeg" />
            </audio>
            <audio ref={successRef} controls={false} autoPlay={false}>
                <source src={`./asset/success.mp3`} type="audio/mpeg" />
            </audio>
            <audio ref={failRef} controls={false} autoPlay={false}>
                <source src={`./asset/fail.mp3`} type="audio/mpeg" />
            </audio>
            {/* <div className="game-top-left">
                Height: {vh}

                <div>{dragging ? "Dragging" : "-"}</div>
                <div>S{startSide}{startIndex} To E{endSide}{endIndex}, INFO {info}</div>
                {
                    connections.map(o => {
                        return (
                            <div>{o.from} connected to {o.to}</div>
                        )
                    })
                }
            </div> */}
           
            <svg
                className={classNames("game-svg", { "evaluating": evaluating })}
                ref={svgRef}>
                <path id="path" stroke="#fff" ref={pathRef} strokeWidth="7" fill="none" />
                {
                    connections.map(o => {
                        const [sx, sy] = getKnobPosition("left", o.from);
                        const [ex, ey] = getKnobPosition("right", o.to);
                        let d = "M" + sx + "," + sy + " L" + ex + "," + ey;
                        return (
                            <path id="path" stroke="#ccc" d={d} strokeWidth="5" fill="none" />
                        )
                    })
                }

            </svg>
            <div
                className={classNames("challenge", { "evaluating": evaluating })}
                // onAnswerMouseDown={onAnswerMouseDown}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onMouseMove={onMouseMove}
                onTouchMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
            >
                <div className="challenge-inner">
                    <div className="game-round">Kolo {round}/{maxRounds}</div>

                    <div
                        className={classNames("challenge-duo")}>
                        <div className="challenge-left">
                            {questions.map((o, key) => {
                                let index = key + 1;
                                let item = learnData.filter(l => l.id == o)[0];
                                let CSS = classNames("answer",
                                    { "is-pulsing": (startSide == "left" && startIndex == index) || (endSide == "left" && endIndex == index) }
                                );
                                return (
                                    <div
                                        key={item.en}
                                        className={CSS}
                                        data-answer="true"
                                        data-index={(index)}
                                        data-side="left"
                                        data-operation={`enword${index}`}
                                    >
                                        <audio id={`enaudio${index}`} controls={false} autoPlay={false}>
                                            <source src={`./asset/en/${item.id}.mp3`} type="audio/mpeg" />
                                        </audio>
                                        <div className="bubble">
                                            <span className="lknot knot" id={`leftknot${index}`}></span>
                                            <span className="text">{item.en}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="challenge-right">
                            {answers.map((o, key) => {
                                let index = key + 1;
                                let item = learnData.filter(l => l.id == o)[0];
                                let CSS = classNames("answer",
                                    { "is-pulsing": (startSide == "right" && startIndex == index) || (endSide == "right" && endIndex == index) }
                                );
                                return (
                                    <div
                                        key={item.cs}
                                        className={CSS}
                                        data-answer="true"
                                        data-index={(index)}
                                        data-side="right"
                                        data-operation={`csword${index}`}
                                    >
                                        <audio id={`csaudio${index}`} controls={false} autoPlay={false}>
                                            <source src={`./asset/cs/${item.id}-cs.mp3`} type="audio/mpeg" />
                                        </audio>
                                        <div className="bubble">
                                            <span className="rknot knot" id={`rightknot${index}`}></span>
                                            <span className="text">{item.cs}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}