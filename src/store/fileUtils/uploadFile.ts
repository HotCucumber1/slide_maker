import {dispatch, Editor} from "../editor.ts";
import {setSlideBackground} from "../actions/setSlideBackground.ts";
import {addImage} from "../actions/addImage.ts";


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
        const newEditor: Editor = JSON.parse(jsonData);
        dispatch(() => newEditor);
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
                    dispatch(addImage, {img})
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