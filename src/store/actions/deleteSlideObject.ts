import { Editor } from "../editor.ts";

function deleteSlideObjects(editor: Editor): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }
    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent = currentSlide.content.filter(
        object => !editor.selectedObjects.includes(object.id)
    )

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        {
            ...editor.presentation.slides[currentSlideIndex],
            content: updatedContent,
        },
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]
    return {
        ...editor,
        selectedObjects: [],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    deleteSlideObjects,
};