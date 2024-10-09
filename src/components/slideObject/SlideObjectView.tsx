import {Size, SlideObject} from "../../store/objects.ts";
import {CSSProperties} from "react";

import styles from "./SlideObject.module.css";


type SlideObjectProps = {
    object: SlideObject,
    slideSize: Size,
};


export default function SlideObjectView(props: SlideObjectProps)
{
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: props.object.pos.y / props.slideSize.height * 100 + '%',
        left: props.object.pos.x / props.slideSize.width * 100 + "%",
        width: props.object.size.width / props.slideSize.width * 100 + "%",
        height: props.object.size.height / props.slideSize.height * 100 + "%",
    };
    switch (props.object.type)
    {
        // TODO: вынести это и разделить по объектам
        case "text":
            objectStyle["fontSize"] = props.object.fontSize + "px";
            objectStyle["fontFamily"] = props.object.fontFamily;
            objectStyle["color"] = props.object.color.value;
            if (props.object.fontStyles.indexOf("underline"))
            {
                objectStyle["textDecoration"] = "underline";
            }
            if (props.object.fontStyles.indexOf("italic"))
            {
                objectStyle["fontStyle"] = "underline";
            }
            if (props.object.fontStyles.indexOf("bold"))
            {
                objectStyle["fontWeight"] = "bold";
            }
            return (
                <input
                    className={styles.textObject}
                    style={objectStyle}
                    defaultValue={props.object.text}
                />
            )
        case "image":
            return (
                <img
                    style={objectStyle}
                    src={props.object.src}
                    alt={props.object.src.split("/").pop()}
                />
            )
        case "figure":
            objectStyle["border"] = props.object.strokeWidth + "px solid " + props.object.strokeStyle.value;
            switch (props.object.fillStyle.type)
            {
                case "color":
                    objectStyle["backgroundColor"] = props.object.fillStyle.value;
                    break;
                case "gradient":
                    objectStyle["background"] =
                        "linear-gradient(" + props.object.fillStyle.angle + "deg, " + props.object.fillStyle.colors
                                                                                                                .map(color => color.value)
                                                                                                                .join(", ") + ")";
                    break;
            }
            return (
                <div style={objectStyle}></div>
            )
    }
}