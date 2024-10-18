import {CSSProperties} from "react";
import {Color, FontStyle, Point, Size} from "../../store/objects.ts";
import styles from "./TextObjectView.module.css";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {setText} from "../../store/functions.ts";

type TextObjectProps = {
    objectId: string
    pos: Point,
    size: Size,
    scale: number,
    text: string,
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    color: Color,
    onClick: React.MouseEventHandler,
};


function TextObjectView(props: TextObjectProps)
{
    const onTextChange: React.ChangeEventHandler = event => {
        dispatch(setText, (event.target as HTMLInputElement).value)
    }

    const placeholder = "Введите текст...";

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
            id={props.objectId}
            className={styles.textObject}
            style={{
                ...objectStyle,
                ...getSlideObjectStyles(props.pos, props.size, props.scale),
                width: "20ch"
            }}
            defaultValue={props.text}
            placeholder={placeholder}
            onClick={props.onClick}
            onChange={onTextChange}
        />
    )
}


export {
    TextObjectView
}