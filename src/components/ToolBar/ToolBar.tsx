import FileNameArea from "./FileNameArea/FileNameArea.tsx";
import ToolsArea from "./ToolsArea/ToolsArea.tsx";

type ToolBarProps = {
    fileName: string,
}

export default function ToolBar(props: ToolBarProps)
{
    return (
        <>
            <FileNameArea fileName={props.fileName}></FileNameArea>
            <ToolsArea></ToolsArea>
        </>
    )
}