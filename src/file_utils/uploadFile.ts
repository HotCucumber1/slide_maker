import {Editor} from "../store/editor.ts"
import {isValidPresentationJson} from "./jsonValidator.ts"


const JSON_TYPE = "application/json"
const IMAGE_TYPES = ["image/svg", "image/png", "image/jpeg", "image/jpg"]

function uploadJsonPresentation(dataFile: File, saveEditor): void
{
    if (!dataFile || dataFile.type !== JSON_TYPE) {
        return
    }

    const reader = new FileReader()
    reader.onload = (event) => {

        const jsonData = event.target.result as string
        if (!isValidPresentationJson(jsonData))
        {
            alert("Invalid json data")
            return
        }
        const newEditor: Editor = JSON.parse(jsonData)
        saveEditor(newEditor)
        alert(`${newEditor.presentation.title} was upload successfully`)
    }
    reader.readAsText(dataFile)
}

function uploadImageFile(dataFile: File, type: "object"|"background", addContent): void
{
    if (!dataFile || !IMAGE_TYPES.includes(dataFile.type)) {
        return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result as string

        img.onload = () => {
            const args = type === "object"
                ? {
                    src: img.src,
                    width: img.width,
                    height: img.height
                }
                : {
                    src: img.src,
                    type: "image"
                }
            addContent(args)
        }
    }
    reader.readAsDataURL(dataFile)
}

export {
    uploadJsonPresentation,
    uploadImageFile,
}