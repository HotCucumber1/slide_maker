import {Editor} from "./editor.ts";

function deleteSlides(editor: Editor): Editor
{
    const newSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.indexOf(slide.id) === -1
    );
    editor.selectedSlides = [];

    return  {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    deleteSlides,
}