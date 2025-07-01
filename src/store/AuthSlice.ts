import { auth, provider } from "@/core_components/firebase/firebase";
import { FormType } from "@/shared_features/SharedForm";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";

// User data type
type UserData = {
  token: string | null;
  name: string | null;
  photo: string | null;
  number: string | null;
};

// Initial state type
type initialStateType = {
  isLogged: boolean;
  user: UserData | null;
};

const initialState: initialStateType = {
  isLogged: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      console.log('sign out 2')
        state.isLogged = false;
        state.user = null;
        Cookies.remove("authToken");
        Cookies.remove("authName");
        Cookies.remove("authImage");
        Cookies.remove("authNumber");
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLogged = true;
        state.user = action.payload;
        if (action.payload.token) {
          Cookies.set("authToken", action.payload.token, { expires: 7 });
          Cookies.set("authName", action.payload.name || "", { expires: 7 });
          Cookies.set("authImage", action.payload.photo || "", { expires: 7 });
          Cookies.set("authNumber", action.payload.number || "", { expires: 7 });
        }
      })
      .addCase(asyncRegister.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLogged = true;
        state.user = action.payload;
        if (action.payload.token) {
          Cookies.set("authToken", action.payload.token, { expires: 7 });
          Cookies.set("authName", action.payload.name || "", { expires: 7 });
          Cookies.set("authImage", action.payload.photo || "", { expires: 7 });
          Cookies.set("authNumber", action.payload.number || "", { expires: 7 });
        }
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLogged = true;
        state.user = action.payload;
        if (action.payload.token) {
          Cookies.set("authToken", action.payload.token, { expires: 7 });
          Cookies.set("authName", action.payload.name || "", { expires: 7 });
          Cookies.set("authImage", action.payload.photo || "", { expires: 7 });
          Cookies.set("authNumber", action.payload.number || "", { expires: 7 });
        }
      })
      .addCase(checkAuthFromCookie.fulfilled, (state, action: PayloadAction<UserData | null>) => {
        if (action.payload?.token) {
          state.isLogged = true;
          state.user = action.payload;
        } else {
          state.isLogged = false;
          state.user = null;
        }
      })
  },
});

export const checkAuthFromCookie = createAsyncThunk<UserData | null>(
  "auth/checkAuthFromCookie",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken") || null;
      const name = Cookies.get("authName") || null;
      const photo = Cookies.get("authImage") || null;
      const number = Cookies.get("authNumber") || null;

      if (token) {
        return { token, name, photo, number };
      }

      return null;
    }  
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const asyncLogin = createAsyncThunk<UserData, FormType>(
  "auth/login",
  async (value, { rejectWithValue }) => {
    const { email, password } = value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        token: await user.getIdToken(),
        name: user.displayName,
        photo: user.photoURL,
        number: user.phoneNumber,
      };
    } 
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const asyncRegister = createAsyncThunk<UserData, FormType>(
  "auth/register",
  async (value, { rejectWithValue }) => {
    const { email, password, name } = value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      return {
        token: await user.getIdToken(),
        name: user.displayName,
        photo: user.photoURL,
        number: user.phoneNumber,
      };
    }  
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const googleLogin = createAsyncThunk<UserData>(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      return {
        token: await user.getIdToken(),
        name: user.displayName,
        photo: user.photoURL,
        number: user.phoneNumber,
      };
    }  
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const {signOut} = authSlice.actions

export const asyncSignOut = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch }) => {
    console.log('sign out 1')
    await firebaseSignOut(auth);
    dispatch(signOut());
  }
);


export default authSlice.reducer;
