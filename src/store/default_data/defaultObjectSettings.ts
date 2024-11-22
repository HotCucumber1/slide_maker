import {Color, Point, Size} from "../objects.ts";


const DEFAULT_FONT_SIZE: number = 72;
const DEFAULT_TEXT_COLOR: Color = {
    value: "black",
    type: "color",
};
const DEFAULT_FONT_FAMILY: string = "sans-serif";
const DEFAULT_TEXT_PADDING: number = 5;
const DEFAULT_TEXT_SIZE: Size = {
    width: 700,
    height: DEFAULT_FONT_SIZE + DEFAULT_TEXT_PADDING * 2,
};
const DEFAULT_OBJECT_WIDTH: number = 500;
const DEFAULT_OBJECT_HEIGHT: number = 600;

const DEFAULT_OBJECT_X: number = 800;
const DEFAULT_OBJECT_Y: number = 300;

const DEFAULT_FILL_STYLE: Color = {
    value: "white",
    type: "color",
};
const DEFAULT_STROKE_WIDTH: number = 4;



const defaultTextSettings = {
    color: DEFAULT_TEXT_COLOR,
    fontSize: DEFAULT_FONT_SIZE,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontStyles: [],
    size: DEFAULT_TEXT_SIZE,
};

const defaultSize: Size = {
    width: DEFAULT_OBJECT_WIDTH,
    height: DEFAULT_OBJECT_HEIGHT,
};

const defaultPos: Point = {
    x: DEFAULT_OBJECT_X,
    y: DEFAULT_OBJECT_Y
};

const defaultFillStyle: Color = DEFAULT_FILL_STYLE;

const defaultStrokeStyle: Color = DEFAULT_TEXT_COLOR;

const defaultStrokeWidth: number = DEFAULT_STROKE_WIDTH;

export {
    defaultTextSettings,
    defaultStrokeWidth,
    defaultStrokeStyle,
    defaultFillStyle,
    defaultSize,
    defaultPos,
}