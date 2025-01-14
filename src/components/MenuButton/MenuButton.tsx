import style from "./MenuButton.module.css"
import {CSSProperties} from "react"
import {joinStyles} from "../../service/joinStyles.ts"

type Icon = {
    src: object,
    type: "icon",
}

type Text = {
    value: string,
    type: "text",
}

type MenuButtonProps = {
    content: Icon|Text,
    onClick: (event) => void,
    styles?: CSSProperties,
    className?: string
}

const MenuButton = ({
    content,
    onClick,
    styles,
    className
}: MenuButtonProps) => {

    return (
        <button
            onClick={onClick}
            className={joinStyles(style.menuButton, className)}
            style={content.type === "text"
                ? styles
                : {
                    aspectRatio: "1 / 1",
                }
            }
        >
            {content.type === "icon" &&
                <img
                    style={styles}
                    className={style.menuButtonIcon}
                    src={content.src}
                    alt="Add slide button"
                />
            }
            {content.type === "text" && content.value}
        </button>
    )
}

export {
    MenuButton,
    Icon,
    Text,
}