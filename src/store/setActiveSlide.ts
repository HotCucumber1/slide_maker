import {Editor} from "./editor.ts";

function setActiveSlide(editor: Editor, newActiveSlideId: string): Editor
{
    return {
        ...editor,
        currentSlideId: newActiveSlideId,
    }
}

export {
    setActiveSlide,
}