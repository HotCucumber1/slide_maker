import {Editor} from "./editor.ts";
import {ImageObject, Point, Size} from "./objects.ts";
import {v4 as uuidv4} from "uuid";


type AddImageProps = {
    position: Point,
    size: Size,
    src: string,
}

function addImage(editor: Editor, {position, size, src}: AddImageProps): Editor
{
    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        src: src,
        type: "image"
    };
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.content.push(imageObject);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, currentSlide]
        }
    };
}

export {
    addImage
}