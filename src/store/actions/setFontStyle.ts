import {Editor} from "../editor.ts";
import {FontStyle} from "../objects.ts";

function setFontStyle(editor: Editor, newFontStyles: FontStyle): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent.fontStyles = newFontStyles;
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
    setFontStyle,
}