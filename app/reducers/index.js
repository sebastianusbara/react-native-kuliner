import { combineReducers } from 'redux';

import { FETCH_DATA, SUBMIT_DATA, DELETE_DATA, UPDATE_DATA } from "../actions/";

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
	switch (action.type) {
		case FETCH_DATA:
			state = Object.assign({}, state, { data: action.data, loading: false });
			return state;
		case SUBMIT_DATA:
			state = Object.assign({}, state, { loading: false });
			return state;
		case DELETE_DATA:
			state = Object.assign({}, state, { loading: false });
			return state;
		case UPDATE_DATA:
			state = Object.assign({}, state, { loading: false });
			return state;
		default:
			return state;
	}
};

// Combine all the reducers
const rootReducer = combineReducers({
	dataReducer
	// ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;