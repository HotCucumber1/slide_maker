import {CSSProperties} from "react";
import {Color, FontStyle, Point, Size} from "../../store/objects.ts";
import styles from "./TextObjectView.module.css";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";

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
        fontSize: `${props.fontSize * props.scale}px`,
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
            style={{
                ...objectStyle,
                ...getSlideObjectStyles(props.pos, props.size, props.scale),
            }}
            defaultValue={props.text}
        />
    )
}


export {
    TextObjectView
}