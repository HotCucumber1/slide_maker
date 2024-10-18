import {CSSProperties} from "react";
import {Color, FontStyle} from "../../store/objects.ts";
import styles from "./TextObjectView.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {setText} from "../../store/functions.ts";

type TextObjectProps = {
    scale: number,
    text: string,
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    color: Color,
    objectId: string,
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
                width: "20ch"
            }}
            defaultValue={props.text}
            placeholder={placeholder}
            onChange={onTextChange}
        />
    )
}


export {
    TextObjectView
}