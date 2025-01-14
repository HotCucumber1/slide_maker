import styles from "../../ToolBar.module.css"
import * as ButtonData from "../../toolBarButtonsData.ts"
import {MenuButton} from "../../../../components/MenuButton/MenuButton.tsx"
import
    React, {
    useRef,
    useState
} from "react"
import {useAppActions} from "../../../../hooks/useAppActions.ts"
import {useGetActiveSlide} from "../../../../hooks/useGetActiveSlide.ts"
import { v4 as uuidv4 } from "uuid"
import {defaultFillStyle} from "../../../../store/default_data/defaultObjectSettings.ts"
import {Color} from "../../../../store/objects.ts"

const MAX_ANGEL = 360
const MIN_ANGEL = 0

type SelectGradientPopup = {
    setIsGradient: (value: boolean) => void,
    setIsColor: (value: boolean) => void,
}

function SelectGradientPopup({setIsGradient, setIsColor}: SelectGradientPopup) {
    const colorInputRef = useRef(null)
    const angleInputRef = useRef(null)
    const activeSlide = useGetActiveSlide()


    const [colors, setColors] = useState(
        activeSlide.background.type === "gradient"
            ? activeSlide.background.colors
            : []
    )
    const { setSlideBackground } = useAppActions()

    const onButtonClick = () => {
        setSlideBackground({
            type: "gradient",
            angle: Number(angleInputRef.current.value),
            colors: colors
        })
        setIsGradient(false)
        setIsColor(true)
    }

    const onColorChange = (event, key) => {
        const newColors = colors.slice()
        if (newColors.length === 0) {
            setColors([defaultFillStyle])
            return
        }
        newColors[key] = {
            type: "color",
            value: event.target.value
        }
        setColors(newColors)
    }

    return (
        <div className={styles.selectBackgroundPopup}>
            <div className={styles.gradientParameterBlock}>
                <span className={styles.angelText}>Угол</span>
                <input
                    type="number"
                    className={styles.inputField}
                    style={{
                        marginLeft: "auto",
                    }}
                    ref={angleInputRef}
                    max={MAX_ANGEL}
                    min={MIN_ANGEL}
                    defaultValue={activeSlide.background.type === "gradient"
                        ? activeSlide.background.angle
                        : 0
                    }
                />
            </div>

            <div className={styles.gradientParameterBlock}>
                <span className={styles.angelText}>Добавить цвета</span>
                <MenuButton
                    content={ButtonData.addButtonContent}
                    onClick={() => setColors([...colors, defaultFillStyle])}
                    styles={{
                        height: "20px",
                    }}
                />
            </div>
            <div className={styles.gradientColors}>
                {colors.map((color, key) =>
                    <input
                        type="color"
                        key={key}
                        id="colorInput"
                        className={styles.gradientColorInput}
                        ref={colorInputRef}
                        value={color.value}
                        onChange={(event) => onColorChange(event, key)}
                    />
                )}
            </div>

            <MenuButton
                content={ButtonData.setGradientButtonContent}
                onClick={onButtonClick}
                styles={{
                    paddingBlock: "5px"
                }}
            />
        </div>
    )
}

function SelectBackgroundPopup() {
    const colorInputRef = useRef(null)
    const [isGradient, setIsGradient] = useState(false)
    const [isColor, setIsColor] = useState(false)

    const {setSlideBackground} = useAppActions()

    const onColorChange = (event) => {
        setSlideBackground({
            value: (event.target as HTMLInputElement).value,
            type: "color",
        })
    }

    const onColorClick = (event) => {
        setIsColor(true)
        setIsGradient(false)
        colorInputRef.current.click()
    }

    return (
        <>
            {!isColor && !isGradient &&
                <div className={styles.selectBackgroundPopup}>
                    <MenuButton
                        content={ButtonData.selectColorButtonContent}
                        onClick={onColorClick}
                        styles={{
                            padding: "5px 10px",
                        }}
                    />
                    <MenuButton
                        content={ButtonData.selectGradientButtonContent}
                        onClick={() => {
                            setIsColor(false)
                            setIsGradient(true)
                        }}
                        styles={{
                            padding: "5px 10px",
                        }}
                    />
                </div>
            }
            {isGradient &&
                <SelectGradientPopup
                    setIsGradient={setIsGradient}
                    setIsColor={setIsColor}
                />}
            <input
                className={styles.colorInput}
                type="color"
                id="colorInput"
                onChange={onColorChange}
                ref={colorInputRef}
            />
        </>
    )
}

export {
    SelectBackgroundPopup,
}