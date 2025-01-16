import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FeedBackReducer } from "../Slices/FeedBackSlice";
import { ListReducer } from "../Slices/ListSlice";


const feedbackPersistConfig = {
    key: 'feedbacks',
    storage,
    whitelist: ["Theme"],
};

const ListReducerConfig = {
    key: 'list',
    storage,
    whitelist: ["list"],
};


const persistedFeedbacksReducer = persistReducer(feedbackPersistConfig, FeedBackReducer);
const persistedListReducer = persistReducer(ListReducerConfig, ListReducer);

const rootReducer = combineReducers({
    feedbacks: persistedFeedbacksReducer,
    list: persistedListReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
