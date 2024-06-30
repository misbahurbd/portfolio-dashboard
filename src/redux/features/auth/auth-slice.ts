import { RootState } from "@/redux/store"
import { createSlice } from "@reduxjs/toolkit"

const initialState: {
  token: null | string
} = {
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: state => {
      state.token = null
    },
  },
})

export default authSlice.reducer

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentToken = (state: RootState) => state.auth.token
