import { auth, provider } from "@/core_components/firebase/firebase";
import { FormType } from "@/shared_features/SharedForm";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

type UserData = {
    token: string | null;
    name: string | null;
    photo: string | null;
    number: string | null;
}

type initialStateType = {
  isLogged: true | false;
  user: UserData | null;
};

const initialState: initialStateType = {
    isLogged: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: () => {
            console.log("hi")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action: PayloadAction<UserData>)=>{
            state.isLogged = true
            state.user = action.payload
            console.log(state.user.token)
        }).addCase(googleLogin.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.isLogged = true;
            state.user = action.payload;
        }).addCase(asyncRegister.fulfilled, (state, action: PayloadAction<UserData>)=>{
            state.isLogged = true
            state.user = action.payload
        }).addMatcher(
      (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
      (state, action) => {
        console.error("Auth error:", action.payload); 
        state.isLogged = false;
        state.user = null;
      }
    );

    }
})

export const asyncLogin = createAsyncThunk<UserData, FormType>(
  'auth/login',
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const asyncRegister = createAsyncThunk<UserData, FormType>(
  'auth/register',
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const googleLogin = createAsyncThunk<UserData>(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential?.accessToken;
      const user = result.user;
      return {
        token: await user.getIdToken(),
        name: user.displayName,
        photo: user.photoURL,
        number: user.phoneNumber,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const {login} = authSlice.actions

export default authSlice.reducer