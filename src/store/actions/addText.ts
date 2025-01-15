import { v4 as uuidv4 } from "uuid"
import { Color, FontStyle, Point, Size, TextObject } from "../objects.ts"
import { Editor } from "../editor.ts"

type AddTextProps = {
    fontSize: number;
    fontFamily: string;
    fontStyles: FontStyle;
    size?: Size;
    color?: Color;
    position?: Point;
};

function addText(editor: Editor, props: AddTextProps): Editor {
    const defaultPosition: Point = {
        x: 500,
        y: 500,
    }
    const defaultColor: Color = {
        value: "black",
        type: "color",
    }
    const defaultTextPadding: number = 5

    const defaultSize: Size = {
        height: props.fontSize + 2 * defaultTextPadding,
        width: 700,
    }

    const textObject: TextObject = {
        id: uuidv4(),
        pos: props.position ?? defaultPosition,
        text: "",
        size: props.size ?? defaultSize,
        fontSize: props.fontSize,
        fontFamily: props.fontFamily,
        fontStyles: props.fontStyles,
        color: props.color ?? defaultColor,
        type: "text",
    }

    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor
    }

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        {
            ...editor.presentation.slides[currentSlideIndex],
            content: [
                ...editor.presentation.slides[currentSlideIndex].content,
                textObject,
            ],
        },
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]

    return {
        ...editor,
        selectedObjects: [textObject.id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}

export {
    addText,
    AddTextProps,
}