import React, { Component } from 'react';
import {DataTable, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {NavigationActions as navigation} from "react-navigation";


let baseUrl = 'https://csnc.xyz:3000';

// Class object for OrgList
export default class DepStat extends React.Component {


    // Class constructor
    constructor(props) {
        // The props object are the properties assigned to the object.
        // In this case, that's "query" and "ref", as seen here:
        // <OrgList query={searchQuery} ref={orgRef}> </OrgList>
        super(props);

        // This is the state of the object - used to store class variables
        this.state = {
            loading: true,
            depId: this.props.depId
        }

        let urlencoded = new URLSearchParams();
        urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
        urlencoded.append("id", this.state.depId);

        let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(baseUrl + "/departments/load", requestOptions)
            .then(response => response.text())
            .then(parsed => {
                let resp = JSON.parse(parsed);
                this.setState({
                    loading: false,
                    depId: this.props.depId,
                    resp: resp
                })
            })
            .catch(error => console.log('error', error));



    }

    // This function is called when the element is rendered AND
    // whenever setState() is called
    render(navigation){
        // Load the orgList and loading state
        const {loading,resp} = this.state;
        console.log(resp);
        // Check the value of "loading" boolean
        if(!loading){
            // Loading is false, so load the array
            return (
                // The .map function converts every object into the array into an "org" object one by one
                // This is how to print out arrays as React elements - for loops DO NOT WORK
                resp.departments[0].clockedInfo.map((info) => {
                    // Org object schema (according to documentation)
                    /*
                    {
                    id: int,
                    name: String
                    }

                    So we just get the org ID and org name and assign it to the row variables.
                     */
                    return <DataTable.Row key={info.email}>
                        <DataTable.Cell>{info.name}</DataTable.Cell>
                        <DataTable.Cell>{info.email}</DataTable.Cell>
                        <DataTable.Cell >{info.phone}</DataTable.Cell>
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
