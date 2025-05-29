import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthType } from "../../@types/auth";



type authSliceType = {
    isAuthenticated: boolean|null;
    user:UserAuthType;
    
}
const initialAuthState:authSliceType = {
    isAuthenticated: null,
    user:{
        name: '',
        email: '',
        role:'',
        userId:'',
        avatar:null,
    }
}


const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        setIsAuthenticated(state,action:PayloadAction<UserAuthType>){
            state.isAuthenticated = true;
            state.user = action.payload
        },
        setIsNotAuthenticated(state){
            state.isAuthenticated = false;
            state.user = {
                name: '',
                email: '',
                role: '',
                userId:'',
                avatar:null,
            }
        }

    }

})


export const {setIsAuthenticated, setIsNotAuthenticated} = authSlice.actions;
export default authSlice.reducer;

