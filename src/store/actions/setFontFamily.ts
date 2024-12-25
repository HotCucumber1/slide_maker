import {Editor} from "../editor.ts";

function setFontFamily(editor: Editor, newFontFamily: string): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (currentSlideIndex === -1) {
        return editor;
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const selectedTextObjects = currentSlide.content.filter(
        object => editor.selectedObjects.includes(object.id) && object.type === "text"
    );

    if (selectedTextObjects.length === 0) {
        return editor;
    }
    selectedTextObjects.forEach(textObject => {
        textObject.fontFamily = newFontFamily;
    });

    const newSlides = [...editor.presentation.slides];
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
    setFontFamily,
}