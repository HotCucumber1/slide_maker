import FileNameArea from "./FileNameArea/FileNameArea.tsx";
import ToolsArea from "./ToolsArea/ToolsArea.tsx";
import styles from "./ToolBar.module.css";

type ToolBarProps = {
    fileName: string,
}

export default function ToolBar(props: ToolBarProps)
{
    return (
        <div className={styles.toolBar}>
            <FileNameArea fileName={props.fileName}></FileNameArea>
            <ToolsArea></ToolsArea>
        </div>
    )
}