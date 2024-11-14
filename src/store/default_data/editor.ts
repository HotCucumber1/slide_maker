import {Editor} from "../editor.ts";
import {defaultPresentation} from "./defaultPresentation.ts";


const editor: Editor = {
    presentation: defaultPresentation,
    selectedSlides: [defaultPresentation.slides[0].id],
    selectedObjects: [],
};


export {
    editor,
}