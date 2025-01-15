import { Editor } from "../editor.ts";
import { FontStyle } from "../objects.ts";

function setFontStyle(editor: Editor, newFontStyles: FontStyle): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent = currentSlide.content.map(object => {
        if (editor.selectedObjects.includes(object.id) && object.type === "text") {
            return {
                ...object,
                fontStyles: newFontStyles
            }
        }
        return object
    })
    const updatedSlide = {
        ...currentSlide,
        content: updatedContent
    }
    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        updatedSlide,
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ];
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    setFontStyle,
};
