import {Editor} from "./editor.ts";
import {Color, Gradient, Image} from "./objects.ts";

function setSlideBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.background = newBackground;

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

export {
    setSlideBackground,
}