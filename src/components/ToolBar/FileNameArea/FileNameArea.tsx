import styles from "./FileNameArea.module.css"


type FileNameProps = {
    fileName: string,
}

export default function FileNameArea(props: FileNameProps)
{
    return (
        <div className={styles.fileNameArea}>
            <img className={styles.icon} src="../../../../public/image/icon.png" alt="icon"></img>
            <input className={styles.fileName} defaultValue={props.fileName} />
        </div>
    )
}