import * as React from "react";
import styles from "./SlideList.module.css";
import {dispatch} from "../../store/editor.ts";
import {setSlideSelection} from "../../store/actions/setSlideSelection.ts";
import {setActiveSlide} from "../../store/actions/setActiveSlide.ts";
import {useRef, useState} from "react";
import {useSlideDragAndDrop} from "../../hooks/useSlideDragAndDrop.ts";
import {setSlidePosition} from "../../store/actions/setSlidePosition.ts";
import {editor} from "../../store/default_data/editor.ts";

type SlideListElementProps = {
    children: React.ReactNode,
    id: string,
    startPosition: number
}

function SlideListElement({id, children, startPosition}: SlideListElementProps)
{
    // const slideListElementRef = useRef(startPosition);
    // const [pos, setPos] = useState(startPosition);
    // useSlideDragAndDrop(slideListElementRef, setPos);
    // if (pos !== startPosition)
    // {
    //     setSlidePosition(editor, pos);
    // }

    const onSlideClick: React.MouseEventHandler = event => {
        dispatch(setSlideSelection, [(event.target as HTMLDivElement).id]);
        dispatch(setActiveSlide, (event.target as HTMLDivElement).id);
    }

    return (
        <div
            id={id}
            onClick={onSlideClick}
            className={styles.slidePreviewWrapper}
        >
            {children}
        </div>
    )
}

export {
    SlideListElement,
}