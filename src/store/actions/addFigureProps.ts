import {Color, Gradient, Point, Size} from "../objects.ts";

type AddFigureProps = {
    position?: Point,
    size?: Size,
    fillStyle?: Color|Gradient,
    strokeWidth?: number,
    strokeStyle?: Color,
}

export {
    AddFigureProps
}