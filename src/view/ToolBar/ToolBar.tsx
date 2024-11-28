import styles from "./ToolBar.module.css"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import {defaultTextSettings} from "../../store/default_data/defaultObjectSettings.ts"
import * as ButtonData from "./toolBarButtonsData.ts"
import {downloadAsJson} from "../../file_utils/downloadAsJson.ts"
import {uploadImageFile, uploadJsonPresentation} from "../../file_utils/uploadFile.ts"
import {useRef, useState} from "react"
import icon from "../../assets/icons/icon.png"
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {ErrorToast} from "../../components/ErrorToast/ErrorToast.tsx"


function ToolBar()
{
    const [showToast, setShowToast] = useState(false)

    const imageFileInputRef = useRef(null);
    const backgroundFileInputRef = useRef(null);
    const colorInputRef = useRef(null);
    const uploadFileInputRef = useRef(null);
    const titleRef = useRef(null);

    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title
    const selectedObjects = editor.selectedObjects
    const {
        addSlide,
        setPresentationTitle,
        setFigureColor,
        setSlideBackground,
        deleteSlides,
        addText,
        addLabel,
        addTriangle,
        addEllipse,
        addImage,
        setEditor,
    } = useAppActions()

    const onButtonClick = (inputElement) => {
        inputElement.current.click();
    }

    const onColorChange = (event) => {
        if (selectedObjects.length > 0)
        {
            setFigureColor({
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
        else
        {
            setSlideBackground({
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
    }

    const onImageInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (uploadImageFile(file, "object", addImage)) {
            setShowToast(true)
        }
    }

    const onFileInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!uploadJsonPresentation(file, setEditor)) {
            setShowToast(true)
        }
        event.target.value = null;
    }

    const onBackgroundInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!uploadImageFile(file, "background", setSlideBackground)) {
            setShowToast(true)
        }
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src={icon}
                    alt="icon"
                />
                <input
                    ref={titleRef}
                    onChange={() => setPresentationTitle(titleRef.current.value)}
                    onFocus={(event) => event.target.select()}
                    className={styles.fileName}
                    value={title}
                />
            </div>
            <div className={styles.toolArea}>
                <input
                    className={styles.fileInput}
                    ref={imageFileInputRef}
                    type="file"
                    id="imageFileInput"
                    onChange={onImageInputChange}
                    accept="image/"
                />
                <input
                    className={styles.fileInput}
                    ref={backgroundFileInputRef}
                    type="file"
                    id="bgFileInput"
                    onChange={onBackgroundInputChange}
                    accept="image/"
                />
                <input
                    className={styles.fileInput}
                    ref={uploadFileInputRef}
                    type="file"
                    id="jsonFileInput"
                    onChange={onFileInputChange}
                    accept="application/json"
                />

                <span className={styles.slideActionsText}>Файл</span>
                <MenuButton
                    content={ButtonData.downloadButtonContent}
                    onClick={() => downloadAsJson(
                        editor,
                        title
                    )}
                />
                <MenuButton
                    content={ButtonData.uploadButtonContent}
                    onClick={() => onButtonClick(uploadFileInputRef)}
                />
                <div className={styles.toolBarSeparator}>
                </div>

                <span className={styles.slideActionsText}>Слайд</span>
                <MenuButton
                    content={ButtonData.addSlideButtonContent}
                    onClick={() => addSlide()}
                />
                <MenuButton
                    content={ButtonData.deleteSlideButtonContent}
                    onClick={() => deleteSlides()}
                />
                <MenuButton
                    content={ButtonData.setColorButtonContent}
                    onClick={() => onButtonClick(colorInputRef)}
                    iconStyles={{
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
                    onClick={() => onButtonClick(backgroundFileInputRef)}
                    iconStyles={{
                        height: "60%",
                    }}
                />
                <div className={styles.toolBarSeparator}>
                </div>

                <span className={styles.slideActionsText}>Добавить объект</span>
                <MenuButton
                    content={ButtonData.addTextButtonContent}
                    onClick={() => addText(defaultTextSettings)}
                />
                <MenuButton
                    content={ButtonData.addImageButtonContent}
                    onClick={() => onButtonClick(imageFileInputRef)}
                    iconStyles={{
                        marginTop: "2px",
                        height: "50%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addLabelButtonContent}
                    onClick={() => addLabel()}
                    iconStyles={{
                        marginTop: "1px",
                        height: "45%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addTriangleButtonContent}
                    onClick={() => addTriangle()}
                    iconStyles={{
                        marginTop: "1px",
                        height: "56%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addCircleButtonContent}
                    onClick={() => addEllipse()}
                    iconStyles={{
                        marginTop: "1px",
                        height: "50%",
                    }}
                />

                <div className={styles.toolBarSeparator}>
                </div>
            </div>
            {showToast &&
                <ErrorToast
                    message={"Выберите корректный тип файла"}
                    onClose={() => setShowToast(false)}
                    duration={3000}
                >
                </ErrorToast>
            }
        </div>
    )
}

export {
    ToolBar,
}
