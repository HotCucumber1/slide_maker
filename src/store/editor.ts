import {Presentation, SelectedObjects, SelectedSlides} from "./objects.ts";

type Editor = {
    presentation: Presentation,
    currentSlideId: string,
    selectedSlides: SelectedSlides,
    selectedObjects: SelectedObjects,
};

let editor: Editor = {
    presentation: {
        title: "Новая презентация",
        slides: []
    },
    currentSlideId: "",
    selectedSlides: [],
    selectedObjects: []
};
let editorChangeHandler = null;


function getEditor(): Editor
{
    return editor;
}

function setEditor(newEditor: Editor): void
{
    editor = newEditor
}

function addEditorChangeHandler(handler)
{
    editorChangeHandler = handler;
}

function dispatch(modifyFunc: Function, payload: Object): void
{
    const newEditor = modifyFunc(editor, payload);
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