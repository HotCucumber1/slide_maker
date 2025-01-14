import {
    Presentation,
    SelectedObjects,
    SelectedSlides
} from "./objects.ts";
import {Photo} from "../api/apiData.ts"

type Editor = {
    presentation: Presentation,
    selectedSlides: SelectedSlides,
    selectedObjects: SelectedObjects,
};

export {
    Editor,
}