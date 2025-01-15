import { Editor } from "../editor.ts";
import { Color } from "../objects.ts";

function setFontColor(editor: Editor, newFontColor: Color): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex]

    const updatedContent = currentSlide.content.map(object => {
        if (editor.selectedObjects.includes(object.id) && object.type === "text") {
            return {
                ...object,
                color: newFontColor
            }
        }
        return object
    })

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        { ...currentSlide, content: updatedContent },
        ...editor.presentation.slides.slice(currentSlideIndex + 1)
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
    setFontColor,
};