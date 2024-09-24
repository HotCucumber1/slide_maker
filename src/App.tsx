import ToolBar from "./components/ToolBar/ToolBar.tsx"
import { Presentation } from "./model/objects.ts"


export default function App() {
    let newPresentation: Presentation = {
        title: "Новая презентация",
        slides: [],
        selectedSlides: [],
    }

    return (
        <div>
            <ToolBar fileName={newPresentation.title}></ToolBar>
        </div>
    )
}