import styles from "./SlideList.module.css"
import {CSSProperties, useCallback, useState} from "react"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {useNewSlideDragAndDrop} from "../../hooks/useNewSlideDragAndDrop.ts"
import {Point} from "../../store/objects.ts"
import {DEFAULT_SLIDE_COORDS, SLIDE_HEIGHT} from "../../store/default_data/defaultSlide.ts"
import {SLIDE_LIST_SCALE} from "../../store/default_data/scale.ts"
import {useAppSelector} from "../../hooks/useAppSelector.ts"

type SlideListElementProps = {
    children: React.ReactNode,
    id: string,
    startIndex: number,
    isSelected: boolean,
}

const SELECTED_SLIDE_BORDER_STYLE = "2px solid #2684FC";

function SlideListElement({
    id,
    children,
    startIndex,
    isSelected,
}: SlideListElementProps) {
    const { setSlideSelection, setSlidePosition } = useAppActions()
    const [slideCoords, setSlideCoords] = useState(DEFAULT_SLIDE_COORDS)
    const slides = useAppSelector((editor => editor.presentation.slides))

    const onCoordsChange = useCallback((newCoords: Point) => {
        let newIndex = Math.floor(newCoords.y / (SLIDE_HEIGHT * SLIDE_LIST_SCALE))
        newIndex += startIndex

        if (newIndex !== startIndex && newIndex >= 0 && newIndex < slides.length) {
            setSlidePosition(newIndex)
        }
        setSlideCoords(DEFAULT_SLIDE_COORDS)
    }, [setSlidePosition, slides.length, startIndex])

    // const { slideRef, newSlideCoords} = useNewSlideDragAndDrop(
    //     slideCoords,
    //     onCoordsChange
    // )

    const style: CSSProperties = isSelected
        ? {
            border: SELECTED_SLIDE_BORDER_STYLE,
            borderRadius: 'var(--slide-preview-border-radius)',
            zIndex: 'var(--panel-z-index)',
            transform: `translate(0, ${DEFAULT_SLIDE_COORDS.y}px)`
        }
        : {
            transform:`translate(0, ${DEFAULT_SLIDE_COORDS.y}px)`
        }

    return (
        <div
            id={id}
            onClick={() => setSlideSelection([id])}
            style={style}
            className={styles.slidePreviewWrapper}
            // ref={slideRef}
        >
            {children}
        </div>
    )
}

export {
    SlideListElement,
}