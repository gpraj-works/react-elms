import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	editing: false,
	department: {},
	leaveType: {},
	employee: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload;
		},

		updateDepartment: (state, action) => {
			state.editing = action.payload.editing;
			state.department = action.payload.department;
		},

		updateLeaveType: (state, action) => {
			state.editing = action.payload.editing;
			state.leaveType = action.payload.leaveType;
		},
		updateEmployee: (state, action) => {
			state.editing = action.payload.editing;
			state.employee = action.payload.employee;
		},
	},
});

export const { updateUser, updateDepartment, updateLeaveType, updateEmployee } =
	userSlice.actions;
export default userSlice.reducer;
