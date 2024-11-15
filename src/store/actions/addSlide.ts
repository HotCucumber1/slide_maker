import {Editor} from "../editor.ts";
import {createDefaultSlide} from "../default_data/defaultSlide.ts"

function addSlide(editor: Editor): Editor
{
    const newSlide = createDefaultSlide()
    const selectedSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.includes(slide.id)
    );

    const lastSelectedSlide = selectedSlides[selectedSlides.length - 1];
    const lastSelectedSlideIndex = editor.presentation.slides.indexOf(lastSelectedSlide);

    const newSlides = editor.presentation.slides.slice();
    newSlides.splice(lastSelectedSlideIndex + 1, 0, newSlide);
    const selectedSlide = newSlide.id

    return {
        ...editor,
        selectedSlides: [selectedSlide],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export {
    addSlide,
}