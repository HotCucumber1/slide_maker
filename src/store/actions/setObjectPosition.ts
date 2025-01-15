import { Editor } from "../editor.ts"
import { Point } from "../objects.ts"

function setObjectPosition(editor: Editor, newPosition: Point): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const selectedObject = currentSlide.content.find(
        object => editor.selectedObjects.includes(object.id)
    )
    if (!selectedObject) {
        return editor
    }
    const updatedObject = {
        ...selectedObject,
        pos: newPosition
    };

    const updatedContent = currentSlide.content.map(object =>
        object.id === selectedObject.id ? updatedObject : object
    )

    const updatedSlide = { ...currentSlide, content: updatedContent };

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        updatedSlide,
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]

    return {
        ...editor,
        selectedObjects: [updatedObject.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    setObjectPosition,
};
