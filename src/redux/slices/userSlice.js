import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/user';

const initialState = {
	isLoggedIn: false,
	loading: false,
	data: null,
	error: null,
};

export const fetchUser = createAsyncThunk(
	'fetchUser',
	async (info, { rejectWithValue }) => {
		try {
			return await (
				await userApi.login(info)
			).data;
		} catch (err) {
			console.log(err)
			if (!err.response) throw err;
			return rejectWithValue(
				err?.response?.data[0]?.msg || 'something went wrong'
			);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[fetchUser.pending](state) {
			state.loading = true;
		},
		[fetchUser.fulfilled](state, { payload }) {
			state.loading = false;
			if (!!payload.email) {
				state.data = payload;
				state.isLoggedIn = true;
			} else {
				state.isLoggedIn = false;
				state.error = 'something wrong try again!';
			}
		},
		[fetchUser.rejected](state, { payload }) {
			console.log(payload);
			state.loading = false;
			state.error = payload;
			state.isLoggedIn = false;
		},
	},
});

export default userSlice.reducer;
