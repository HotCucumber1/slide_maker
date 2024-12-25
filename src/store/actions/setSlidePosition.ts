import {Editor} from "../editor.ts";

function setSlidePosition(editor: Editor, newPosition: number): Editor {
    if (newPosition < 0 || newPosition >= editor.presentation.slides.length) {
        return editor;
    }

    const currentSlide = editor.presentation.slides.find(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (!currentSlide) {
        return editor;
    }

    const newSlides = [...editor.presentation.slides];
    const oldSlidePosition = newSlides.indexOf(currentSlide);
    newSlides.splice(oldSlidePosition, 1);

    newSlides.splice(newPosition, 0, currentSlide);

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