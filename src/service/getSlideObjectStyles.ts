import {CSSProperties} from "react";
import {Point, Size} from "../store/objects.ts";

function getSlideObjectStyles(pos: Point, size: Size, scale: number): CSSProperties
{
    return {
        position: "absolute",
        top: pos.y * scale,
        left: pos.x * scale,
        width: size.width * scale,
        height: size.height * scale,
    };
}

export {
    getSlideObjectStyles,
}