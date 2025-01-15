import { Editor } from "../editor.ts"
import {
    Color,
    Gradient,
    Image
} from "../objects.ts"

function setSlideBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }
    const currentSlide = editor.presentation.slides[currentSlideIndex]

    const updatedSlide = {
        ...currentSlide,
        background: newBackground,
    }
    const updatedSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        updatedSlide,
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    }
}

export {
    setSlideBackground,
};
