import styles from "../ToolBar.module.css"
import {useAppActions} from "../../../hooks/useAppActions.ts"
import {defaultTextSettings, FONTS} from "../../../store/default_data/defaultObjectSettings.ts"
import
    React, {
    useRef,
    useState
} from "react"
import * as ButtonData from "../toolBarButtonsData.ts"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import {TextObject} from "../../../store/objects.ts"


type FontSizeFieldProps = {
    fontSize: number,
}

type TextToolsProps = {
    textObject?: TextObject,
}

type TextFamilyProps = {
    fontFamily: string,
}

type TextColorProps = {
    fontColor: string,
}

function FontSizeField({fontSize}: FontSizeFieldProps) {
    const { setFontSize } = useAppActions()

    return (
        <>
            <input
                onChange={(event) => setFontSize(Number(event.target.value))}
                defaultValue={fontSize}
                type={"number"}
                className={styles.inputField}
                min={defaultTextSettings.minFontSize}
                max={defaultTextSettings.maxFontSize}
            />
        </>
    )
}

function TextColorField({fontColor}: TextColorProps) {
    const { setFontColor } = useAppActions()
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
                value={fontColor}
                onChange={(event) => setFontColor({
                    value: event.target.value,
                    type: "color"
                })}
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

function FontFamilyField({fontFamily}: TextFamilyProps) {
    const { setFontFamily } = useAppActions()

    return (
        <>
            <select
                onChange={(event) => setFontFamily(event.target.value)}
                className={styles.inputField}
                value={fontFamily}
            >
                {FONTS.map(font =>
                    <option
                        value={font}
                        key={font}
                    >
                        {font}
                    </option>
                )}
            </select>
        </>
    )
}

function TextTools({textObject}: TextToolsProps) {
    const fontSize = textObject?.fontSize || defaultTextSettings.fontSize
    const fontFamily = textObject?.fontFamily || defaultTextSettings.fontFamily
    const fontColor = textObject?.color || defaultTextSettings.color

    return (
        <div className={styles.textTools}>
            <FontSizeField fontSize={fontSize}/>
            <FontFamilyField fontFamily={fontFamily}/>
            <TextColorField fontColor={fontColor.value}/>
        </div>
    )
}

export {
    TextTools,
}