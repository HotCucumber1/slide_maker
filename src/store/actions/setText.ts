import {Editor} from "../editor.ts"
import {Slide} from "../objects.ts"

function setText(editor: Editor, newText: string): Editor {
    const currentSlide = editor.presentation.slides.find(
        slide => slide.id === editor.selectedSlides[0]
    )

    if (!currentSlide) {
        return editor
    }

    const updatedContentIndex = currentSlide.content.findIndex(
        object => editor.selectedObjects.includes(object.id)
    )

    if (updatedContentIndex === -1 || currentSlide.content[updatedContentIndex].type !== "text") {
        return editor;
    }

    const updatedContent = {
        ...currentSlide.content[updatedContentIndex],
        text: newText,
    }

    const updatedContentList = [
        ...currentSlide.content.slice(0, updatedContentIndex),
        updatedContent,
        ...currentSlide.content.slice(updatedContentIndex + 1),
    ]

    const newSlides: Slide[] = [
        ...editor.presentation.slides.slice(0, editor.presentation.slides.indexOf(currentSlide)),
        { ...currentSlide, content: updatedContentList,},
        ...editor.presentation.slides.slice(editor.presentation.slides.indexOf(currentSlide) + 1),
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
    setText,
}