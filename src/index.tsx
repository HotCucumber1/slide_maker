import { createRoot } from 'react-dom/client'
import { Provider} from "react-redux"
import App from "./App"
import {store} from "./store/redux/store.ts"
import {initHistory} from "./service/history.ts"


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App history={initHistory(store)}/>
    </Provider>
)
