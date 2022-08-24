import { createSlice } from '@reduxjs/toolkit'
import  Axios  from 'axios';
import API from "../ApiEndPonts"

const headers = { "x-access-token": localStorage.getItem("access-token")};

const initialState = {
  filesData:{
    id : 0,
    type: "Folder",
    name: "root",
    contains : []
  }
}

export const filesDataSlice = createSlice({
  name: 'filesData',
  initialState ,
  reducers: {
    update: (state,action) => {
        state.filesData = action.payload
    },
  },
})


export const { update } = filesDataSlice.actions
export default filesDataSlice.reducer