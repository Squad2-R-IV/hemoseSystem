import { configureStore } from '@reduxjs/toolkit'
import { siahmeApi } from './services/siahme-api.service'

export const store = configureStore({
  reducer: {
    [siahmeApi.reducerPath]: siahmeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(siahmeApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch