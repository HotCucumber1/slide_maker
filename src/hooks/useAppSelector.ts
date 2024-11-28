import {rootReducer} from "../store/redux/reducers/rootReducer.ts"
import {TypedUseSelectorHook, useSelector} from "react-redux"


type RootState = ReturnType<typeof rootReducer>
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}