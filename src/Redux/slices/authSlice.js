import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "Auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}`,
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const users = await response.json();
      if (users.length <= 0) {
        throw new Error("Invalid Credentials");
      }
      const user = users[0];
      if (user.password !== password) {
        throw new Error("Incorrect password!");
      }
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
);

export const register = createAsyncThunk(
  "Auth/registerUser",
  async (userData) => {
    try {
      const checkRes = await fetch(
        `http://localhost:3001/users?email=${userData.email}`,
      );
      const userExists = await checkRes.json();

      if (userExists.length > 0) {
        throw new Error("User already Exists");
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const newUser = await response.json();
      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
);

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
    isAuthenticated: !!JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
