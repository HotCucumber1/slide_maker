import {Editor} from "../editor.ts";
import {Point} from "../objects.ts";

function setObjectPosition(editor: Editor, newPosition: Point): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];

    const selectedObject = currentSlide.content.filter(
        object => editor.selectedObjects.includes(object.id)
    )[0]
    const objectIndex = currentSlide.content.indexOf(selectedObject)

    selectedObject.pos = newPosition;

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content[objectIndex] = selectedObject;
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    console.log('OK')

    return {
        ...editor,
        selectedObjects: [selectedObject.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    setObjectPosition,
}