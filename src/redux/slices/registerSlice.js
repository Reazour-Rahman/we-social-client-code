import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/user';

const initialState = {
	loading: false,
	data: null,
	error: null,
};

export const registerUser = createAsyncThunk(
	'registerUser',
	async (info, { rejectWithValue }) => {
		console.log("Got it");
		try {
			const result = await userApi.register(info);
			console.log(result);
			return result.data;
		} catch (err) {
			console.log(err, "Got Catch");
			if (err.response) throw err;
			return rejectWithValue(err?.response?.data[0]?.msg);
		}
		
	}
);

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	extraReducers: {
		[registerUser.pending](state) {
			state.loading = true;
		},
		[registerUser.fulfilled](state, { payload }) {
			state.loading = false;
			if (payload.status === 500) {
				state.error = payload.error;
			} else {
				state.data = payload;
			}
		},
		[registerUser.rejected](state, { payload }) {
			state.loading = false;
			state.error = payload;
		},
	},
});

export default counterSlice.reducer;
