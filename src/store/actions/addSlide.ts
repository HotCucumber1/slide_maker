import {Editor} from "../editor.ts";
import {defaultSlide} from "../default_data/defaultSlide.ts";

function addSlide(editor: Editor): Editor
{
    const newSlide = defaultSlide;
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