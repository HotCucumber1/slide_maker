import { Editor } from "../editor.ts";

function deleteSlides(editor: Editor): Editor {
    const selectedSlides = editor.selectedSlides;

    if (selectedSlides.length === 0) {
        return editor;
    }

    const lastSelectedSlideId = selectedSlides[selectedSlides.length - 1];

    const lastSelectedSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === lastSelectedSlideId
    );

    let newActiveSlidePos = lastSelectedSlideIndex + 1;

    if (newActiveSlidePos >= editor.presentation.slides.length) {
        newActiveSlidePos = lastSelectedSlideIndex - 1;
    }

    const selection = newActiveSlidePos >= 0 && newActiveSlidePos < editor.presentation.slides.length
        ? [editor.presentation.slides[newActiveSlidePos].id]
        : [];

    const newSlides = editor.presentation.slides.filter(
        slide => !selectedSlides.includes(slide.id)
    );

    return {
        ...editor,
        selectedSlides: selection,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export {
    deleteSlides,
};