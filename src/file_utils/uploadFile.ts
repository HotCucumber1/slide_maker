import {dispatch, Editor} from "../store/editor.ts";
import {setSlideBackground} from "../store/actions/setSlideBackground.ts";
import {addImage} from "../store/actions/addImage.ts";
import {isValidPresentationJson} from "./jsonValidator.ts";


const JSON_TYPE: string = "application/json";
const IMAGE_TYPES: string[] = ["image/svg", "image/png", "image/jpeg", "image/jpg"];

function uploadJsonPresentation(dataFile: File): void
{
    if (!dataFile)
    {
        return;
    }
    if (dataFile.type !== JSON_TYPE)
    {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {

        const jsonData = event.target.result as string;
        if (!isValidPresentationJson(jsonData))
        {
            alert("Invalid json data");
            return;
        }
        const newEditor: Editor = JSON.parse(jsonData);
        dispatch(() => newEditor);
        alert(`${newEditor.presentation.title} was upload successfully`);
    }
    reader.readAsText(dataFile);
}

function uploadImageFile(dataFile: File, type: "object"|"background"): void
{
    if (!dataFile)
    {
        return;
    }
    if (!IMAGE_TYPES.includes(dataFile.type))
    {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result as string;

        switch (type)
        {
            case "object":
                img.onload = () => {
                    dispatch(addImage, {
                        src: img.src,
                        width: img.width,
                        height: img.height
                    })
                };
                break;
            case "background":
                img.onload = () => {
                    dispatch(setSlideBackground, {
                        src: img.src,
                        type: "image"
                    })
                };
                break;
        }
    }
    reader.readAsDataURL(dataFile);
}

export {
    uploadJsonPresentation,
    uploadImageFile,
}