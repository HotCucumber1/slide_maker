import {v4 as uuidv4} from "uuid";
import {
    Color,
    Gradient,
    Image,
    ImageObject,
    Point,
    Presentation,
    Size,
    Slide,
    TextObject,
    SelectedObjects,
    SelectedSlides,
    SlideObject,
    FontStyle,
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
    };
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    };
}

export function deleteSlides(presentation: Presentation, selection: SelectedSlides): Presentation // передавать selection
{
    const newSlides = presentation.slides.filter(slide => selection.indexOf(slide.id) === -1);
    return  {
        ...presentation,
        slides: newSlides,
    };
}

export function setSlidePosition(presentation: Presentation, slide: Slide, newPosition: number): Presentation
{
    if (newPosition < 0 || newPosition > presentation.slides.length)
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
                               position: Point,
                               fontSize: number,
                               fontFamily: string,
                               fontStyles: FontStyle,
                               size?: Size,
                               color?: Color): Slide // в объект
{
    // добавить дефолтные параметры
    const defaultColor: Color = { value: "black", type: "color" };
    const defaultTextPadding: number = 5;
    const defaultSize: Size = { height: fontSize + 2 * defaultTextPadding, width: 500};
    const defaultText: string = "";

    const textObject: TextObject = {
        id: uuidv4(),
        pos: position,
        text: defaultText,
        size: typeof size === "undefined" ? defaultSize : size,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontStyles: fontStyles,
        color: typeof color === "undefined" ? defaultColor : color,
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
                                src: string): Slide
{
    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        src: src,
        type: "image"
    };
    return {
        ...slide,
        content: [...slide.content, imageObject],
    };
}

export function deleteSlideObjects(slide: Slide, selection: SelectedObjects): Slide
{
    const newContent = slide.content.filter(object => selection.indexOf(object.id) === -1);
    return {
        ...slide,
        content: newContent,
    };
}

export function setTextPosition(object: SlideObject, newPosition: Point): SlideObject
{
    if (object.type !== "text")
    {
        return object;
    }
    return {
        ...object,
        pos: newPosition,
    };
}

export function setTextSize(object: SlideObject, newSize: Size): SlideObject
{
    if (object.type !== "text")
    {
        return object;
    }
    return {
        ...object,
        size: newSize,
    };
}

export function setImagePosition(object: SlideObject, newPosition: Point): SlideObject
{
    if (object.type !== "image")
    {
        return object;
    }
    return {
        ...object,
        pos: newPosition,
    };
}

export function setImageSize(object: SlideObject, newSize: Size): SlideObject
{
    if (object.type !== "image")
    {
        return object;
    }
    return {
        ...object,
        size: newSize,
    };
}

export function setText(content: SlideObject, newText: string): SlideObject
{
    if (content.type !== "text")
    {
        return content;
    }
    return {
        ...content,
        text: newText,
    };
}

export function setFontSize(content: SlideObject, newFontSize: number): SlideObject
{
    if (content.type !== "text")
    {
        return content;
    }
    return {
        ...content,
        fontSize: newFontSize,
    };

}

export function setFontFamily(content: SlideObject, newFontFamily: string): SlideObject
{
    if (content.type !== "text")
    {
        return content;
    }
    return {
        ...content,
        fontFamily: newFontFamily,
    };
}

export function setFontStyle(content: SlideObject, newFontStyles: FontStyle): SlideObject
{
    if (content.type !== "text")
    {
        return content;
    }
    return {
        ...content,
        fontStyles: newFontStyles,
    };
}

export function setSlideBackground(slide: Slide, newBackground: Color|Image|Gradient): Slide
{
    return {
        ...slide,
        background: newBackground,
    };
}

export function setPresentationBackground(presentation: Presentation, newBackground: Color|Image|Gradient): Presentation
{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => setSlideBackground(slide, newBackground)),
    };
}