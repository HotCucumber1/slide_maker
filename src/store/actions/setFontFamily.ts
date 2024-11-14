import {Editor} from "../editor.ts";

function setFontFamily(editor: Editor, newFontFamily: string): Editor
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

    updatedContent.fontFamily = newFontFamily;
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
    setFontFamily,
}