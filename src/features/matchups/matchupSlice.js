import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import matchupService from "./matchupService"

const initialState = {
    matchups: [],
    champion1: "",
    champion2: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

/**
 * Get all matchups for the given current champion combo and id
 * @returns the list of matchups
 */
export const getMatchups = createAsyncThunk('matchup/getAll', async (championsData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await matchupService.getMatchups(championsData, token)
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createMatchup= createAsyncThunk("schedule/create", async (matchupData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await matchupService.createMatchup(matchupData, token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
} )

export const deleteMatchup = createAsyncThunk('schedule/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await matchupService.deleteMatchup(id, token)
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const matchupSlice = createSlice({
    name: "matchup",
    initialState,
    reducers: {
        reset: (state) => initialState,
        setChampions: (state, action) => {
            state.champion1 = action.payload.champion1;
            state.champion2 = action.payload.champion2;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMatchup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMatchup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.matchups.push(action.payload)
            })
            .addCase(createMatchup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMatchups.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMatchups.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.matchups = action.payload
            })
            .addCase(getMatchups.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMatchup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMatchup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.matchups = state.matchups.filter((matchup) => matchup._id !== action.payload.id)
            })
            .addCase(deleteMatchup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset, setChampions} = matchupSlice.actions
export default matchupSlice.reducer