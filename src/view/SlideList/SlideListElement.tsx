import * as React from "react";
import styles from "./SlideList.module.css";
import {dispatch} from "../../store/editor.ts";
import {setSlideSelection} from "../../store/actions/setSlideSelection.ts";
import {CSSProperties, useRef, useState} from "react"
import {useSlideDragAndDrop} from "../../hooks/useSlideDragAndDrop.ts";
import {setSlidePosition} from "../../store/actions/setSlidePosition.ts";
import {defaultEditor} from "../../store/default_data/defaultEditor.ts";

type SlideListElementProps = {
    children: React.ReactNode,
    id: string,
    startPosition: number,
    isSelected: boolean,
}

const SELECTED_SLIDE_BORDER_STYLE = "2px solid #2684FC";

const SlideListElement = ({
    id,
    children,
    // startPosition,
    isSelected,
}: SlideListElementProps) => {
    // const slideListElementRef = useRef(startPosition);
    // const [pos, setPos] = useState(startPosition);
    // useSlideDragAndDrop(slideListElementRef, setPos);
    // if (pos !== startPosition)
    // {
    //     setSlidePosition(defaultEditor, pos);
    // }

    const onSlideClick: React.MouseEventHandler = event => {
        dispatch(setSlideSelection, [(event.target as HTMLDivElement).id]);
    }

    const style: CSSProperties = isSelected
        ? {
            border: SELECTED_SLIDE_BORDER_STYLE,
            borderRadius: 'var(--slide-preview-border-radius)',
            zIndex: 'var(--panel-z-index)',
        }
        : {}

    return (
        <div
            id={id}
            onClick={onSlideClick}
            style={style}
            className={styles.slidePreviewWrapper}
        >
            {children}
        </div>
    )
}

export {
    SlideListElement,
}