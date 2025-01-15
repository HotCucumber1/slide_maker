import {
    Presentation,
    SelectedObjects,
    SelectedSlides
} from "./objects.ts"

type Editor = {
    presentation: Presentation,
    selectedSlides: SelectedSlides,
    selectedObjects: SelectedObjects,
};

export {
    Editor,
}