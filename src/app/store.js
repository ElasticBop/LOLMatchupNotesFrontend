import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import matchupReducer from "../features/matchups/matchupSlice"

//redux toolkit just simplies a lot of things. you can write mutable code since it's converted later on, the reducer property in the object passed to configure store results in an aciton creator function (produces an action object with at type and payload) and a way to respond to the action created by it
export const store = configureStore({
  reducer: {
    auth: authReducer,
    matchup: matchupReducer
  },
});
