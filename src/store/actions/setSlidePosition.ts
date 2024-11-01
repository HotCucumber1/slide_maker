import {Editor} from "../editor.ts";

function setSlidePosition(editor: Editor, newPosition: number): Editor
{
    if (newPosition < 0 || newPosition > editor.presentation.slides.length)
    {
        return editor;
    }

    const oldSlidePosition = editor.presentation.slides.indexOf(
        editor.presentation.slides
            .filter(slide => slide.id === editor.selectedSlides[0])[0]
    );
    const newSlides = editor.presentation.slides.slice();
    const oneSlide = newSlides.splice(oldSlidePosition, 1)[0];

    newSlides.splice(newPosition, 0, oneSlide);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    setSlidePosition,
}