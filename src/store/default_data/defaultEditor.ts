import {Editor} from "../editor.ts";
import {defaultPresentation} from "./defaultPresentation.ts";


const defaultEditor: Editor = {
    presentation: defaultPresentation,
    selectedSlides: [defaultPresentation.slides[0].id],
    selectedObjects: [],
    images: []
};


export {
    defaultEditor,
}