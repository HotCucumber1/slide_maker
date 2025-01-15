import { Editor } from "../editor.ts"

function setFontSize(editor: Editor, newFontSize: number): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )

    if (currentSlideIndex === -1) {
        return editor
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent = currentSlide.content.map(object => {
        if (editor.selectedObjects.includes(object.id) && object.type === "text") {
            return { ...object, fontSize: newFontSize }
        }
        return object
    })

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        { ...currentSlide, content: updatedContent },
        ...editor.presentation.slides.slice(currentSlideIndex + 1)
    ]

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    setFontSize,
}