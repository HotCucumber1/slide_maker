import styles from "./ErrorToast.module.css"
import {
    CSSProperties,
    useEffect,
    useState
} from "react"
import {joinStyles} from "../../service/joinStyles.ts"

type ErrorToastProps = {
    style?: CSSProperties,
    onClose: () => void,
    duration: number,
}

const ErrorToast = ({
    message,
    onClose,
    duration
}: ErrorToastProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, duration)

        return () => clearTimeout(timer);
    }, [duration]);

    useEffect(() => {
        if (!visible && onClose) {
            const timer = setTimeout(() => {
                onClose()
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [visible, onClose]);

    return (
        <div
            className={joinStyles(
                styles.toast,
                visible
                    ? styles.fadeIn
                    : styles.fadeOut
            )}
        >
            {message}
        </div>
    )
}

export {
    ErrorToast,
}