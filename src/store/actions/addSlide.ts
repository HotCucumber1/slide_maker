import {Editor} from "../editor.ts"
import {createDefaultSlide} from "../default_data/defaultSlide.ts"

function addSlide(editor: Editor): Editor {
    const newSlide = createDefaultSlide()

    const lastSelectedSlideIndex = editor.presentation.slides.findIndex(slide =>
        editor.selectedSlides.includes(slide.id)
    )

    const newSlides = [
        ...editor.presentation.slides.slice(0, lastSelectedSlideIndex + 1),
        newSlide,
        ...editor.presentation.slides.slice(lastSelectedSlideIndex + 1),
    ]

    return {
        ...editor,
        selectedSlides: [newSlide.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    addSlide,
}