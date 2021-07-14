/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {getChats} from 'src/store/actions/chatActions'



const chatReducer = createSlice({
    name: 'chatReducer',
    initialState: {
        // for bulk chats
        chats: [],
        // if no user found
        chatsContainer: [],

        loader: false,
        errors: {},
        chatData: {
            display_name: '',
            date: '',
            chat: '',
        },
    },

    // normal actions create here 
    reducers: {
        // for chats clear
        clearChat: (state) => {
            state.chatData = {
            display_name: "",
            date: "",
            chat: "",
            };
        },
    },

    // for api get data AsyncThunk create promises here
    // Async actions create here 
    extraReducers: {
        // pending promise
        [getChats.pending]: (state, action) => {
            state.loader = true;
        },
        // fulfilled promise
        [getChats.fulfilled]: (state, action) => {
            state.loader = false;
            // response.data accessed
            state.chats = action.payload;
            // if no user found
            state.chatsContainer = action.payload;
        },
        // rejected promise error
        [getChats.rejected]: (state, action) => {
            state.loader = false;
            state.errors = action.payload;
        },
        // ------------------------------ //

    },
});

export const { clearChat } = chatReducer.actions;


export default chatReducer.reducer
