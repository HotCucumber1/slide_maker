import {Editor} from "./editor.ts";

function deleteSlideObjects(editor: Editor): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];

    currentSlide.content = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    );
    editor.selectedObjects = [];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide
            ]
        }
    };
}

export {
    deleteSlideObjects,
}