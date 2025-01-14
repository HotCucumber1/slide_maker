import styles from "./ToolBar.module.css"
import
    React, {
    useEffect,
    useRef,
    useState,
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
import {ImageTools} from "./ImageTools.tsx"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "./toolBarButtonsData.ts"
import {useNavigate} from "react-router"
import {TextObject} from "../../store/objects.ts"
import {useGetSelectedObjects} from "../../hooks/useGetSelectedObjects.ts"

function ToolBar()
{
    const [showToast, setShowToast] = useState(false)

    const [textTools, setTextTools] = useState(false)
    const [figureTools, setFigureTools] = useState(false)

    const titleRef = useRef(null)

    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title
    const slides = editor.presentation.slides
    const {
        setPresentationTitle,
        setSlideSelection
    } = useAppActions()
    const navigate = useNavigate()

    const onButtonClick = (inputElement) => {
        inputElement.current.click()
    }

    // const activeSlide = useMemo(() => {
    //     return editor.presentation.slides.find(
    //         (slide) => slide.id === editor.selectedSlides[0]
    //     );
    // }, [editor.presentation.slides, editor.selectedSlides]);
    //
    // const activeObject = useMemo(() => {
    //     return activeSlide?.content.find((object) =>
    //         editor.selectedObjects.includes(object.id)
    //     );
    // }, [activeSlide, editor.selectedObjects]);
    const activeObjects = useGetSelectedObjects()

    useEffect(() => {
        if (activeObjects.length <= 0) {
            setFigureTools(false);
            setTextTools(false);
            return
        }
        if (activeObjects[0].type === "text") {
            setFigureTools(false);
            setTextTools(true);
        }
    }, [activeObjects]);

    const onShowClick = async () => {
        await document.documentElement.requestFullscreen()
        setSlideSelection([slides[0].id])
        navigate("slide_show")
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
                <MenuButton
                    content={ButtonData.slideShowButtonContent}
                    onClick={onShowClick}
                    styles={{
                        color: "#505050",
                    }}
                />
                <div className={styles.toolBarSeparator}>
                </div>
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
                <ImageTools></ImageTools>
                <div className={styles.toolBarSeparator}>
                </div>

                {textTools && <TextTools textObject={activeObjects[0] as TextObject}></TextTools>}
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
