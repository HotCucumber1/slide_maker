import {Presentation} from "../objects.ts";
import {defaultSlide} from "./defaultSlide.ts";

const defaultPresentation: Presentation = {
    title: "Новая презентация",
    slides: [defaultSlide],
}

export {
    defaultPresentation,
}