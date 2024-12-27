import styles from "./ToolBar.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {defaultTextSettings, FONTS} from "../../store/default_data/defaultObjectSettings.ts"
import React, {useRef, useState} from "react"
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import * as ButtonData from "./toolBarButtonsData.ts"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"


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
                className={styles.setFontInput}
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
                iconStyles={{
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

    return (
        <>
            <select
                onChange={changeFontFamily}
                className={styles.setFontInput}
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
        <>
            <FontSizeField
                onChange={() => setFontSize(fontSize)}
                fontSize={fontSize}
            ></FontSizeField>

            <FontFamilyField></FontFamilyField>
            <TextColorField></TextColorField>
        </>
    )
}

export {
    TextTools,
}