import styles from "../ToolBar.module.css"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "../toolBarButtonsData.ts"
import {downloadAsJson} from "../../../file_utils/downloadAsJson.ts"
import React, {MutableRefObject, useRef} from "react"
import {useAppSelector} from "../../../hooks/useAppSelector.ts"
import {uploadJsonPresentation} from "../../../file_utils/uploadFile.ts"
import {useAppActions} from "../../../hooks/useAppActions.ts"

type FileBlockProps = {
    onClick: (ref: MutableRefObject<null>) => void,
    setError: (value: boolean) => void
}

function FileTools({onClick, setError}: FileBlockProps) {

    const uploadFileInputRef = useRef(null)

    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title
    const { setEditor } = useAppActions()

    const onFileInputChange = async (event) => {
        const file: File = event.target.files[0];
        if (!await uploadJsonPresentation(file, setEditor)) {
            setError(true)
        }
        event.target.value = null;
    }

    return (
        <>
            <input
                className={styles.fileInput}
                ref={uploadFileInputRef}
                type="file"
                id="jsonFileInput"
                onChange={onFileInputChange}
                accept="application/json"
            />

            <span className={styles.slideActionsText}>Файл</span>
            <MenuButton
                content={ButtonData.downloadButtonContent}
                onClick={() => downloadAsJson(
                    editor,
                    title
                )}
            />
            <MenuButton
                content={ButtonData.uploadButtonContent}
                onClick={() => onClick(uploadFileInputRef)}
            />
        </>
    )
}

export {
    FileTools,
}