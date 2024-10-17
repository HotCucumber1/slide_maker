import {Presentation, SelectedObjects, SelectedSlides} from "./objects.ts";
import {editor} from "./testData.ts";

type Editor = {
    presentation: Presentation,
    currentSlideId: string,
    selectedSlides: SelectedSlides,
    selectedObjects: SelectedObjects,
};

let _editor: Editor = editor;
let editorChangeHandler = null;


function getEditor(): Editor
{
    return _editor;
}

function setEditor(newEditor: Editor): void
{
    _editor = newEditor
}

function addEditorChangeHandler(handler)
{
    editorChangeHandler = handler;
}

function dispatch(modifyFunc: Function, payload?: Object): void
{
    const newEditor = modifyFunc(_editor, payload);
    setEditor(newEditor);
    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}


export {
    getEditor,
    setEditor,
    Editor,
    dispatch,
    addEditorChangeHandler,
}