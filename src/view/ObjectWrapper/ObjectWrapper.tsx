import {Point, Size} from "../../store/objects.ts"
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts"
import {
    CSSProperties,
    useEffect,
    useRef,
    useState,
} from "react"
import styles from "./ObjectWrapper.module.css"
import {joinStyles} from "../../service/joinStyles.ts"
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts"
import {useObjectDragAndDrop} from "../../hooks/useObjectDragAndDrop.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {useResize} from "../../hooks/useResize.ts"


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

    const topLeftHandle = useRef(null)
    const topHandle = useRef(null)
    const topRightHandle = useRef(null)
    const rightHandle = useRef(null)
    const bottomRightHandle = useRef(null)
    const bottomHandle = useRef(null)
    const bottomLeftHandle = useRef(null)
    const leftHandle = useRef(null)

    const [currentPos, setPos] = useState(pos)
    // const [currentSize, setSize] = useState(size)
    const [isDragging, setIsDragging] = useState(false)

    useObjectDragAndDrop(
        wrapperRef,
        setPos,
        isSelected,
        () => setIsDragging(true),
        () => setIsDragging(false)
    )
    // useResize(
    //     wrapperRef,
    //     setSize,
    //     setPos,
    //     () => setIsDragging(true),
    //     () => setIsDragging(false)
    // )

    const {
        setObjectSelection,
        deleteSlideObjects,
    } = useAppActions()

    const onObjectClick: React.MouseEventHandler = (event) => {
        event.stopPropagation()
        setObjectSelection([(event.target as HTMLDivElement).id])
    }

    const onButtonClick: React.KeyboardEventHandler = (event) => {
        if (event.key === "Delete") {
            deleteSlideObjects()
        }
    }

    useEffect(() => {
        const wrapperElement = wrapperRef.current

        wrapperElement.addEventListener("keydown", onButtonClick)
        wrapperElement.addEventListener("mousedown", onObjectClick)

        return () => {
            wrapperElement.removeEventListener("keydown", onButtonClick)
            wrapperElement.removeEventListener("mousedown", onObjectClick)
        }
    })

    const wrapperStyles: CSSProperties = {}
    const handleStyles: CSSProperties = {
        display: "none",
    }

    if (isSelected && scale === WORK_AREA_SCALE) {
        wrapperStyles.outline = `${4 * scale}px solid #2684FC`
        wrapperStyles.zIndex = 100
        handleStyles.display = "block"
    }
    if (isAdaptive) {
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
                ...getSlideObjectStyles(isDragging
                    ? currentPos
                    : pos,
                    size,
                    scale
                ),
                ...wrapperStyles,
            }}
        >
            <div
                data-handle="top-left"
                ref={topLeftHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topLeftHandle)}
            ></div>
            <div
                data-handle="top"
                ref={topHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topHandle)}
            ></div>
            <div
                data-handle="top-right"
                ref={topRightHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topRightHandle)}
            ></div>
            <div
                data-handle="right"
                ref={rightHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.rightHandle)}
            ></div>
            <div
                data-handle="bottom-right"
                ref={bottomRightHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomRightHandle)}
            ></div>
            <div
                data-handle="bottomt"
                ref={bottomHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomHandle)}
            ></div>
            <div
                data-handle="bottom-left"
                ref={bottomLeftHandle}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomLeftHandle)}
            ></div>
            <div
                data-handle="left"
                ref={leftHandle}
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