import styles from "./ToolBar.module.css";

type ToolBarProps = {
    fileName: string,
}

export default function ToolBar({fileName}: ToolBarProps)
{
    return (
        <div
            className={styles.toolBar}
        >
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src="../../../public/image/icon.png" alt="icon"
                />
                <input
                    className={styles.fileName}
                    defaultValue={fileName}
                />
            </div>
            <div className={styles.toolArea}></div>
        </div>
    )
}