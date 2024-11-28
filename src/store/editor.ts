import {Presentation, SelectedObjects, SelectedSlides} from "./objects.ts";
import {defaultEditor} from "./default_data/defaultEditor.ts";
import {getDocumentState, saveDocumentState} from "./storage.ts";

type Editor = {
    presentation: Presentation,
    selectedSlides: SelectedSlides,
    selectedObjects: SelectedObjects,
};

const documentState = getDocumentState() || defaultEditor;
let _editor: Editor = documentState;
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
        saveDocumentState(getEditor());
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