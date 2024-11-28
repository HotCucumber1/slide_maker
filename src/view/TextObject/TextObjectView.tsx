import {CSSProperties} from "react"
import {Color, FontStyle} from "../../store/objects.ts"
import styles from "./TextObjectView.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts"

type TextObjectProps = {
    scale: number,
    text: string,
    fontSize: number,
    fontFamily: string,
    fontStyles: FontStyle,
    color: Color,
    objectId: string,
};


const TextObjectView = (
    props: TextObjectProps
) => {
    const {
        setText,
    } = useAppActions()
    const onTextChange: React.FormEventHandler = (event) => {
        setText((event.target as HTMLDivElement).textContent)
    }

    const objectStyle: CSSProperties = {
        fontSize: `${props.fontSize * props.scale}px`,
        fontFamily: props.fontFamily,
        color: props.color.value,
        lineHeight: `${(props.fontSize + 8) * props.scale}px`,
        padding: `${props.scale * 10}px`
    };

    if (props.scale === WORK_AREA_SCALE) {
        objectStyle.outline = "1px solid #DADADA"
    }
    if (props.fontStyles.includes("underline")) {
        objectStyle.textDecoration = "underline"
    }
    if (props.fontStyles.includes("italic")) {
        objectStyle.fontStyle = "italic"
    }
    if (props.fontStyles.includes("bold")) {
        objectStyle.fontWeight = "bold"
    }
    return (
        <div
            contentEditable
            id={props.objectId}
            className={styles.textObject}
            style={objectStyle}
            onBlur={onTextChange}
            dangerouslySetInnerHTML={{
                __html: props.text
            }}
        >
        </div>
    )
}


export {
    TextObjectView,
}