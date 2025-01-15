import {Editor} from "../editor.ts";

function setSlidePosition(editor: Editor, newPosition: number): Editor {
    if (newPosition < 0 || newPosition >= editor.presentation.slides.length) {
        return editor;
    }

    const selectedSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.includes(slide.id)
    )
    const unselectedSlides = editor.presentation.slides.filter(
        slide => !editor.selectedSlides.includes(slide.id)
    )

    if (selectedSlides.length === 0) {
        return editor;
    }

    // const newSlides = [...editor.presentation.slides];
    // const oldSlidePosition = newSlides.indexOf(selectedSlides[0]);
    // newSlides.splice(oldSlidePosition, selectedSlides.length);
    //
    // newSlides.splice(newPosition, 0, ...selectedSlides);

    const newSlides = [
        ...unselectedSlides.slice(0, newPosition),
        ...selectedSlides,
        ...unselectedSlides.slice(newPosition, editor.presentation.slides.length - 1)
    ]

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