import styles from "../ToolBar.module.css"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "../toolBarButtonsData.ts"
import React from "react"
import {useAppSelector} from "../../../hooks/useAppSelector.ts"
import {exportToPdf} from "../../../file_utils/exportToPdf.tsx"

function PdfTools() {
    const editor = useAppSelector((editor => editor))

    return (
        <>
            <span className={styles.slideActionsText}>PDF</span>
            <MenuButton
                content={ButtonData.downloadButtonContent}
                onClick={() => exportToPdf(editor.presentation)}
            />
        </>
    )
}

export {
    PdfTools,
}