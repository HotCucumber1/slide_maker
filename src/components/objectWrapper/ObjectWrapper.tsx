import {Point, Size} from "../../store/objects.ts";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import * as React from "react";
import {CSSProperties} from "react";


type ObjectWrapperProps = {
    objectId: string
    pos: Point,
    size: Size,
    scale: number,
    onClick: React.MouseEventHandler,
    children: React.ReactNode,
    isSelected: boolean,
};


function ObjectWrapper(props: ObjectWrapperProps)
{
    const objectStyles: CSSProperties = {};
    if (props.isSelected)
    {
        objectStyles.border = `${5 * props.scale}px solid #2F7DF7`;
    }

    return (
        <div
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