import {Slide} from "../objects.ts";
import {v4 as uuidv4} from "uuid";
import {Point} from "jspdf"

const defaultSlide: Slide = {
    id: uuidv4(),
    background: {
        value: "white",
        type: "color",
    },
    content: [],
};

function createDefaultSlide(): Slide
{
    return {
        id: uuidv4(),
        background: {
            value: "white",
            type: "color",
        },
        content: [],
    }
}

const SLIDE_WIDTH: number = 1920
const SLIDE_HEIGHT: number = 1080

const DEFAULT_SLIDE_COORDS: Point = {
    x: 0,
    y: 0
}

const DEFAULT_SLIDE_GAP: number = 20

export {
    defaultSlide,
    createDefaultSlide,
    SLIDE_WIDTH,
    SLIDE_HEIGHT,
    DEFAULT_SLIDE_COORDS,
    DEFAULT_SLIDE_GAP
}