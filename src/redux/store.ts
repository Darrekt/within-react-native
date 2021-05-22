import { AnyAction, applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk, { ThunkAction } from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
