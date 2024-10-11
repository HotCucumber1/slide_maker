import {CSSProperties} from "react";
import {Color, FontStyle, Point, Size} from "../../../store/objects.ts";
import styles from "../SlideObject.module.css";

type TextObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    text: string,
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    color: Color
};


function TextObjectView(props: TextObjectProps)
{
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: props.pos.y * props.scale,
        left: props.pos.x * props.scale,
        width: props.size.width * props.scale,
        height: props.size.height * props.scale,
        fontSize: props.fontSize * props.scale + "px",
        fontFamily: props.fontFamily,
        color: props.color.value,
    };

    if (props.fontStyles.indexOf("underline") > 0)
    {
        objectStyle.textDecoration = "underline";
    }
    if (props.fontStyles.indexOf("italic") > 0)
    {
        objectStyle.fontStyle = "italic";
    }
    if (props.fontStyles.indexOf("bold") > 0)
    {
        objectStyle.fontWeight = "bold";
    }
    return (
        <input
            className={styles.textObject}
            style={objectStyle}
            defaultValue={props.text}
        />
    )
}


export {
    TextObjectView
}