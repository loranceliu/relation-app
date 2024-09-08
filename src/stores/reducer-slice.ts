import { createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'redux';

const initialState: ModalVisibleState = {
  visible: false,
};

export const modalVisibleSlice = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    show: (state) => {
      state.visible = true
    },
    hide: (state) =>{
      state.visible = false
    }
  }
});

export const {show,hide} = modalVisibleSlice.actions

export default modalVisibleSlice.reducer
