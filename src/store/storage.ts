import {Editor} from "./editor.ts";
import {isValidPresentationJson} from "../file_utils/jsonValidator.ts";


const stateName = "documentState";

function saveDocumentState(editor: Editor): void {
    const jsonEditor = JSON.stringify(editor);
    localStorage.setItem(stateName, jsonEditor);
}

function getDocumentState(): Editor|null {
    const jsonEditor = localStorage.getItem(stateName);
    if (jsonEditor) {
        if (isValidPresentationJson(jsonEditor)) {
            return JSON.parse(jsonEditor);
        }
        alert("Invalid json data");
    }
    return null;
}

export {
    saveDocumentState,
    getDocumentState,
}