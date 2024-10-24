import {v4 as uuidv4} from "uuid";
import {Color, FontStyle, Point, Size, TextObject} from "./objects.ts";
import {Editor} from "./editor.ts";

type AddTextProps = {
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    size?: Size,
    color?: Color,
    position?: Point,
}

function addText(editor: Editor, props: AddTextProps): Editor
{
    const defaultPosition: Point = {
        x: 500,
        y: 500,
    }
    const defaultColor: Color = {
        value: "black",
        type: "color"
    };
    const defaultTextPadding: number = 5;
    const defaultSize: Size = {
        height: props.fontSize + 2 * defaultTextPadding,
        width: 400
    };
    const defaultText: string = "";

    const textObject: TextObject = {
        id: uuidv4(),
        pos: typeof props.position === "undefined" ? defaultPosition : props.position,
        text: defaultText,
        size: typeof props.size === "undefined" ? defaultSize : props.size,
        fontSize: props.fontSize,
        fontFamily: props.fontFamily,
        fontStyles: props.fontStyles,
        color: typeof props.color === "undefined" ? defaultColor : props.color,
        type: "text",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content.push(textObject);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    // TODO: обновить модельку добавления слайдов при изменении текста (здесь норм)
    return {
        ...editor,
        selectedObjects: [textObject.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    addText,
}