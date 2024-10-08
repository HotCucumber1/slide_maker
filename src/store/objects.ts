export type Presentation = {
    title: string;
    slides: Slide[];
}

export type SelectedSlides = string[];

export type Slide = {
    id: string;
    background: Color|Gradient|Image;
    content: Array<SlideObject>;
}

export type SelectedObjects = string[];

type BaseObject = {
    id: string;
    pos: Point;
    size: Size;
}

export type ImageObject = BaseObject & Image;

export type TextObject = BaseObject & {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyles: FontStyle;
    color: Color;
    type: "text";
}

export type FontStyle = Array<"italic"|"bold"|"underline">;

export type FigureObject = BaseObject & {
    fillStyle: Color|Gradient;
    strokeStyle: Color;
    strokeWidth: number;
    type: "figure";
}

export type SlideObject = TextObject|ImageObject|FigureObject;

export type Gradient = {
    colors: Color[];
    angle: number;
    type: "gradient";
}

export type Image = {
    src: string;
    type: "image";
}

export type Color = {
    value: string;
    type: "color";
}

export type Point = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}
