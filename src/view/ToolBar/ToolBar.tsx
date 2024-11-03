import styles from "./ToolBar.module.css";
import {dispatch, getEditor} from "../../store/editor.ts";
import {addSlide} from "../../store/actions/addSlide.ts";
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/testData/testData.ts";
import {setPresentationTitle} from "../../store/actions/setPresentationTitle.ts";
import {deleteSlides} from "../../store/actions/deleteSlide.ts";
import {addText} from "../../store/actions/addText.ts";
import {addLabel} from "../../store/actions/addLabel.ts";
import {addEllipse} from "../../store/actions/addEllipse.ts";
import {addTriangle} from "../../store/actions/addTriangle.ts";
import {setSlideBackground} from "../../store/actions/setSlideBackground.ts";
import * as ButtonData from "./toolBarButtonsData.ts";
import {setFigureColor} from "../../store/actions/setFigureColor.ts";
import {downloadAsJson} from "../../store/fileUtils/downloadAsJson.ts";
import {uploadImageFile, uploadJsonPresentation} from "../../store/fileUtils/uploadFile.ts";
import {useRef} from "react";



type ToolBarProps = {
    fileName: string,
}

function ToolBar({fileName}: ToolBarProps)
{
    const imageFileInputRef = useRef(null);
    const backgroundFileInputRef = useRef(null);
    const colorInputRef = useRef(null);
    const uploadFileInputRef = useRef(null);

    const onTitleChange = (event) => {
        dispatch(setPresentationTitle, (event.target as HTMLInputElement).value);
    }

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

    // TODO: не прокидывать ref в модель
    const onImageFileChange = async (event) => {
        const file: File = event.target.files[0];
        uploadImageFile(file, imageFileInputRef);
    }

    // const onFileChange = async (event, inputRef) => {
    //     const file: File = event.target.files[0];
    //     uploadImageFile(file, inputRef);
    // }

    const onFileInputChange = async (event) => {
        const file: File = event.target.files[0];
        uploadJsonPresentation(file);
    }

    const onBgFileChange = async (event) => {
        const file: File = event.target.files[0];
        uploadImageFile(file, backgroundFileInputRef);
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src="../../../public/image/icon2.png"
                    alt="icon"
                />
                <input
                    onBlur={onTitleChange}
                    onFocus={(event) => event.target.select()}
                    className={styles.fileName}
                    defaultValue={fileName}
                />
            </div>
            <div className={styles.toolArea}>
                <input
                    className={styles.fileInput}
                    ref={imageFileInputRef}
                    type="file"
                    id="imageFileInput"
                    onChange={(event) => onFileChange(event, imageFileInputRef)}
                    accept="image/"
                />
                <input
                    className={styles.fileInput}
                    ref={backgroundFileInputRef}
                    type="file"
                    id="bgFileInput"
                    onChange={onBgFileChange}
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
                    content={ButtonData.setImageBackgroundButtonContent}
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
