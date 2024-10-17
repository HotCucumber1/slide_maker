import {CSSProperties} from "react";
import {Point, Size} from "../../store/objects.ts";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";

type ImageObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    src: string,
};


function ImageObjectView({pos, size, scale, src}: ImageObjectProps)
{
    return (
        <img
            style={getSlideObjectStyles(pos, size, scale)}
            src={src}
            alt={src.split("/").pop()}
        />
    )
}


export {
    ImageObjectView
}