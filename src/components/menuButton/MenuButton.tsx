import style from "./MenuButton.module.css"

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
}

function MenuButton({content, onClick}: MenuButtonProps)
{
    return (
        <button
            onClick={onClick}
            className={style.menuButton}
        >
            {content.type === "icon" &&
                <img
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