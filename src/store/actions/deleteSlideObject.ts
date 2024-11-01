import {Editor} from "../editor.ts";

function deleteSlideObjects(editor: Editor): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];

    currentSlide.content = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    );
    editor.selectedObjects = [];

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    deleteSlideObjects,
}