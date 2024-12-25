import {Editor} from "../editor.ts";
import {FontStyle} from "../objects.ts";

function setFontStyle(editor: Editor, newFontStyles: FontStyle): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (currentSlideIndex === -1) return editor; // Если слайд не найден

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent = currentSlide.content.map(object => {
        if (editor.selectedObjects.includes(object.id) && object.type === "text") {
            return {
                ...object,
                fontStyles: newFontStyles,
            };
        }
        return object;
    });

    const updatedSlides = [...editor.presentation.slides];
    updatedSlides[currentSlideIndex] = {
        ...currentSlide,
        content: updatedContent,
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}


export {
    setFontStyle,
}