import {Slide} from "../objects.ts";
import {v4 as uuidv4} from "uuid";

const defaultSlide: Slide = {
    id: uuidv4(),
    background: {
        value: "white",
        type: "color",
    },
    content: [],
};

export {
    defaultSlide,
}