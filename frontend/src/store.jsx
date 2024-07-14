import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './features/authSlice';
import blogReducer from './features/blogSlice';
import commentReducer from './features/commentSlice';
import { combineReducers } from 'redux';
import createFilter from 'redux-persist-transform-filter';

// Create the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  comment: commentReducer
});

// Create a filter for persisting only the user field within auth slice
const saveSubsetFilter = createFilter('auth', ['logged','data']);

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Add reducers you want to persist
  transforms: [saveSubsetFilter], // Apply the filter
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
