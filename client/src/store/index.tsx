import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './features/themeConfigSlice';
import authSlice from './features/authSlice';
import { apiService } from './services/apiService';


const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authSlice,

    [apiService.reducerPath]: apiService.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
           
            .concat(apiService.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
