import {Point, Size} from "../../store/objects.ts"
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts"
import {
    CSSProperties,
    useCallback,
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

    const topLeftHandleRef = useRef(null)
    const topHandleRef = useRef(null)
    const topRightHandleRef = useRef(null)
    const rightHandleRef = useRef(null)
    const bottomRightHandleRef = useRef(null)
    const bottomHandleRef = useRef(null)
    const bottomLeftHandleRef = useRef(null)
    const leftHandleRef = useRef(null)

    const [currentPos, setPos] = useState(pos)
    const [currentSize, setSize] = useState(size)

    const isDragging = useObjectDragAndDrop(wrapperRef, setPos, isSelected)
    const { isResizing, onResizeStart } = useResize(size, pos, setSize, setPos)

    const { setObjectSelection, deleteSlideObjects } = useAppActions()

    const onObjectClick: React.MouseEventHandler = useCallback((event) => {
        event.stopPropagation()
        setObjectSelection([(event.target as HTMLDivElement).id])
    }, [setObjectSelection])

    const onButtonClick: React.KeyboardEventHandler = useCallback((event) => {
        if (event.key === "Delete") {
            deleteSlideObjects()
        }
    }, [deleteSlideObjects])

    const onMouseDown = useCallback((event, ref) => {
        event.stopPropagation()
        onResizeStart(event, ref.current.getAttribute('data-handle'))
    }, [onResizeStart])

    useEffect(() => {
        const handles = [
            topLeftHandleRef,
            topHandleRef,
            topRightHandleRef,
            rightHandleRef,
            bottomRightHandleRef,
            bottomHandleRef,
            bottomLeftHandleRef,
            leftHandleRef,
        ]
        const wrapperElement = wrapperRef.current

        wrapperElement.addEventListener("keydown", onButtonClick)
        wrapperElement.addEventListener("mousedown", onObjectClick)

        handles.forEach(ref => {
            if (ref.current) {
                ref.current.addEventListener("mousedown", (event) => onMouseDown(event, ref))
            }
        })

        return () => {
            wrapperElement.removeEventListener("keydown", onButtonClick)
            wrapperElement.removeEventListener("mousedown", onObjectClick)

            handles.forEach(ref =>{
                if (ref.current) {
                    ref.current.removeEventListener("mousedown", (event) => onMouseDown(event, ref))
                }
            })
        }
    }, [onButtonClick, onMouseDown, onObjectClick])

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
                ...getSlideObjectStyles(
                    isDragging ? currentPos : pos,
                    isResizing ? currentSize : size,
                    scale
                ),
                ...wrapperStyles,
            }}
        >
            <div
                data-handle="top-left"
                ref={topLeftHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topLeftHandle)}
            ></div>
            <div
                data-handle="top"
                ref={topHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topHandle)}
            ></div>
            <div
                data-handle="top-right"
                ref={topRightHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.topRightHandle)}
            ></div>
            <div
                data-handle="right"
                ref={rightHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.rightHandle)}
            ></div>
            <div
                data-handle="bottom-right"
                ref={bottomRightHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomRightHandle)}
            ></div>
            <div
                data-handle="bottom"
                ref={bottomHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomHandle)}
            ></div>
            <div
                data-handle="bottom-left"
                ref={bottomLeftHandleRef}
                style={handleStyles}
                className={joinStyles(styles.resizeHandle, styles.bottomLeftHandle)}
            ></div>
            <div
                data-handle="left"
                ref={leftHandleRef}
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