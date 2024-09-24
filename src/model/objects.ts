export type Presentation = {
    title: string;
    slides: Slide[];
    selectedSlides: string[]; // вынести
}

export type Slide = {
    id: string;
    background: Color|Gradient|Image;
    content: Array<TextObject|ImageObject|FigureObject>;
    selectedObjects: string[]; // вынести
}

type SlideObject = {
    id: string;
    pos: Point;
    size: Size;
    // delete SlideId;
}

export type ImageObject = SlideObject & Image & {
    alt: string; // убрать
}

export type TextObject = SlideObject & {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: "italic"|"bold"|"underline"|null; // можно массив
    color: Color;
    type: "text";
}

export type FigureObject = SlideObject & {
    fillStyle: Color|Gradient;
    strokeStyle: Color;
    strokeWidth: number;
    type: "figure";
}


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
