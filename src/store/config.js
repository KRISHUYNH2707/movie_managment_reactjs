import { combineReducers, createStore } from "redux";
import { movieReducer } from "./reducers/movieReducer";

const rootReducer = combineReducers({
    movieReducer: movieReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
