import React, { Component } from 'react';
import {DataTable, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {NavigationActions as navigation} from "react-navigation";


let baseUrl = 'https://csnc.xyz:3000';

// Class object for OrgList
export default class OrgList extends React.Component {


    // Class constructor
    constructor(props) {
        // The props object are the properties assigned to the object.
        // In this case, that's "query" and "ref", as seen here:
        // <OrgList query={searchQuery} ref={orgRef}> </OrgList>
        super(props);

        // This is the state of the object - used to store class variables
        this.state = {
            orgList: [],
            loading: true
        }

        // This function makes updateList accessible outside the class
        this.updateList = this.updateList.bind(this);
    }

    // This searches using "query"
    async updateList(thung){
        // Set the state to the inital (loading: true) shows a loader
        this.setState({
            orgList: [],
            loading: true
        });
        // Encode the URL body
        let urlencoded = new URLSearchParams();
        urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
        urlencoded.append("search", thung);

        let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        // Send the request and wait for the response
        let response = await fetch(baseUrl + "/organizations/search", requestOptions);
        // Wait for the response to turn into text
        let result = await response.text();

        // Check for error with API
        if(result !== "Unsanitized input"){
            // No error loading response
            let body = JSON.parse(result);
            // Make sure "success" variable from API is true
            if(body.success) {
                // Success is true, pass the "organizations" array and set loading screen to false
                this.setState({
                    orgList: body.organizations,
                    loading: false
                });
            }else{
                // Request failed, find out why
                this.setState({
                    orgList: [{
                        id: -1,
                        name: "Error fetching organizations."
                    }]
                })
            }
        }else{
            // Error with API
            this.setState({
                orgList: [{
                    id: -1,
                    name: "Error fetching organizations (API)."
                }]
            })
        }
    }

    // This function is called when the element is rendered on the page
    async componentDidMount(){
        this.updateList(this.props.query);
    }

    // This function is called when the element is rendered AND
    // whenever setState() is called
    render(test, navigation){
        // Load the orgList and loading state
        const {orgList, loading} = this.state;
        // Check the value of "loading" boolean
        if(!loading){
            // Loading is false, so load the array
            return (
                // The .map function converts every object into the array into an "org" object one by one
                // This is how to print out arrays as React elements - for loops DO NOT WORK
                orgList.map((org) => {
                    // Org object schema (according to documentation)
                    /*
                    {
                    id: int,
                    name: String
                    }

                    So we just get the org ID and org name and assign it to the row variables.
                     */
                    console.log(test)
                    return <DataTable.Row key={org.id}>
                        <DataTable.Cell  key={org.id} onPress={() => {
                            this.props.navigation.navigate(this.props.test, {
                                id: org.id
                            });
                        }}>{org.name}</DataTable.Cell>
                    </DataTable.Row>
                })
            );
        }else{
            // Loading is true, so show the loading animation
            return (
                <ActivityIndicator animating={true}/>
            );
        }
    }
}
