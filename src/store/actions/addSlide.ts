import {Editor} from "../editor.ts";
import {Slide} from "../objects.ts";
import {v4 as uuidv4} from "uuid";

function addSlide(editor: Editor): Editor
{
    const newSlide: Slide = {
        id: uuidv4(),
        background: {
            value: "white",
            type: "color",
        },
        content: [],
    };
    const selectedSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.indexOf(slide.id) !== -1
    );

    const lastSelectedSlide = selectedSlides[selectedSlides.length - 1];
    const lastSelectedSlideIndex = editor.presentation.slides.indexOf(lastSelectedSlide);

    const newSlides = editor.presentation.slides.slice();
    newSlides.splice(lastSelectedSlideIndex + 1, 0, newSlide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export {
    addSlide,
}