import styles from "./ToolBar.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {addSlide} from "../../store/addSlide.ts";
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/testData/testData.ts";
import {setPresentationTitle} from "../../store/setPresentationTitle.ts";
import {deleteSlides} from "../../store/deleteSlide.ts";
import {addText} from "../../store/addText.ts";
import {addImage} from "../../store/addImage.ts";
import {addLabel} from "../../store/addLabel.ts";
import {addEllipse} from "../../store/addEllipse.ts";
import {addTriangle} from "../../store/addTriangle.ts";
import {setSlideBackground} from "../../store/setSlideBackground.ts";
import * as ButtonData from "./toolBarButtonsData.ts";



type ToolBarProps = {
    fileName: string,
}

function ToolBar({fileName}: ToolBarProps)
{
    const onTitleChange = (event) => {
        dispatch(setPresentationTitle, (event.target as HTMLInputElement).value)
    }

    const onFileButtonClick = () => {
        const fileInput = document.getElementById("imageFileInput") as HTMLInputElement
        fileInput.click()
    }

    const onColorButtonClick = () => {
        const colorInput = document.getElementById("colorInput") as HTMLInputElement
        colorInput.click()
    }

    const onColorChange = (event) => {
        dispatch(setSlideBackground, {
            value: (event.target as HTMLInputElement).value,
            type: "color"
        })
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0]
        if (file)
        {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target.result as string

                img.onload = () => {
                    dispatch(addImage, {img})
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src="../../../public/image/icon.png" alt="icon"
                />
                <input
                    onBlur={onTitleChange}
                    className={styles.fileName}
                    defaultValue={fileName}
                />
            </div>
            <div className={styles.toolArea}>
                <input
                    className={styles.fileInput}
                    type="file"
                    id="imageFileInput"
                    onChange={onFileChange}
                    accept="image/"
                />
                <input
                    className={styles.fileInput}
                    type="file"
                    id="fileInput"
                    onChange={onFileChange}
                    accept="image/"
                />
                <input
                    className={styles.colorInput}
                    type="color"
                    id="colorInput"
                    onChange={onColorChange}
                />

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
                    content={ButtonData.setColorBackgroundButtonContent}
                    onClick={onColorButtonClick}
                    iconStyles={{
                        height: "50%",
                    }}
                />
                <MenuButton
                    content={ButtonData.setImageBackgroundButtonContent}
                    onClick={onColorButtonClick}
                    iconStyles={{
                        height: "60%",
                    }}
                />

                <div className={styles.toolBarSeparator}>
                </div>

                <span className={styles.slideActionsText}>Добавить объект </span>
                <MenuButton
                    content={ButtonData.addTextButtonContent}
                    onClick={() => dispatch(addText, defaultTextSettings)}
                />
                <MenuButton
                    content={ButtonData.addImageButtonContent}
                    onClick={onFileButtonClick}
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
    ToolBar
}