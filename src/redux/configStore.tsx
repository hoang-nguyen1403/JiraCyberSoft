import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import userManagementReducer from "./reducer/userManagementReducer";
import projectManagementReducer from "./reducer/projectManagementReducer";
import kanbanBoardReducer from "./reducer/kanbanBoardReducer";

export const store = configureStore({
    reducer: {
        numberReducer: (state, action:PayloadAction<number>)=>{
            return 1;
        }, 
        userReducer: userReducer,
        userManagementReducer: userManagementReducer,
        projectManagementReducer: projectManagementReducer,
        kanbanBoardReducer: kanbanBoardReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
