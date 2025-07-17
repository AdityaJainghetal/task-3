import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        { name, email, password },
        config
      );

      localStorage.setItem('authToken', data.token);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('authToken', data.token);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  userInfo: null,
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// // Register User
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(
//         'http://localhost:5000/api/users/register',
//         { name, email, password },
//         config
//       );

//       localStorage.setItem('authToken', data.token);
//       toast.success('Registration successful!');
//       return data;
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message;
//       toast.error(errorMsg);
//       return rejectWithValue(errorMsg);
//     }
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(
//         'http://localhost:5000/api/users/login',
//         { email, password },
//         config
//       );

//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('userInfo', JSON.stringify({
//         _id: data._id,
//         name: data.name,
//         email: data.email,
//         isAdmin: data.isAdmin
//       }));
//       toast.success('Login successful!');
//       return data;
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Login failed';
//       toast.error(errorMsg);
//       return rejectWithValue(errorMsg);
//     }
//   }
// );

// const initialState = {
//   userInfo: localStorage.getItem('userInfo') 
//     ? JSON.parse(localStorage.getItem('userInfo')) 
//     : null,
//   token: localStorage.getItem('authToken') || null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userInfo');
//       state.userInfo = null;
//       state.token = null;
//       state.error = null;
//       toast.success('Logged out successfully');
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Register Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload;
//         state.token = action.payload.token;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;