import styles from "./ToolBar.module.css";
import {dispatch, getEditor} from "../../store/editor.ts";
import {addSlide} from "../../store/actions/addSlide.ts";
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx";
import {defaultTextSettings} from "../../store/testData/testData.ts";
import {setPresentationTitle} from "../../store/actions/setPresentationTitle.ts";
import {deleteSlides} from "../../store/actions/deleteSlide.ts";
import {addText} from "../../store/actions/addText.ts";
import {addImage} from "../../store/actions/addImage.ts";
import {addLabel} from "../../store/actions/addLabel.ts";
import {addEllipse} from "../../store/actions/addEllipse.ts";
import {addTriangle} from "../../store/actions/addTriangle.ts";
import {setSlideBackground} from "../../store/actions/setSlideBackground.ts";
import * as ButtonData from "./toolBarButtonsData.ts";
import {setFigureColor} from "../../store/actions/setFigureColor.ts";



type ToolBarProps = {
    fileName: string,
}

function ToolBar({fileName}: ToolBarProps)
{
    const onTitleChange = (event) => {
        dispatch(setPresentationTitle, (event.target as HTMLInputElement).value)
    }

    const onImageFileButtonClick = () => {
        const fileInput = document.getElementById("imageFileInput") as HTMLInputElement
        fileInput.click()
    }

    const onBgFileButtonClick = () => {
        const fileInput = document.getElementById("bgFileInput") as HTMLInputElement
        fileInput.click()
    }

    const onColorButtonClick = () => {
        const colorInput = document.getElementById("colorInput") as HTMLInputElement
        colorInput.click()
    }

    const onColorChange = (event) => {
        if (getEditor().selectedObjects.length > 0)
        {
            dispatch(setFigureColor, {
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
        else
        {
            dispatch(setSlideBackground, {
                value: (event.target as HTMLInputElement).value,
                type: "color",
            });
        }
    }

    const onImageFileChange = async (event) => {
        const file = event.target.files[0]
        if (file)
        {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target.result as string

                img.onload = () => {
                    dispatch(addImage, {img})
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const onBgFileChange = async (event) => {
        const file = event.target.files[0]
        if (file)
        {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target.result as string

                img.onload = () => {
                    dispatch(setSlideBackground, {
                        src: img.src,
                        type: "image"
                    })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.fileNameArea}>
                <img
                    className={styles.icon}
                    src="../../../public/image/icon2.png"
                    alt="icon"
                />
                <input
                    onBlur={onTitleChange}
                    onFocus={(event) => event.target.select()}
                    className={styles.fileName}
                    defaultValue={fileName}
                />
            </div>
            <div className={styles.toolArea}>
                <input
                    className={styles.fileInput}
                    type="file"
                    id="imageFileInput"
                    onChange={onImageFileChange}
                    accept="image/"
                />
                <input
                    className={styles.fileInput}
                    type="file"
                    id="bgFileInput"
                    onChange={onBgFileChange}
                    accept="image/"
                />

                <span className={styles.slideActionsText}>Слайд</span>
                <MenuButton
                    content={ButtonData.addSlideButtonContent}
                    onClick={() => dispatch(addSlide)}
                />
                <MenuButton
                    content={ButtonData.deleteSlideButtonContent}
                    onClick={() => dispatch(deleteSlides)}
                />
                <MenuButton
                    content={ButtonData.setColorButtonContent}
                    onClick={onColorButtonClick}
                    iconStyles={{
                        height: "50%",
                    }}
                />
                <input
                    className={styles.colorInput}
                    type="color"
                    id="colorInput"
                    onChange={onColorChange}
                />
                <MenuButton
                    content={ButtonData.setImageBackgroundButtonContent}
                    onClick={onBgFileButtonClick}
                    iconStyles={{
                        height: "60%",
                    }}
                />

                <div className={styles.toolBarSeparator}>
                </div>

                <span className={styles.slideActionsText}>Добавить объект</span>
                <MenuButton
                    content={ButtonData.addTextButtonContent}
                    onClick={() => dispatch(addText, defaultTextSettings)}
                />
                <MenuButton
                    content={ButtonData.addImageButtonContent}
                    onClick={onImageFileButtonClick}
                    iconStyles={{
                        marginTop: "2px",
                        height: "50%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addLabelButtonContent}
                    onClick={() => dispatch(addLabel)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "45%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addTriangleButtonContent}
                    onClick={() => dispatch(addTriangle)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "56%",
                    }}
                />
                <MenuButton
                    content={ButtonData.addCircleButtonContent}
                    onClick={() => dispatch(addEllipse)}
                    iconStyles={{
                        marginTop: "1px",
                        height: "50%",
                    }}
                />

                <div className={styles.toolBarSeparator}>
                </div>
            </div>
        </div>
    )
}

export {
    ToolBar
}