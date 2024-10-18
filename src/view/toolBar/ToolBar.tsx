import styles from "./ToolBar.module.css";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {addSlide, setPresentationTitle} from "../../store/functions.ts";
import {Icon, MenuButton} from "../../components/menuButton/MenuButton.tsx";


const addSlideButtonContent: Icon = {
    type: "icon",
    src: "../../../public/image/add_slide_button_icon.png",
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
                <MenuButton
                    content={addSlideButtonContent}
                    onClick={() => dispatch(addSlide)}
                >
                </MenuButton>
            </div>
        </div>
    )
}