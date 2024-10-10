import {Slide} from "./objects.ts";
import {addImage, addText} from "./functions.ts";
import {v4 as uuidv4} from "uuid";


export const maxSlides: Slide[] = [];
maxSlides.push({
    id: uuidv4(),
    background: {
        colors: [
            {value: "white", type: "color"},
            {value: "#EDF2FA", type: "color"},
        ],
        angle: 45,
        type: "gradient",
    },

    content: [{
        id: uuidv4(),
        pos: {x: 100, y: 100},
        size: { width: 500, height: 500},
        fillStyle: {
            colors: [{
                value: "#ebcb3f",
                type: "color"
            },
                {
                    value: "white",
                    type: "color"
                }],
            angle: 40,
            type: "gradient"
        },
        strokeWidth: 3,
        strokeStyle: {
            value: "gray",
            type: "color"
        },
        type: "figure",
    }]
});
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
        maxSlides.push(
            addText(
                slide,
                {
                    x: 100,
                    y: 100
                },
                40,
                "Arial",
                ["italic"]
            )
        );
    }
    else
    {
        maxSlides.push(
            addImage(
                slide,
                {x: 100, y: 100},
                {width: 500, height: 500},
                "../public/image/earth.gif",
            )
        );
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
