import styles from "../ToolBar.module.css"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "../toolBarButtonsData.ts"
import
    React, {
    MutableRefObject,
    useRef,
    useState,
} from "react"
import {useAppActions} from "../../../hooks/useAppActions.ts"
import {uploadImageFile} from "../../../file_utils/uploadFile.ts"
import {SelectBackgroundPopup} from "./components/SelectBackgroundType.tsx"

type SlideToolsProps = {
    setError: (value: boolean) => void
    onClick: (ref: MutableRefObject<null>) => void
}

function SlideTools({onClick, setError}: SlideToolsProps) {
    const backgroundFileInputRef = useRef(null)

    const [colorPopup, setColorPopup] = useState(false)

    const {
        addSlide,
        deleteSlides,
        setSlideBackground,
    } = useAppActions()

    const onBackgroundInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!uploadImageFile(file, "background", setSlideBackground)) {
            setError(true)
        }
    }

    return (
        <div className={styles.slideActions}>
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
                onClick={() => setColorPopup(!colorPopup)}
                styles={{
                    height: "50%",
                }}
            />
            <MenuButton
                content={ButtonData.setBackgroundImageButtonContent}
                onClick={() => onClick(backgroundFileInputRef)}
                styles={{
                    height: "60%",
                }}
            />
            {colorPopup && <SelectBackgroundPopup/>}
        </div>
    )
}

export {
    SlideTools,
}