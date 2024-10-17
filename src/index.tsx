import { createRoot } from 'react-dom/client';
import App from "./App";
import {addEditorChangeHandler, getEditor} from "./store/editor.ts";


const container = document.getElementById('root');
const root = createRoot(container);
function render(): void
{
    root.render(
        <App editor={getEditor()}/>
    );
}


addEditorChangeHandler(render);
render();
