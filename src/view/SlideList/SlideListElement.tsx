import styles from "./SlideList.module.css"
import {
    CSSProperties, useCallback, useEffect,
    useRef,
    useState,
} from "react"
import {useAppActions} from "../../hooks/useAppActions.ts"
import { DEFAULT_SLIDE_COORDS } from "../../store/default_data/defaultSlide.ts"
import {useSlideDragAndDrop} from "../../hooks/useSlideDragAndDrop.ts"
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
    const { setSlideSelection } = useAppActions()
    const selectedSlides = useAppSelector(editor => editor.selectedSlides)
    const [slideCoords, setSlideCoords] = useState(DEFAULT_SLIDE_COORDS)
    const slideRef = useRef(null)

    const { isDragging} = useSlideDragAndDrop(startIndex, slideRef, setSlideCoords)

    const style: CSSProperties = isSelected
        ? {
            border: SELECTED_SLIDE_BORDER_STYLE,
            borderRadius: 'var(--slide-preview-border-radius)',
            zIndex: isDragging ? "999" : 'var(--panel-z-index)',
            transform: `translate(0, ${isDragging ? slideCoords.y : 0}px)`,
        }
        : {}

    const setSelection = event => {
        event.stopPropagation()
        if (event.ctrlKey) {
            setSlideSelection([...selectedSlides, id])
            return
        }
        setSlideSelection([id])
    }

    return (
        <div
            id={id}
            style={{
                ...style,
            }}
            className={styles.slidePreviewWrapper}
            ref={slideRef}
            onClick={setSelection}
        >
            {children}
        </div>
    )
}

export {
    SlideListElement,
}