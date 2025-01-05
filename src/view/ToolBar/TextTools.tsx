import styles from "./ToolBar.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {defaultTextSettings, FONTS} from "../../store/default_data/defaultObjectSettings.ts"
import React, {useMemo, useRef, useState} from "react"
import * as ButtonData from "./toolBarButtonsData.ts"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import {useAppSelector} from "../../hooks/useAppSelector.ts"


type FontSizeFieldProps = {
    fontSize: number,
    onChange: () => void
}

function FontSizeField({fontSize, onChange}: FontSizeFieldProps) {
    return (
        <>
            <input
                onChange={onChange}
                defaultValue={fontSize}
                type={"number"}
                className={styles.inputField}
                min={defaultTextSettings.minFontSize}
                max={defaultTextSettings.maxFontSize}
            />
        </>
    )
}

function TextColorField() {

    const colorInputRef = useRef(null)
    const onButtonClick = (inputElement) => {
        inputElement.current.click()
    }

    return (
        <>
            <input
                className={styles.colorInput}
                type="color"
                id="colorInput"
                ref={colorInputRef}
            />

            <MenuButton
                content={ButtonData.setColorButtonContent}
                onClick={() => onButtonClick(colorInputRef)}
                styles={{
                    height: "50%",
                }}
            />
        </>
    )
}

function FontFamilyField() {
    const [fontFamilyStyle, setFontFamilyStyle] = useState(FONTS[0])
    const { setFontFamily } = useAppActions()

    const changeFontFamily = (event) => {
        setFontFamilyStyle(event.target.value)
        setFontFamily(event.target.value)
    }
    //
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
    //
    // if (activeObject.type === "text") {
    //     setFontFamily(activeObject.fontFamily)
    // }

    return (
        <>
            <select
                onChange={changeFontFamily}
                className={styles.inputField}
                value={fontFamilyStyle}
            >
                {FONTS.map(font =>
                    <option
                        value={font}
                        key={font}
                    >{font}</option>
                )}
            </select>
        </>
    )
}

function TextTools() {
    const {
        setFontSize,
    } = useAppActions()
    // const editor = useAppSelector((editor => editor))
    // const selectedObjects = editor.selectedObjects

    const fontSize = defaultTextSettings.fontSize

    // const onColorChange = (event) => {
    //     if (selectedObjects.length > 0) {
    //         setFigureColor({
    //             value: (event.target as HTMLInputElement).value,
    //             type: "color",
    //         });
    //     }
    //     else {
    //         setSlideBackground({
    //             value: (event.target as HTMLInputElement).value,
    //             type: "color",
    //         });
    //     }
    // }

    return (
        <div className={styles.textTools}>
            <FontSizeField
                onChange={() => setFontSize(fontSize)}
                fontSize={fontSize}
            ></FontSizeField>

            <FontFamilyField></FontFamilyField>
            <TextColorField></TextColorField>
        </div>
    )
}

export {
    TextTools,
}