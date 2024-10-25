import styles from "./ToolBar.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {addSlide} from "../../store/addSlide.ts";
import {Icon, MenuButton} from "../../components/menuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/testData/testData.ts";
import {setPresentationTitle} from "../../store/setPresentationTitle.ts";
import {deleteSlides} from "../../store/deleteSlide.ts";
import {addText} from "../../store/addText.ts";
import {addImage} from "../../store/addImage.ts";


const addSlideButtonContent: Icon = {
    type: "icon",
    src: "../../../public/image/add_slide_button_icon.png",
}

const deleteSlideButtonContent: Icon = {
    type: "icon",
    src: "../../../public/image/delete_slide_button_icon.png",
}

const addTextButtonContent: Icon = {
    type: "icon",
    src: "../../../public/image/add_text_button_icon.png",
}

const addImageButtonContent: Icon = {
    type: "icon",
    src: "./../../public/image/add_image_button_icon.png",
}

const addFigureButtonContent: Icon = {
    type: "icon",
    src: "./../../public/image/add_figure_button_icon.png",
}

type ToolBarProps = {
    fileName: string,
}

function ToolBar({fileName}: ToolBarProps)
{
    const onTitleChange = (event) => {
        dispatch(setPresentationTitle, (event.target as HTMLInputElement).value)
    }

    const onButtonClick = () => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement
        fileInput.click()
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
                    id="fileInput"
                    onChange={onFileChange}
                    accept="image/"
                />

                <span className={styles.slideActionsText}>Слайд</span>
                <MenuButton
                    content={addSlideButtonContent}
                    onClick={() => dispatch(addSlide)}
                >
                </MenuButton>
                <MenuButton
                    content={deleteSlideButtonContent}
                    onClick={() => dispatch(deleteSlides)}
                >
                </MenuButton>

                <div className={styles.toolBarSeparator}>
                </div>

                <span className={styles.slideActionsText}>Добавить объект </span>
                <MenuButton
                    content={addTextButtonContent}
                    onClick={() => dispatch(addText, defaultTextSettings)}
                >
                </MenuButton>
                <MenuButton
                    content={addImageButtonContent}
                    onClick={onButtonClick}
                    iconStyles={{
                        marginTop: "2px",
                        height: "50%",
                    }}
                >
                </MenuButton>
                <MenuButton
                    content={addFigureButtonContent}
                    onClick={() => dispatch(addText, defaultTextSettings)}
                    iconStyles={{
                        marginTop: "2px",
                        height: "50%",
                    }}
                >
                </MenuButton>

                <div className={styles.toolBarSeparator}>
                </div>
            </div>
        </div>
    )
}

export {
    ToolBar
}