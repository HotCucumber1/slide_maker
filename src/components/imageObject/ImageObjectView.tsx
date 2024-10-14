import {CSSProperties} from "react";
import {Point, Size} from "../../store/objects.ts";

type ImageObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    src: string,
};


function ImageObjectView({pos, size, scale, src}: ImageObjectProps)
{
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: pos.y * scale,
        left: pos.x * scale,
        width: size.width * scale,
        height: size.height * scale,
    };

    return (
        <img
            style={objectStyle}
            src={src}
            alt={src.split("/").pop()}
        />
    )
}


export {
    ImageObjectView
}