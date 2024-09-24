import ToolBar from "./components/ToolBar/ToolBar.tsx"
import { Presentation } from "./model/objects.ts"


export default function App() {
    const newPresentation: Presentation = {
        title: "Новая презентация",
        slides: [],
        selectedSlides: [],
    }

    return (
        <>
            <ToolBar fileName={newPresentation.title}></ToolBar>
        </>
    )
}