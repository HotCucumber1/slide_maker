import {Point, Size} from "../../store/objects.ts";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import * as React from "react";
import {CSSProperties} from "react";
import styles from "./ObjectWrapper.module.css";
import {dispatch} from "../../store/editor.ts";
import {deleteSlideObjects} from "../../store/deleteSlideObject.ts";


type ObjectWrapperProps = {
    objectId: string
    pos: Point,
    size: Size,
    scale: number,
    onClick: React.MouseEventHandler,
    children: React.ReactNode,
    isSelected: boolean,
    isAdaptive?: boolean,
};


function ObjectWrapper(props: ObjectWrapperProps)
{
    const onButtonClick: React.KeyboardEventHandler = (event) => {
        if (event.key === "Delete") {
            dispatch(deleteSlideObjects, (event.target as HTMLDivElement).children)
        }
    }

    const objectStyles: CSSProperties = {};
    if (props.isSelected)
    {
        objectStyles.border = `${4 * props.scale}px solid #2F7DF7`;
    }
    if (props.isAdaptive)
    {
        objectStyles.height = "fit-content";
    }

    return (
        <div
            tabIndex={0}
            className={!props.isSelected ? styles.wrapper_able : ""}
            onKeyDown={onButtonClick}
            onClick={props.onClick}
            id={props.objectId}
            style={{
                ...getSlideObjectStyles(props.pos, props.size, props.scale),
                ...objectStyles,
            }}
        >
            {props.children}
        </div>
    )
}


export {
    ObjectWrapper
}