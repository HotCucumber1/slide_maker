import {Point, Size} from "../../store/objects.ts"
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts"
import * as React from "react"
import {CSSProperties, useEffect, useRef} from "react"
import styles from "./ObjectWrapper.module.css"
import {dispatch} from "../../store/editor.ts"
import {deleteSlideObjects} from "../../store/actions/deleteSlideObject.ts"
import {joinStyles} from "../../service/joinStyles.ts"
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts"
import {setObjectSelection} from "../../store/actions/setObjectSelection.ts";


type ObjectWrapperProps = {
    objectId: string
    pos: Point,
    size: Size,
    scale: number,
    children: React.ReactNode,
    isSelected: boolean,
    isAdaptive?: boolean,
}

const ObjectWrapper = ({
    objectId,
    pos,
    size,
    scale,
    children,
    isSelected,
    isAdaptive,
}: ObjectWrapperProps) => {

    const wrapperRef = useRef(null)

    const onObjectClick: React.MouseEventHandler = (event) => {
        event.stopPropagation()
        dispatch(setObjectSelection, [(event.target as HTMLDivElement).id])
    }

    const onButtonClick: React.KeyboardEventHandler = (event) => {
        if (event.key === "Delete") {
            dispatch(deleteSlideObjects, (event.target as HTMLDivElement).children)
        }
    }

    useEffect(() => {
        const wrapperElement = wrapperRef.current
        wrapperElement.addEventListener("click", onButtonClick)
        return () => {
            wrapperElement.removeEventListener("click", onButtonClick)
        }
    })

    const wrapperStyles: CSSProperties = {}
    const handleStyles: CSSProperties = {
        display: "none",
    }

    if (isSelected && scale === WORK_AREA_SCALE)
    {
        wrapperStyles.outline = `${4 * scale}px solid #2684FC`
        wrapperStyles.zIndex = 100
        handleStyles.display = "block"
    }
    if (isAdaptive)
    {
        wrapperStyles.height = "fit-content"
    }

    return (
        <div
            ref={wrapperRef}
            tabIndex={0}
            className={styles.wrapper}
            onKeyDown={onButtonClick}
            onClick={onObjectClick}
            id={objectId}
            style={{
                ...getSlideObjectStyles(pos, size, scale),
                ...wrapperStyles,
            }}
        >
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topLeftHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topRightHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.rightHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomRightHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomLeftHandle)}
            ></div>
            <div
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.leftHandle)}
            ></div>
            {children}
        </div>
    )
}


export {
    ObjectWrapper,
}