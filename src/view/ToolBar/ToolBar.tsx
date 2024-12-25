import styles from "./ToolBar.module.css"
import
    React, {
    useRef,
    useState
} from "react"
import icon from "../../assets/icons/icon.png"
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {ErrorToast} from "../../components/ErrorToast/ErrorToast.tsx"
import {HistoryTools} from "./HistoryTools.tsx"
import {FileTools} from "./FileTools.tsx"
import {PdfTools} from "./PdfTools.tsx"
import {SlideTools} from "./SlideTools.tsx"
import {ObjectTools} from "./ObjectTools.tsx"
import {TextTools} from "./TextTools.tsx"

function ToolBar()
{
    const [showToast, setShowToast] = useState(false)

    const [textTools, setTextTools] = useState(false)
    const [figureTools, setFigureTools] = useState(false)

    const titleRef = useRef(null)

    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title
    const { setPresentationTitle } = useAppActions()

    const onButtonClick = (inputElement) => {
        inputElement.current.click()
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src={icon}
                    alt="icon"
                />
                <input
                    ref={titleRef}
                    onChange={() => setPresentationTitle(titleRef.current.value)}
                    onFocus={(event) => event.target.select()}
                    className={styles.fileName}
                    value={title}
                />
            </div>
            <div className={styles.toolArea}>
                <HistoryTools></HistoryTools>
                <div className={styles.toolBarSeparator}>
                </div>

                <FileTools
                    onClick={onButtonClick}
                    setError={setShowToast}
                ></FileTools>
                <div className={styles.toolBarSeparator}>
                </div>

                <PdfTools></PdfTools>
                <div className={styles.toolBarSeparator}>
                </div>

                <SlideTools
                    onClick={onButtonClick}
                    setError={setShowToast}
                ></SlideTools>
                <div className={styles.toolBarSeparator}>
                </div>

                <ObjectTools
                    isText={textTools}
                    showText={setTextTools}
                    isObject={figureTools}
                    showObject={setFigureTools}
                    onClick={onButtonClick}
                    setError={setShowToast}
                ></ObjectTools>
                <div className={styles.toolBarSeparator}>
                </div>

                {textTools && <TextTools></TextTools>}
            </div>

            {showToast &&
                <ErrorToast
                    message={"Выберите корректный тип файла"}
                    onClose={() => setShowToast(false)}
                    duration={3000}
                >
                </ErrorToast>
            }
        </div>
    )
}

export {
    ToolBar,
}
