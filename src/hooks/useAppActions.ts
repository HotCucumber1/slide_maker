import {useDispatch} from "react-redux"
import {bindActionCreators} from "redux"
import ActionsCreator from "../store/redux/actionCreator.ts"

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionsCreator, dispatch)
}

export {
    useAppActions,
}