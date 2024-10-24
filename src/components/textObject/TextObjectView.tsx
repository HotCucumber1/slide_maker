import {CSSProperties} from "react";
import {Color, FontStyle} from "../../store/objects.ts";
import styles from "./TextObjectView.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {setText} from "../../store/setText.ts";

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
        lineHeight: `${(props.fontSize + 8) * props.scale}px`,
    };

    if (props.fontStyles.includes("underline"))
    {
        objectStyle.textDecoration = "underline";
    }
    if (props.fontStyles.includes("italic"))
    {
        objectStyle.fontStyle = "italic";
    }
    if (props.fontStyles.includes("bold"))
    {
        objectStyle.fontWeight = "bold";
    }
    return (
        <textarea
            id={props.objectId}
            className={styles.textObject}
            style={{
                ...objectStyle,
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