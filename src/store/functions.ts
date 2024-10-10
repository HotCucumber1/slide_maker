import {v4 as uuidv4} from "uuid";
import {
    Color,
    Gradient,
    Image,
    ImageObject,
    Point,
    Size,
    Slide,
    TextObject,
    FontStyle, FigureObject, EllipseFigure,
} from "./objects";
import {Editor} from "./editor.ts";


function setPresentationTitle(editor: Editor, newTitle: string): Editor
{
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    };
}

function addSlide(editor: Editor): Editor
{
    const newSlide: Slide = {
        id: uuidv4(),
        background: {
            value: "white",
            type: "color",
        },
        content: [],
    };
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, newSlide],
        },
    };
}

function deleteSlides(editor: Editor): Editor
{
    const newSlides = editor.presentation.slides.filter(
        slide => editor.selectedSlides.indexOf(slide.id) === -1
    );
    editor.selectedSlides = [];

    return  {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

function setSlidePosition(editor: Editor, newPosition: number): Editor
{
    if (newPosition < 0 || newPosition > editor.presentation.slides.length)
    {
        return editor;
    }

    const oldSlidePosition = editor.presentation.slides.indexOf(
        editor.presentation.slides
                                .filter(slide => slide.id === editor.selectedSlides[0])[0]
    );
    const newSlides = editor.presentation.slides.slice();
    const oneSlide = newSlides.splice(oldSlidePosition, 1)[0];

    newSlides.splice(newPosition, 0, oneSlide);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

type AddTextProps = {
    position: Point,
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    size?: Size,
    color?: Color,
}

function addText(editor: Editor, props: AddTextProps): Editor
{
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
        pos: props.position,
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
    currentSlide.content.push(textObject);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, currentSlide]
        }
    };
}

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

type AddFigureProps = {
    position: Point,
    size: Size,
    fillStyle?: Color|Gradient,
    strokeWidth?: number,
    strokeStyle?: Color,
}

function addFigure(editor: Editor, props: AddFigureProps): Editor
{
    const baseFillStyle: Color = {
        value: "gray",
        type: "color",
    };
    const baseStrokeWidth = 1;
    const baseStrokeStyle: Color = {
        value: "black",
        type: "color",
    };
    const figureObject: FigureObject = {
        id: uuidv4(),
        pos: props.position,
        size: props.size,
        fillStyle: typeof props.fillStyle === "undefined" ? baseFillStyle : props.fillStyle,
        strokeWidth: typeof props.strokeWidth === "undefined" ? baseStrokeWidth : props.strokeWidth,
        strokeStyle:  typeof props.strokeStyle === "undefined" ? baseStrokeStyle : props.strokeStyle,
        type: "figure",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.content.push(figureObject);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, currentSlide]
        }
    };
}

function addEllipse(editor: Editor, props: AddFigureProps): Editor
{
    const baseFillStyle: Color = {
        value: "gray",
        type: "color",
    };
    const baseStrokeWidth = 1;
    const baseStrokeStyle: Color = {
        value: "black",
        type: "color",
    };

    const radiusX: number = props.size.width / 2;
    const radiusY: number = props.size.height / 2;

    const newEllipse: EllipseFigure = {
        id: uuidv4(),
        pos: props.position,
        size: props.size,
        fillStyle: typeof props.fillStyle === "undefined" ? baseFillStyle : props.fillStyle,
        strokeWidth: typeof props.strokeWidth === "undefined" ? baseStrokeWidth : props.strokeWidth,
        strokeStyle:  typeof props.strokeStyle === "undefined" ? baseStrokeStyle : props.strokeStyle,
        radiusX: radiusX,
        radiusY: radiusY,
        type: "figure",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.content.push(newEllipse);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, currentSlide]
        }
    };
}

function deleteSlideObjects(editor: Editor): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];

    currentSlide.content = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    );
    editor.selectedObjects = [];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide
            ]
        }
    };
}

function setObjectPosition(editor: Editor, newPosition: Point): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    updatedContent.pos = newPosition;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setObjectSize(editor: Editor, newSize: Size): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    updatedContent.size = newSize;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setText(editor: Editor, newText: string): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent.text = newText;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setFontSize(editor: Editor, newFontSize: number): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent.fontSize = newFontSize;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setFontFamily(editor: Editor, newFontFamily: string): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent.fontFamily = newFontFamily;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setFontStyle(editor: Editor, newFontStyles: FontStyle): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const updatedContent = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) === -1
    )[0];

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent.fontStyles = newFontStyles;
    currentSlide.content = [
        ...currentSlide.content,
        updatedContent,
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setSlideBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.background = newBackground;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                currentSlide,
            ]
        }
    };
}

function setPresentationBackground(editor: Editor, newBackground: Color|Image|Gradient): Editor
{
    const updatedSlides = editor.presentation.slides.slice();
    updatedSlides.forEach(
        slide => slide.background = newBackground
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}

export {
    setText,
    setFontFamily,
    setFontSize,
    setSlideBackground,
    setFontStyle,
    setPresentationBackground,
    setPresentationTitle,
    setSlidePosition,
    setObjectPosition,
    setObjectSize,
    addEllipse,
    addFigure,
    addText,
    addImage,
    addSlide,
    deleteSlides,
    deleteSlideObjects,
}