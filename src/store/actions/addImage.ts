import { Editor } from "../editor.ts"
import { ImageObject, Point } from "../objects.ts"
import { defaultPos } from "../default_data/defaultObjectSettings.ts"
import { v4 as uuidv4 } from "uuid"

type AddImageProps = {
    position?: Point;
    src: string;
    width: number;
    height: number;
};

function addImage(
    editor: Editor,
    {
        position,
        src,
        width,
        height
    }: AddImageProps
): Editor {
    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: position ?? defaultPos,
        size: {
            width,
            height,
        },
        src,
        type: "image",
    }

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selectedSlides[0]) {
            return {
                ...slide,
                content: [...slide.content, imageObject],
            }
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selectedObjects: [imageObject.id],
    }
}

export {
    addImage,
    AddImageProps,
};