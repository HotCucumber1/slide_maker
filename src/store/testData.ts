import {Slide} from "./objects.ts";
import {v4 as uuidv4} from "uuid";


export const maxSlides: Slide[] = [];
maxSlides.push({
    id: uuidv4(),
    background: {
        type: "gradient",
        colors: [
            {value: "white", type: "color"},
            {value: "#EDF2FA", type: "color"},
        ],
        angle: 45,
    },

    content: [
    {
        id: uuidv4(),
        pos: {x: 100, y: 100},
        size: { width: 500, height: 500},
        fillStyle: {
            colors: [
                {
                    value: "red",
                    type: "color"
                },
                {
                    value: "#ebcb3f",
                    type: "color"
                },
                {
                value: "white",
                type: "color"
                },
            ],
            angle: 40,
            type: "gradient"
        },
        strokeWidth: 100,
        strokeStyle: {
            value: "red",
            type: "color"
        },
        type: "label",
    },
        {
            id: uuidv4(),
            pos: {x: 500, y: 500},
            size: { width: 1000, height: 500},
            fillStyle: {
                colors: [
                    {
                        value: "black",
                        type: "color"
                    },
                    {
                        value: "#ebcb3f",
                        type: "color"
                    },
                    {
                        value: "white",
                        type: "color"
                    },
                ],
                angle: 90,
                type: "gradient"
            },
            strokeWidth: 1,
            strokeStyle: {
                value: "black",
                type: "color"
            },
            type: "ellipse"
        },
        {
            id: uuidv4(),
            pos: {x: 1400, y: 100},
            size: { width: 500, height: 500},
            fillStyle: {
                colors: [
                    {
                        value: "white",
                        type: "color"
                    },
                    {
                        value: "blue",
                        type: "color"
                    },
                    {
                        value: "red",
                        type: "color"
                    },
                ],
                angle: 90,
                type: "gradient"
            },
            strokeWidth: 1,
            strokeStyle: {
                value: "red",
                type: "color"
            },
            type: "triangle"
        }
    ], });
maxSlides.push({
    id: uuidv4(),
    background: {
        src: "../public/image/earth.gif",
        type: "image",
    },
    content: []
});

for (let i = 0; i < 8; i++)
{
    const slide: Slide = {
        id: uuidv4(),
        background: {
            colors: [
                {value: "white", type: "color"},
                {value: "#EDF2FF", type: "color"},
            ],
            angle: 45,
            type: "gradient",
        },
        content: [],
    };

    if (i % 2 === 0)
    {
        maxSlides.push({
            ...slide,
            content: [{
                id: uuidv4(),
                pos: {x: 50, y: 50},
                size: {width: 500, height: 30},
                text: "It is a text",
                fontSize: 20,
                fontFamily: "Arial",
                fontStyles: [],
                color: {
                    value: "black",
                    type: "color",
                },
                type: "text"
            }],
        });
    }
    else
    {
        maxSlides.push({
            ...slide,
            content: [{
                    id: uuidv4(),
                    pos: {x: 50, y: 50},
                    size: {width: 500, height: 500},
                    src: "../public/image/earth.gif",
                    type: "image",
            }]
        });
    }
}


export const minSlides: Slide[] = [];
minSlides.push({
    id: uuidv4(),
    background: {
        value: "white",
        type: "color",
    },
    content: []
});
