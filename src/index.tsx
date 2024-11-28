import { createRoot } from 'react-dom/client';
import { Provider} from "react-redux";
import App from "./App";
import {addEditorChangeHandler, getEditor} from "./store/editor.ts"
import {store} from "./store/redux/store.ts"


const container = document.getElementById('root');
const root = createRoot(container);

function render(): void
{
    root.render(
        <Provider store={store}>
            <App editor={getEditor()}/>
        </Provider>
    );
}


addEditorChangeHandler(render);
render();
