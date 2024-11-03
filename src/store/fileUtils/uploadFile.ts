import {dispatch, Editor} from "../editor.ts";
import {setSlideBackground} from "../actions/setSlideBackground.ts";
import {MutableRefObject, RefObject} from "react";
import {addImage} from "../actions/addImage.ts";

function uploadJsonPresentation(dataFile: File): void
{
    if (!dataFile)
    {
        return;
    }
    if (dataFile.type !== "application/json")
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

function uploadImageFile(dataFile: File, inputElement: RefObject<HTMLInputElement>): void
{
    const allowedTypes = ['image/svg', 'image/png', 'image/jpeg'];
    if (!dataFile)
    {
        return;
    }
    if (!allowedTypes.includes(dataFile.type))
    {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result as string;

        switch (inputElement.current?.id)
        {
            case "imageFileInput":
                img.onload = () => {
                    dispatch(addImage, {img})
                };
                break;
            case "bgFileInput":
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