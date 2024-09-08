import { Reducer } from "@reduxjs/toolkit";
import { PULL_USER_INFO } from "../constants/redux-constant";

const mineState : MineState= {
    isLogined: false,
    userInfo: {
        id: 0,
        name: '登录享云同步',
        email: '',
        time: 0,
        incomeNum: 0,
        expendNum: 0,
        revenue: 0
    }
}

const asyncReducer: Reducer = (state = mineState, action) => {
    switch (action.type) {
        case PULL_USER_INFO:
            return {
                ...state,
                isLogined: true,
                userInfo: action.payload,
            };
        default:
            return state;
    }
};

export default asyncReducer