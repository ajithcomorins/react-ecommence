import { configureStore } from "@reduxjs/toolkit"
import Counterslice  from "../component/Counterslice"

export const store = configureStore ({
    reducer: {
        counter : Counterslice,
    },
})