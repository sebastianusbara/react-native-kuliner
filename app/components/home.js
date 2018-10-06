'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
	TouchableHighlight,
	TouchableOpacity,
	Alert,
	Button,
	Modal
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalAdd: false,
			modalEdit: false,
			selectedId: "",
			name: "",
			desc: ""
		};

		this.renderItem = this.renderItem.bind(this);
		this.addCuisine = this.addCuisine.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.submitCuisine = this.submitCuisine.bind(this);
		this.deleteCuisine = this.deleteCuisine.bind(this);
		this.updateCuisine = this.updateCuisine.bind(this);
		this.setName = this.setName.bind(this);
		this.setDesc = this.setDesc.bind(this);
	}

	componentDidMount() {
		this.props.getData(); //call our action
	}

	render() {
		let data = (!!this.props.data && this.props.data) || null;

		if (this.props.loading) {
			return (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator animating={true}/>
				</View>
			);
		} else {
			return (
				<View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalAdd}
						onRequestClose={() => {
							this.setState({modalAdd: false})
						}}>
						<View style={{marginTop: 22}}>
							<FormLabel>
								Cuisine Name
							</FormLabel>
							<FormInput placeholder="Please enter the food name..." onChangeText={(input) => {this.setName(input)}}/>
							<FormLabel>
								Description
							</FormLabel>
							<FormInput placeholder="Please enter the food description..." onChangeText={(input) => {this.setDesc(input)}}/>
							<Button style={styles.submit} title="Submit" onPress={this.submitCuisine}/>
						</View>
					</Modal>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalEdit}
						onRequestClose={() => {
							this.setState({modalEdit: false})
						}}>
						<View style={{marginTop: 22}}>
							<FormLabel>
								Cuisine Name
							</FormLabel>
							<FormInput placeholder="Please enter the food name..."
							           onChangeText={(input) => {this.setName(input)}}
							           value={this.state.name}/>
							<FormLabel>
								Description
							</FormLabel>
							<FormInput placeholder="Please enter the food description..."
							           onChangeText={(input) => {this.setDesc(input)}}
							           value={this.state.desc}/>
							<Button style={styles.submit} title="Update" onPress={this.updateCuisine}/>
						</View>
					</Modal>
					<FlatList
						ref='listRef'
						data={data}
						renderItem={this.renderItem}
						refreshing={true}
						keyExtractor={(item, index) => index.toString()}/>
					<Button title="Add Cuisine" onPress={this.addCuisine}/>
				</View>
			);
		}
	}

	setName(input) {
		this.setState({name: input});
	};

	setDesc(input) {
		this.setState({desc: input});
	};

	addCuisine() {
		this.setState({modalAdd: true});
	};

	openEdit(data) {
		this.setState({
			modalEdit: true,
			selectedId: data.id,
			name: data.name,
			desc: data.description
		});
	};

	submitCuisine() {
		let data = {
			name: this.state.name,
			description: this.state.desc
		};
		this.props.submitData(data);
		this.setState({modalAdd: false});
	};

	updateCuisine() {
		let data = {
			id: this.state.selectedId,
			name: this.state.name,
			description: this.state.desc
		};
		this.props.updateData(data);
		this.setState({modalEdit: false});
	};

	deleteCuisine(id) {
		this.props.deleteData(id);
	};

	renderItem({item, index}) {
		return (
			<View style={styles.row}>
				<Text style={styles.title}>
					{parseInt(index) + 1}{". "}{item.name}
				</Text>
				<Text style={styles.description}>
					{item.description}
				</Text>
				<TouchableOpacity style={styles.update} onPress={(data) => {this.openEdit(item)}}>
					<Text style={styles.updateText}>
						Update
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.delete} onPress={(id) => {this.deleteCuisine(item.id)}}>
					<Text style={styles.deleteText}>
						Delete
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
};

function mapStateToProps(state, props) {
	return {
		loading: state.dataReducer.loading,
		data: state.dataReducer.data
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
	activityIndicatorContainer:{
		backgroundColor: "#fff",
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},

	row:{
		position: "relative",
		borderBottomWidth: 1,
		borderColor: "#ccc",
		padding: 10
	},

	title:{
		fontSize: 15,
		fontWeight: "600"
	},

	description:{
		marginTop: 5,
		fontSize: 14,
	},

	submit: {
		margin: 12
	},

	delete: {
		position: "absolute",
		right: 0,
		margin: 12,
		backgroundColor: "#F44336",
	},

	deleteText: {
		color: "white",
		padding: 5,
	},

	update: {
		position: "absolute",
		right: 54,
		margin: 12,
		backgroundColor: "#009688",
	},

	updateText: {
		color: "white",
		padding: 5,
	},
});