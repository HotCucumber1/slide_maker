import {Editor} from "../editor.ts";
import {ImageObject, Point} from "../objects.ts";
import {v4 as uuidv4} from "uuid";


type AddImageProps = {
    position?: Point,
    img: HTMLImageElement,
}

function addImage(editor: Editor, {position, img}: AddImageProps): Editor
{
    const defaultPosition: Point = {
        x: 100,
        y: 100,
    }

    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: typeof position === "undefined" ? defaultPosition : position,
        size: {width: img.width, height: img.height},
        src: img.src,
        type: "image",
    };
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content.push(imageObject);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}


export {
    addImage
}