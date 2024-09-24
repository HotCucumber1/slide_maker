import styles from "./FileNameArea.module.css"


type FileNameProps = {
    fileName: string,
}

export default function FileNameArea(props: FileNameProps)
{
    return (
        <div className={styles.fileNameArea}>
            <span>{props.fileName}</span>
        </div>
    )
}