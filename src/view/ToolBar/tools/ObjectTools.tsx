import styles from "../ToolBar.module.css"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "../toolBarButtonsData.ts"
import {defaultTextSettings} from "../../../store/default_data/defaultObjectSettings.ts"
import
    React, {
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from "react"
import {useAppActions} from "../../../hooks/useAppActions.ts"
import {uploadImageFile} from "../../../file_utils/uploadFile.ts"
import {useAppSelector} from "../../../hooks/useAppSelector.ts"
import {SelectBackgroundPopup} from "./components/SelectBackgroundType.tsx"

type ObjectToolsProps = {
    onClick: (inputRef: MutableRefObject<null>) => void,
    setError: (value: boolean) => void,
    isText: boolean,
    showText: (value: boolean) => void,
    isObject: boolean,
    showObject: (value: boolean) => void,
}

function ObjectTools({
    onClick,
    setError,
    isText,
    showText,
    isObject,
    showObject
}: ObjectToolsProps) {
    const {
        addText,
        addLabel,
        addTriangle,
        addEllipse,
        addImage,
        setFigureColor
    } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selectedObjects)

    const imageFileInputRef = useRef(null)
    const [colorPopup, setColorPopup] = useState(false)

    const onImageInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!uploadImageFile(file, "object", addImage)) {
            setError(true)
        }
    }

    useEffect(() => {
        if (colorPopup) {
            setColorPopup(selectedObjectIds.length > 0)
        }
    }, [selectedObjectIds, colorPopup])

    return (
        <div className={styles.actions}>
            <input
                className={styles.fileInput}
                ref={imageFileInputRef}
                type="file"
                id="imageFileInput"
                onChange={onImageInputChange}
                accept="image/"
            />

            <span className={styles.slideActionsText}>Объекты</span>
            <MenuButton
                content={ButtonData.addTextButtonContent}
                onClick={() => {
                    addText(defaultTextSettings)
                    showText(!isText)
                }}
            />
            <MenuButton
                content={ButtonData.addImageButtonContent}
                onClick={() => onClick(imageFileInputRef)}
                styles={{
                    marginTop: "2px",
                    height: "50%",
                }}
            />
            <MenuButton
                content={ButtonData.addLabelButtonContent}
                onClick={() => {
                    addLabel()
                    showObject(!isObject)
                }}
                styles={{
                    marginTop: "1px",
                    height: "45%",
                }}
            />
            <MenuButton
                content={ButtonData.addTriangleButtonContent}
                onClick={() => {
                    addTriangle()
                    showObject(!isObject)
                }}
                styles={{
                    marginTop: "1px",
                    height: "56%",
                }}
            />
            <MenuButton
                content={ButtonData.addCircleButtonContent}
                onClick={() => {
                    addEllipse()
                    showObject(!isObject)
                }}
                styles={{
                    marginTop: "1px",
                    height: "50%",
                }}
            />
            {selectedObjectIds.length > 0 &&
                <MenuButton
                    content={ButtonData.setColorButtonContent}
                    onClick={() => setColorPopup(!colorPopup)}
                    styles={{
                        height: "50%",
                    }}
                />
            }
            {colorPopup && selectedObjectIds.length > 0 &&
                <SelectBackgroundPopup
                    objectId={selectedObjectIds[0]}
                    setBackground={setFigureColor}
                />
            }
        </div>
    )
}

export {
    ObjectTools,
}