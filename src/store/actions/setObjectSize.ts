import {Editor} from "../editor.ts";
import {Size} from "../objects.ts";

function setObjectSize(editor: Editor, newSize: Size): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const selectedObject = currentSlide.content.filter(
        object => editor.selectedObjects.includes(object.id)
    )[0]
    const objectIndex = currentSlide.content.indexOf(selectedObject)

    selectedObject.size = newSize;

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide)

    currentSlide.content[objectIndex] = selectedObject
    const newSlides = editor.presentation.slides.slice()
    newSlides[currentSlideIndex] = currentSlide

    return {
        ...editor,
        selectedObjects: [selectedObject.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    setObjectSize,
}