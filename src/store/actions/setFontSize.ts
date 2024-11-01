import {Editor} from "./editor.ts";

function setFontSize(editor: Editor, newFontSize: number): Editor {
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text") {
        return editor;
    }

    updatedContent.fontSize = newFontSize;
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
    setFontSize,
}