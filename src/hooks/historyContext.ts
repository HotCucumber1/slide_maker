import React from "react"
import {History} from "../service/history.ts"

const defaultHistory: History = {
    undo: () => undefined,
    redo: () => undefined,
}
const HistoryContext: React.Context<History> = React.createContext(defaultHistory)

export {
    HistoryContext,
}