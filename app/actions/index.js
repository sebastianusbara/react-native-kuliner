export const FETCH_DATA = 'FETCH_DATA';
export const SUBMIT_DATA = 'SUBMIT_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

//Import the sample data
import axios from 'axios';

export function getData(){
	return (dispatch) => {
		axios.get('http://159.65.13.67:3000/cuisine')
			.then(function(response){
				dispatch({type: FETCH_DATA, data: response.data.data});
			});
	};
}

export function submitData(data){
	return (dispatch) => {
		axios.post('http://159.65.13.67:3000/cuisine', data)
			.then(function(response){
				dispatch(getData());
				dispatch({type: SUBMIT_DATA});
			});
	};
}

export function deleteData(id){
	return (dispatch) => {
		axios.delete('http://159.65.13.67:3000/cuisine/' + id)
			.then(function(response){
				dispatch(getData());
				dispatch({type: DELETE_DATA});
			});
	};
}

export function updateData(data){
	return (dispatch) => {
		axios.patch('http://159.65.13.67:3000/cuisine/' + data.id, data)
			.then(function(response){
				dispatch(getData());
				dispatch({type: UPDATE_DATA});
			});
	};
}