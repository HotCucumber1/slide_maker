import {CSSProperties} from "react";
import {Color, FontStyle, Point, Size} from "../../store/objects.ts";
import styles from "./TextObjectView.module.css";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {setText} from "../../store/functions.ts";

type ObjectWrapperProps = {
    objectId: string
    pos: Point,
    size: Size,
    scale: number,
    onClick: React.MouseEventHandler,
};


function ObjectWrapper(props: ObjectWrapperProps)
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

    return (
        <div
            style={getSlideObjectStyles(props.pos, props.size, props.scale)}
        ></div>
    )
}


export {
    TextObjectView
}