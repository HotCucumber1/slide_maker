import { Editor } from "../editor.ts"

function setSlidePosition(editor: Editor, newPosition: number): Editor {
    if (newPosition < 0 || newPosition >= editor.presentation.slides.length) {
        return editor
    }
    const selectedSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.includes(slide.id)
    )
    if (selectedSlides.length === 0) {
        return editor
    }
    const unselectedSlides = editor.presentation.slides.filter(
        slide => !editor.selectedSlides.includes(slide.id)
    )

    const newSlides = [
        ...unselectedSlides.slice(0, newPosition),
        ...selectedSlides,
        ...unselectedSlides.slice(newPosition)
    ]
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    setSlidePosition,
};
