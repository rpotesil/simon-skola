import React, { useEffect, useRef, useState } from "react"
import { learnData } from "../data/english";
import { Link } from "react-router-dom";
import { ed, eq } from "../helpers/dom";
import classNames from "classnames";
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const Game = () => {
    const answerWidth = 300;
    const answerHeight = 100;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [info, setInfo] = useState("");
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const svgRef = useRef<any>();
    const pathRef = useRef<SVGPathElement>();
    const [mouseX, setMouseX] = useState(0);
    const [startSide, setStartSide] = useState<null | "left" | "right">(null);
    const [endSide, setEndSide] = useState<null | "left" | "right">(null);
    const [startIndex, setStartIndex] = useState<null | number>(null);
    const [endIndex, setEndIndex] = useState<null | number>(null);
    const [connections, setConnections] = useState([]);
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
        setAnswers(shuffle([...randomIds]));
        // const questions = getRandomIds(learnData);

    }, []);

    const addConnection = () => {
        let from = startSide == "left" ? startIndex : endIndex;
        let to = startSide == "left" ? endIndex : startIndex;
        setConnections([...connections, { from: from, to: to }]);
    }
    const onTouchStart = (e: any) => {

    }
    const onTouchMove = (e: any) => {
        onMouseMove(e.changedTouches[0]);
    }
    const onMouseDown = (e: any) => {
        let side = e.target.dataset.side;
        let index = e.target.dataset.index;
        if(side && startSide == null) {
            setStartSide(side);
            setStartIndex(index);
            setDragging(true);
        }
    }
    const onMouseMove = (e: any) => {
        if (dragging) {
            // if (e.target.dataset.answer) {
            //     let answerDOM = eq('[data-operation="' + e.target.dataset.operation + '"]')[0];
            //     if (e.target.dataset.side == "left") {
            //         drawLine(startX, startY, answerDOM.offsetLeft + answerWidth, answerDOM.offsetTop + (answerHeight / 2));

            //     } else {
            //         drawLine(startX, startY, answerDOM.offsetLeft, answerDOM.offsetTop + (answerHeight / 2));

            //     }

            // } else {
            // }
            let rect = svgRef.current.getBoundingClientRect();
            let vx = (e.clientX || e.touches[0].pageX);
            var vy = (e.clientY || e.touches[0].pageY);
            let rx = vx - rect.left;
            var ry = vy - rect.top;


            let answerDOM = eq('#' + startSide + 'knot' + startIndex)[0];
            let knobRect = answerDOM.getBoundingClientRect();
            let sx = (knobRect.left - rect.left);
            let sy = (knobRect.top - rect.top);

            drawLine(sx, sy, rx, ry);

            var elementTouched:any = document.elementFromPoint(vx, vy);
            if(elementTouched.dataset.answer) {
                setInfo("ANS");
            }else{
                setInfo("");                

            }

            // setStartX(e.target.dataset.index);
            // let endSide = e.target.dataset.side;
            // if (startSide && startSide !== endSide) {
            //     let index = e.target.dataset.index;
            //     setEndSide(endSide);
            //     setEndIndex(index);
            //     // addConnection(endSide, index);
            //     // setStartSide(null);
            }
        //}
        // setMouseX( e.touches[0].pageX);
    }
    const onMouseUp = (e: any) => {
        console.log("Canvas Mouse up");
        setDragging(false);
        setStartSide(null);
        // let endSide = e.target.dataset.side;
        if (endSide && startSide && startSide !== endSide) {
            let index = e.target.dataset.index;
            addConnection();
            setStartSide(null);
        }

        // setStartSide(side);
        // setStartIndex(index);
    }
    const onAnswerMouseUp = (e: any) => {
        e.stopPropagation();
        setDragging(false);
      

        // setDragging(false);
    }
    const onSubmit = (e: any) => {
        console.log(questions, answers);
    }
    const drawLine = (sx, sy, x, y) => {
        // var rect = svgRef.current.getBoundingClientRect();
        // var x_rel = x - rect.left;
        // var y_rel = y - rect.top; 

        var d = "M" + sx + "," + sy + " L" + x + "," + y;
        // var d = "M100,100 L" + x_rel + "," + y_rel;
        pathRef.current.setAttribute("d", d);
    }
    const onPlay = (o: any, lang: string) => {
        let aud: any = document.getElementById(lang + "audio" + o.id);
        aud.play();
    }


    return (
        <>
            <div className="game-top-left">
                <div>{dragging ? "Dragging" : "-"}</div>
                <div>S{info}</div>
                {
                    connections.map(o => {
                        return (
                            <div>{o.from} connected to {o.to}</div>
                        )
                    })
                }
            </div>
            <Link to="/" className="menu-close icon-close" aria-label="Back"></Link>
            <svg className="game-svg" ref={svgRef}>
                <path id="path" stroke="#333" ref={pathRef} stroke-width="3" fill="none" />
            </svg>
            <div
                className="challenge"
                // onAnswerMouseDown={onAnswerMouseDown}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onMouseMove={onMouseMove}
                onTouchMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
            >
                <div className="challenge-inner">
                    Spojte anglická slova se správným českým překladem
                    <div className="challenge-duo">
                        <div className="challenge-left">
                            {questions.map((o, key) => {
                                let index = key + 1;
                                let item = learnData.filter(l => l.id == o)[0];
                                let CSS = classNames("answer", { "is-pulsing": (startSide == "left" && startIndex == index) });
                                return (
                                    <div
                                        key={item.en}
                                        className={CSS}
                                        data-answer="true"
                                        data-index={(index)}
                                        data-side="left"
                                        data-operation={`enword${index}`}
                                        // onMouseDown={(e) => onAnswerMouseDown(e)}
                                        // onTouchStart={(e) => onAnswerMouseDown(e)}
                           
                                    >
                                        <span className="lknot" id={`leftknot${index}`}></span>
                                        <audio id={`enaudio${item.id}`} controls={false} autoPlay={false}>
                                            <source src={`./asset/${item.id}.mp3`} type="audio/mpeg" />
                                        </audio>
                                        {/* <button type="button" onClick={() => onPlay(item, "en")} className="audio-play icon-play"></button> */}
                                        <span className="text">{item.en}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="challenge-right">
                            {answers.map((o, key) => {
                                let index = key + 1;
                                let item = learnData.filter(l => l.id == o)[0];
                                let CSS = classNames("answer", { "is-pulsing": (startSide == "right" && startIndex == index) });
                                return (
                                    <div
                                        key={item.cs}
                                        className={CSS}
                                        data-answer="true"
                                        data-index={(index)}
                                        data-side="right"
                                        data-operation={`csword${index}`}
                                        // onMouseDown={(e) => onAnswerMouseDown(e)}
                                        // onTouchStart={(e) => onAnswerMouseDown(e)}
                                    
                                                                            >
                                        <span className="rknot" id={`rightknot${index}`}></span>
                                        <audio id={`csaudio${item.id}`} controls={false} autoPlay={false}>
                                            <source src={`./asset/${item.id}-cs.mp3`} type="audio/mpeg" />
                                        </audio>
                                        {/* <button type="button" onClick={() => onPlay(item, "cs")} className="audio-play icon-play"></button> */}
                                        <span className="text">{item.cs}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button type="button" onClick={onSubmit}>Další úkol</button>
                </div>
            </div>

        </>
    )
}