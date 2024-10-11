import {SlideObject} from "../../store/objects.ts";
import {CSSProperties} from "react";

import styles from "./SlideObject.module.css";


type SlideObjectProps = {
    object: SlideObject,
    scale: number,
};


export default function SlideObjectView({object, scale}: SlideObjectProps)
{
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: object.pos.y * scale,
        left: object.pos.x * scale,
        width: object.size.width * scale,
        height: object.size.height * scale,
    };
    switch (object.type)
    {
        case "label":
            objectStyle.border = object.strokeWidth * scale + "px solid " + object.strokeStyle.value;
            switch (object.fillStyle.type)
            {
                case "color":
                    objectStyle.backgroundColor = object.fillStyle.value;
                    break;
                case "gradient":
                    objectStyle.background = "linear-gradient(" + object.fillStyle.angle + "deg, " + object.fillStyle.colors
                                                                                                    .map(color => color.value)
                                                                                                    .join(", ") + ")";
                    break;
            }
            return (
                <div style={objectStyle}></div>
            )
    }
}