import {Editor} from "../editor.ts";
import {defaultPresentation} from "./defaultPresentation.ts";


const editor: Editor = {
    presentation: defaultPresentation,
    currentSlideId: defaultPresentation.slides[0].id,
    selectedSlides: [defaultPresentation.slides[0].id],
    selectedObjects: []
};


export {
    editor,
}