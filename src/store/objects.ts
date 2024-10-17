type Presentation = {
    title: string;
    slides: Slide[];
}

type SelectedSlides = string[];

type Slide = {
    id: string;
    background: Color|Gradient|Image;
    content: Array<SlideObject>;
}

type SelectedObjects = string[];

type BaseObject = {
    id: string;
    pos: Point;
    size: Size;
}

type ImageObject = BaseObject & Image;

type TextObject = BaseObject & {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyles: FontStyle;
    color: Color;
    type: "text";
}

type FontStyle = Array<"italic"|"bold"|"underline">;

type FigureObject = BaseObject & {
    fillStyle: Color|Gradient;
    strokeStyle: Color;
    strokeWidth: number;
}

type LabelFigure = FigureObject & {
    type: "label";
}

type EllipseFigure = FigureObject & {
    type: "ellipse";
}

type TriangleFigure = FigureObject & {
    type: "triangle";
}

/*
    Команды d:
    Z — замыкает контур, возвращаясь к начальной точке (50, 50).
    M (Move To) — перемещение пера без рисования.
    L (Line To) — рисование линии.
    H (Horizontal Line To) — рисование горизонтальной линии.
    V (Vertical Line To) — рисование вертикальной линии.
    C (Cubic Bezier Curve) — рисование кубической кривой Безье.
    S (Smooth Cubic Bezier Curve) — плавная кубическая кривая.
    Q (Quadratic Bezier Curve) — квадратичная кривая Безье.
    A (Arc) — дуга окружности.
    Z — закрыть контур, возвращая перо в начальную точку.
 */
type PathFigure = FigureObject & {
    pathType: Array<"Z"|"M"|"L"|"H"|"V"|"C"|"S"|"Q"|"A">;
    points: Point[];
    type: "path";
}

type SlideObject = TextObject|
                   ImageObject|
                   LabelFigure|
                   EllipseFigure|
                   TriangleFigure|
                   PathFigure;

type Gradient = {
    colors: Color[];
    angle: number;
    type: "gradient";
}

type Image = {
    src: string;
    type: "image";
}

type Color = {
    value: string;
    type: "color";
}

type Point = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

export {
    Presentation,
    SelectedSlides,
    SelectedObjects,
    Slide,
    ImageObject,
    TextObject,
    LabelFigure,
    TriangleFigure,
    EllipseFigure,
    PathFigure,
    FontStyle,
    SlideObject,
    Gradient,
    Image,
    Color,
    Point,
    Size
}
