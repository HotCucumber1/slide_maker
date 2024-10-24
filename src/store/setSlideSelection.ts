import {Editor} from "./editor.ts";
import {SelectedSlides} from "./objects.ts";

function setSlideSelection(editor: Editor, newSelection: SelectedSlides): Editor
{
    return {
        ...editor,
        selectedObjects: [],
        selectedSlides: newSelection,
    }
}

export {
    setSlideSelection,
}