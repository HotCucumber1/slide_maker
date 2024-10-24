import {Editor} from "./editor.ts";
import {Color, Gradient, Image} from "./objects.ts";

function setSlideBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.background = newBackground;

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
    setSlideBackground,
}