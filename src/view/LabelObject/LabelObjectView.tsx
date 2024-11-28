import {Color, Gradient} from "../../store/objects.ts"
import {getGradientCoords, GradientCoords} from "../../service/getGradientCoords.ts"
import {v4 as uuidv4} from "uuid"
import styles from "../Object.module.css"

type FigureObjectProps = {
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
}


const LabelObjectView = (
    props: FigureObjectProps
) => {
    let colorsLength: number = 1

    let gradientCoords: GradientCoords
    if (props.fill.type === "gradient")
    {
        colorsLength = props.fill.colors.length
        gradientCoords = getGradientCoords(props.fill.angle)
    }
    const gradId = uuidv4()

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.object}
        >
            {props.fill.type === "gradient" && (
                <defs>
                    <linearGradient
                        id={gradId}
                        x1={gradientCoords.x1}
                        y1={gradientCoords.y1}
                        x2={gradientCoords.x2}
                        y2={gradientCoords.y2}
                    >
                        {props.fill.colors.map((color, index) => {
                            return (
                                <stop
                                    key={index}
                                    offset={index / (colorsLength - 1) * 100 + "%"}
                                    style={{
                                        stopColor: color.value
                                    }}
                                />
                            );
                        })}
                    </linearGradient>
                </defs>
            )}
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={props.fill.type === "color"
                    ? props.fill.value
                    : `url(#${gradId})`
                }
                stroke={props.strokeColor.value}
                strokeWidth={props.strokeWidth * props.scale}>
            </rect>
        </svg>
    )
}


export {
    LabelObjectView
}