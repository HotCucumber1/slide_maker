import {Editor} from "../editor.ts";
import {Size} from "../objects.ts"

function setObjectSize(editor: Editor, newSize: Size): Editor {

    const currentSlide = editor.presentation.slides.find(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (!currentSlide) {
        return editor;
    }

    const selectedObject = currentSlide.content.find(
        object => editor.selectedObjects.includes(object.id)
    );

    if (!selectedObject) {
        return editor;
    }

    selectedObject.size = newSize;

    const updatedContent = currentSlide.content.map(
        object => object.id === selectedObject.id ? selectedObject : object
    )
    const updatedSlide = { ...currentSlide, content: updatedContent };

    const updatedSlides = editor.presentation.slides.map(
        slide => slide.id === currentSlide.id ? updatedSlide : slide
    );

    return {
        ...editor,
        selectedObjects: [selectedObject.id],
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}


export {
    setObjectSize,
}