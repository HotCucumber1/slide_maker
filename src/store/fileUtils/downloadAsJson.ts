import {Editor} from "../editor.ts";

function downloadAsJson(editor: Editor, filename: string = "my_presentation.json"): void
{
    const jsonData = JSON.stringify(editor, null, 2);
    const fileData = new Blob(
        [jsonData],
        {
            type: "application/json"
        });

    const fileUrl = URL.createObjectURL(fileData);
    const fileLink = document.createElement("a");
    fileLink.href = fileUrl;
    fileLink.download = filename;

    fileLink.click();
    URL.revokeObjectURL(fileUrl);
    fileLink.remove();
}



export {
    downloadAsJson,
}