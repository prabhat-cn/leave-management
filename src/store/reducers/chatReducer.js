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
    },

    // normal actions create here 
    reducers: {
        // actions here
        // state = initialState
        addChat: (state, action) => {
            // console.log('action', action);
            // add and copy
            state.chats = [...state.chats, action.payload];
        },

        // for user filter
        filteredChat: (state, action) => {
            // filter
            // state.chats = state.chats.filter(
            //     (user) => user.name.toLowerCase().includes(action.payload)
            // );
            // if no user found with chats
            state.chats = state.chatsContainer.filter(
                (user) => user.name.toLowerCase().includes(action.payload)
            );

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

export const {addChat, filteredChat} = chatReducer.actions;


export default chatReducer.reducer
