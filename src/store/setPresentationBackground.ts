import {Editor} from "./editor.ts";
import {Color, Gradient, Image} from "./objects.ts";

function setPresentationBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor
{
    const updatedSlides = editor.presentation.slides.slice();
    updatedSlides.forEach(
        slide => slide.background = newBackground
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}

export {
    setPresentationBackground,
}