import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  email: localStorage.getItem('userEmail') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;