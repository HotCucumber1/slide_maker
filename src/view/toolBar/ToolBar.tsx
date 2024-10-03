import styles from "./ToolBar.module.css";

type ToolBarProps = {
    fileName: string,
}

export default function ToolBar(props: ToolBarProps)
{
    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img className={styles.icon} src="../../../public/image/icon.png" alt="icon"></img>
                <input className={styles.fileName} defaultValue={props.fileName}/>
            </div>
            <div className={styles.toolArea}></div>
        </div>
    )
}