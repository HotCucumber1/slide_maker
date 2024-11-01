import {Editor} from "./editor.ts";


const stateName = "documentState";

function saveDocumentState(editor: Editor): void {
    const jsonEditor = JSON.stringify(editor)
    localStorage.setItem(stateName, jsonEditor)
}

function getDocumentState(): Editor|null {
    const jsonEditor = localStorage.getItem(stateName);
    if (jsonEditor)
    {
        return JSON.parse(jsonEditor);
    }
    return null;
}

export {
    saveDocumentState,
    getDocumentState,
}