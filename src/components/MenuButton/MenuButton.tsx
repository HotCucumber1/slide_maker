import style from "./MenuButton.module.css"
import {CSSProperties} from "react"

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
    styles?: CSSProperties
}

const MenuButton = ({
    content,
    onClick,
    styles
}: MenuButtonProps) => {

    return (
        <button
            onClick={onClick}
            className={style.menuButton}
            style={content.type === "text"
                ? styles
                : {}
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