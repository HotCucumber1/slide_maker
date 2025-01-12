import {Editor} from "../editor.ts"
import {Photo} from "../../api/apiData.ts"

function storeImages(editor: Editor, images: Photo[]) {
    return {
        ...editor,
        images: images
    }
}

export {
    storeImages,
}