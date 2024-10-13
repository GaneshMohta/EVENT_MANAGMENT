import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from './eventsSlice'

const store = configureStore({
    reducer : {
        events : eventsSlice
    }
})

export default store;
