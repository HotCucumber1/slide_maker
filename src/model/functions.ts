import {v4 as uuidv4} from "uuid";
import {
    Color,
    FigureObject,
    Gradient,
    Image,
    ImageObject,
    Point,
    Presentation,
    Size,
    Slide,
    TextObject
} from "./objects";

export function setPresentationTitle(presentation: Presentation, newTitle: string): Presentation
{
    return {
        ...presentation,
        title: newTitle
    };
}

export function addSlide(presentation: Presentation): Presentation
{
    const newSlide: Slide = {
        id: uuidv4(),
        background: {
            value: "white",
            type: "color",
        },
        content: [],
        selectedObjects: [],
    };
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    };
}

export function deleteSlides(presentation: Presentation): Presentation // передавать selection
{
    const newSlides = presentation.slides.filter(slide => presentation.selectedSlides.indexOf(slide.id) === -1);
    return  {
        ...presentation,
        selectedSlides: [],
        slides: newSlides,
    };
}

export function setSlidePosition(presentation: Presentation, slide: Slide, newPosition: number): Presentation
{
    // подумать
    if (typeof slide === "undefined" || newPosition < 0 || newPosition > presentation.slides.length)
    {
        return presentation;
    }

    const oldSlidePosition = presentation.slides.indexOf(slide);
    const newSlides= presentation.slides.slice();
    const oneSlide = newSlides.splice(oldSlidePosition, 1)[0];

    newSlides.splice(newPosition, 0, oneSlide);
    return {
        ...presentation,
        slides: newSlides,
    };
}

export function addTextToSlide(slide: Slide,
                               text: string,
                               position: Point,
                               size: Size,
                               fontSize: number,
                               fontFamily: string,
                               fontStyle: "italic"|"bold"|"underline"|null,
                               color: Color): Slide
{
    // добавить дефолтные параметры
    const textObject: TextObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        text: text,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontStyle: fontStyle,
        color: color,
        type: "text",
    };
    return {
        ...slide,
        content: [...slide.content, textObject],
    };
}

export function addImageToSlide(slide: Slide,
                                position: Point,
                                size: Size,
                                src: string,
                                alt: string): Slide
{
    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        src: src,
        alt: alt,
        type: "image"
    };
    return {
        ...slide,
        content: [...slide.content, imageObject],
    };
}

export function deleteSlideObjects(slide: Slide): Slide
{
    const newContent = slide.content.filter(object => slide.selectedObjects.indexOf(object.id) === -1);
    return {
        ...slide,
        selectedObjects: [],
        content: newContent,
    };
}

export function setTextPosition(object: ImageObject|TextObject|FigureObject,
                                newPosition: Point): ImageObject|TextObject|FigureObject
{
    if (typeof object !== "undefined" && object.type === "text")
    {
        return {
            ...object,
            pos: newPosition,
        };
    }
    return object;
}

export function setTextSize(object: ImageObject|TextObject|FigureObject, // в отдельный тип
                            newSize: Size): ImageObject|TextObject|FigureObject
{
    if (typeof object !== "undefined" && object.type === "text")
    {
        return {
            ...object,
            size: newSize,
        };
    }
    return object;
}

export function setImagePosition(object: ImageObject|TextObject|FigureObject,
                                 newPosition: Point): ImageObject|TextObject|FigureObject
{
    if (typeof object !== "undefined" && object.type === "image")
    {
        return {
            ...object,
            pos: newPosition,
        };
    }
    return object;
}

export function setImageSize(object: ImageObject|TextObject|FigureObject,
                             newSize: Size):ImageObject|TextObject|FigureObject
{
    if (typeof object !== "undefined" && object.type === "image")
    {
        return {
            ...object,
            size: newSize,
        };
    }
    return object;
}

export function setText(content: TextObject|ImageObject|FigureObject,
                        newText: string): TextObject|ImageObject|FigureObject
{
    if (typeof content !== "undefined" && content.type === "text")
    {
        return {
            ...content,
            text: newText,
        };
    }
    return content;
}

export function setFontSize(content: TextObject|ImageObject|FigureObject,
                            newFontSize: number): TextObject|ImageObject|FigureObject
{
    if (typeof content !== "undefined" && content.type === "text")
    {
        return {
            ...content,
            fontSize: newFontSize,
        };
    }
    return content;
}

export function setFontFamily(content: TextObject|ImageObject|FigureObject,
                              newFontFamily: string): TextObject|ImageObject|FigureObject
{
    if (typeof content !== "undefined" && content.type === "text")
    {
        return {
            ...content,
            fontFamily: newFontFamily,
        };
    }
    return content;
}

export function setFontStyle(content: TextObject|ImageObject|FigureObject,
                             newFontStyle: "italic"|"bold"|"underline"): TextObject|ImageObject|FigureObject
{
    if (typeof content !== "undefined" && content.type === "text")
    {
        return {
            ...content,
            fontStyle: newFontStyle,
        };
    }
    return content;
}

export function setSlideBackground(slide: Slide, newBackground: Color|Image|Gradient): Slide
{
    if (typeof slide !== "undefined")
    {
        return {
            ...slide,
            background: newBackground,
        };
    }
    return slide;
}

export function setPresentationBackground(presentation: Presentation, newBackground: Color|Image|Gradient): Presentation
{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => setSlideBackground(slide, newBackground)),
    };
}