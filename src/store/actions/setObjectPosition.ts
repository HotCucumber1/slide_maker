import {Editor} from "../editor.ts";
import {Point} from "../objects.ts";

function setObjectPosition(editor: Editor, newPosition: Point): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    updatedContent.pos = newPosition;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

export {
    setObjectPosition,
}