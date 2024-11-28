import styles from "./ToolBar.module.css";
import {dispatch, getEditor} from "../../store/editor.ts";
import {addSlide} from "../../store/actions/addSlide.ts";
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/default_data/defaultObjectSettings.ts";
import {deleteSlides} from "../../store/actions/deleteSlide.ts";
import {addText} from "../../store/actions/addText.ts";
import {addLabel} from "../../store/actions/addLabel.ts";
import {addEllipse} from "../../store/actions/addEllipse.ts";
import {addTriangle} from "../../store/actions/addTriangle.ts";
import {setSlideBackground} from "../../store/actions/setSlideBackground.ts";
import * as ButtonData from "./toolBarButtonsData.ts";
import {setFigureColor} from "../../store/actions/setFigureColor.ts";
import {downloadAsJson} from "../../file_utils/downloadAsJson.ts";
import {uploadImageFile, uploadJsonPresentation} from "../../file_utils/uploadFile.ts";
import {useRef} from "react";
import icon from "../../assets/icons/icon.png";
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"


function ToolBar()
{
    const imageFileInputRef = useRef(null);
    const backgroundFileInputRef = useRef(null);
    const colorInputRef = useRef(null);
    const uploadFileInputRef = useRef(null);
    const titleRef = useRef(null);

    const title = useAppSelector(state => state.title)
    const { setPresentationTitle } = useAppActions()

    const onButtonClick = (inputElement) => {
        inputElement.current.click();
    }

    const onColorChange = (event) => {
        if (getEditor().selectedObjects.length > 0)
        {
            dispatch(setFigureColor, {
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
        else
        {
            dispatch(setSlideBackground, {
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
    }

    const onImageInputChange = async (event) => {
        const file: File = event.target.files[0];
        uploadImageFile(file, "object");
    }

    const onFileInputChange = async (event) => {
        const file: File = event.target.files[0];
        uploadJsonPresentation(file);
        event.target.value = null;
    }

    const onBackgroundInputChange = async (event) => {
        const file: File = event.target.files[0];
        uploadImageFile(file, "background");
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
                        getEditor(),
                        getEditor().presentation.title)
                    }
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
                    onClick={() => dispatch(addSlide)}
                />
                <MenuButton
                    content={ButtonData.deleteSlideButtonContent}
                    onClick={() => dispatch(deleteSlides)}
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
                    onClick={() => dispatch(addText, defaultTextSettings)}
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
                    onClick={() => dispatch(addLabel)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "45%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addTriangleButtonContent}
                    onClick={() => dispatch(addTriangle)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "56%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addCircleButtonContent}
                    onClick={() => dispatch(addEllipse)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "50%",
                    }}
                />

                <div className={styles.toolBarSeparator}>
                </div>
            </div>
        </div>
    )
}

export {
    ToolBar,
}
