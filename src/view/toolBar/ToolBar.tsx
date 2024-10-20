import styles from "./ToolBar.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {addSlide, addText, deleteSlides, setPresentationTitle} from "../../store/functions.ts";
import {Icon, MenuButton} from "../../components/menuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/testData.ts";


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

type ToolBarProps = {
    fileName: string,
}

export default function ToolBar({fileName}: ToolBarProps)
{
    const onTitleChange: React.ChangeEventHandler = event => {
        dispatch(setPresentationTitle, (event.target as HTMLInputElement).value)
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src="../../../public/image/icon.png" alt="icon"
                />
                <input
                    onChange={onTitleChange}
                    className={styles.fileName}
                    defaultValue={fileName}
                />
            </div>
            <div className={styles.toolArea}>
                <div className={styles.slideActions}>
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
                </div>
                <div className={styles.toolBarSeparator}>
                </div>

                <MenuButton
                    content={addTextButtonContent}
                    onClick={() => dispatch(addText, defaultTextSettings)}
                >
                </MenuButton>
            </div>
        </div>
    )
}