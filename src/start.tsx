

import React from 'react';
import { App } from "./app";

import { createRoot } from 'react-dom/client';
import { learnData } from './data/english';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// sound array + predefined sounds that shall be preloaded (unlike english and czech words)
var sounds = [];
sounds.push(
    {
        file: "connect",
        audio: new Audio("./asset/connect.mp3")
    },
    {
        file: "round",
        audio: new Audio("./asset/round.mp3")
    },
    {
        file: "start",
        audio: new Audio("./asset/start.mp3")
    },
    {
        file: "done",
        audio: new Audio("./asset/done.mp3")
    },
    {
        file: "success",
        audio: new Audio("./asset/success.mp3")
    }
);

export const playSound = (path: string) => {
    // const nowSound = new Audio(id);
    // nowSound.play();
    let exists = sounds.filter(o => o.file == path).length;
    if (exists) {
        let curA = sounds.filter(o => o.file == path)[0].audio;
        curA.currentTime = 0;
        curA.play();
    } else {
        let newA = new Audio(`./asset/${path}.mp3`);
        sounds.push(
            {
                file: path,
                audio: newA
            }
        );
        newA.play();
    }
}