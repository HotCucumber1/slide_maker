import { Editor } from "../editor.ts";
import { Size } from "../objects.ts";

function setObjectSize(editor: Editor, newSize: Size): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex]

    const selectedObject = currentSlide.content.find(
        object => editor.selectedObjects.includes(object.id)
    )
    if (!selectedObject) {
        return editor
    }

    const updatedObject = {
        ...selectedObject,
        size: newSize
    }
    const updatedContent = currentSlide.content.map(
        object => object.id === selectedObject.id ? updatedObject : object
    )
    const updatedSlide = {
        ...currentSlide,
        content: updatedContent
    }

    const updatedSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        updatedSlide,
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]
    return {
        ...editor,
        selectedObjects: [updatedObject.id],
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    }
}

export {
    setObjectSize,
};
