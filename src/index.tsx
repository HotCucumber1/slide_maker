import { createRoot } from 'react-dom/client';
import App from "./App";
import {addEditorChangeHandler, getEditor} from "./store/editor.ts";


function render(): void
{
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
        <App editor={getEditor()}/>
    );
}


addEditorChangeHandler(render);
render();
