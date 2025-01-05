import styles from "./ToolBar.module.css"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "./toolBarButtonsData.ts"
import
    React, {
    MutableRefObject,
    useRef
} from "react"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {uploadImageFile} from "../../file_utils/uploadFile.ts"
import {useAppSelector} from "../../hooks/useAppSelector.ts"

type SlideToolsProps = {
    setError: (value: boolean) => void
    onClick: (ref: MutableRefObject<null>) => void
}

function SlideTools({onClick, setError}: SlideToolsProps) {

    const editor = useAppSelector((editor => editor))
    const selectedObjects = editor.selectedObjects

    const colorInputRef = useRef(null)
    const backgroundFileInputRef = useRef(null)

    const {
        addSlide,
        deleteSlides,
        setSlideBackground,
        setFigureColor
    } = useAppActions()

    const onBackgroundInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!uploadImageFile(file, "background", setSlideBackground)) {
            setError(true)
        }
    }

    const onColorChange = (event) => {
        if (selectedObjects.length > 0) {
            setFigureColor({
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
        else {
            setSlideBackground({
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
    }


    return (
        <>
            <input
                className={styles.fileInput}
                ref={backgroundFileInputRef}
                type="file"
                id="bgFileInput"
                onChange={onBackgroundInputChange}
                accept="image/"
            />

            <span className={styles.slideActionsText}>Слайд</span>
            <MenuButton
                content={ButtonData.addSlideButtonContent}
                onClick={addSlide}
            />
            <MenuButton
                content={ButtonData.deleteSlideButtonContent}
                onClick={deleteSlides}
            />
            <MenuButton
                content={ButtonData.setColorButtonContent}
                onClick={() => onClick(colorInputRef)}
                styles={{
                    height: "50%",
                }}
            />
            <input
                className={styles.colorInput}
                type="color"
                id="colorInput"
                onChange={onColorChange}
                ref={colorInputRef}
            />
            <MenuButton
                content={ButtonData.setBackgroundImageButtonContent}
                onClick={() => onClick(backgroundFileInputRef)}
                styles={{
                    height: "60%",
                }}
            />
        </>
    )
}

export {
    SlideTools
}