import style from "./MenuButton.module.css"
import {CSSProperties} from "react";

type Icon = {
    src: string,
    type: "icon",
}

type Text = {
    value: string,
    type: "text",
}

type MenuButtonProps = {
    content: Icon|Text,
    onClick: () => void,
    iconStyles?: CSSProperties
}

function MenuButton({content, onClick, iconStyles}: MenuButtonProps)
{
    return (
        <button
            onClick={onClick}
            className={style.menuButton}
        >
            {content.type === "icon" &&
                <img
                    style={iconStyles}
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
    Text
}