import {Editor} from "../editor.ts";

function deleteSlides(editor: Editor): Editor
{
    const lastSelectedSlideId = editor.selectedSlides[editor.selectedSlides.length - 1];
    let newActiveSlidePos = editor.presentation.slides
                                                    .map((slide) => slide.id)
                                                    .indexOf(lastSelectedSlideId) + 1;

    if (newActiveSlidePos > editor.presentation.slides.length - 1)
    {
        const firstSelectedSlideId = editor.selectedSlides[editor.selectedSlides.length - 1];
        newActiveSlidePos = editor.presentation.slides
                                            .map((slide) => slide.id)
                                            .indexOf(firstSelectedSlideId) - 1;
    }

    let selection = [];
    if (newActiveSlidePos >= 0)
    {
        const newActiveSlideId = editor.presentation.slides[newActiveSlidePos].id;
        selection = [newActiveSlideId];
    }

    const newSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.indexOf(slide.id) === -1
    );

    return {
        ...editor,
        selectedSlides: selection,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    deleteSlides,
}