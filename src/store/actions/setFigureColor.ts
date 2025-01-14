import { Editor } from "../editor.ts";
import {
    Color,
    Gradient,
    Slide,
    SlideObject
} from "../objects.ts"

function setFigureColor(editor: Editor, color: Color|Gradient): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (currentSlideIndex === -1) {
        return editor;
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent: SlideObject[] = currentSlide.content.map(object => {
        if (editor.selectedObjects.includes(object.id) && (object.type !== "image" && object.type !== "text")) {
            return {
                ...object,
                fillStyle: color,
            };
        }
        return object;
    });

    const newSlides: Slide[] = editor.presentation.slides.map((slide, index) => {
        if (index === currentSlideIndex) {
            return {
                ...slide,
                content: updatedContent
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export {
    setFigureColor,
};