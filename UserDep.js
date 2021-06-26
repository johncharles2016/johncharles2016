import React, { Component } from 'react';
import {DataTable, ActivityIndicator, Switch, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {NavigationActions as navigation} from "react-navigation";


let baseUrl = 'https://csnc.xyz:3000';



// Class object for OrgList
export default class UserDep extends React.Component {

    ClockIn(depId){
        let urlencoded = new URLSearchParams();
        urlencoded.append("id", depId);
        urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");

        let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(baseUrl + "/departments/clock", requestOptions)
            .then(response => response.text())
            .then(result => {
                let body = JSON.parse(result);
                if (body.success){

                }
                else{

                }

            })
            .catch(error => {console.log('error', error)});

    }


    // Class constructor
    constructor(props) {
        // The props object are the properties assigned to the object.
        // In this case, that's "query" and "ref", as seen here:
        // <OrgList query={searchQuery} ref={orgRef}> </OrgList>
        super(props);

        // This is the state of the object - used to store class variables
        this.state = {
            loading: true,
        }

        let urlencoded = new URLSearchParams();
        urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");

        let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(baseUrl + "/users/departments", requestOptions)
            .then(response => response.text())
            .then(parsed => {
                let resp = JSON.parse(parsed);

                //const [isSwitchOn, setIsSwitchOn] = React.useState(false);
               // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


                this.setState({
                    loading: false,
                    resp: resp,
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
                resp.departments.map((dep) => {

                    let containsUser = false;

                    for(let user of dep.clockedInfo){
                        if(user.id === 14){
                            containsUser = true;
                        }
                    }
                    // Org object schema (according to documentation)
                    /*
                    {
                    id: int,
                    name: String
                    }

                    So we just get the org ID and org name and assign it to the row variables.
                     */


                    return <DataTable.Row key={dep.id}>
                        <DataTable.Cell>{dep.name}</DataTable.Cell>
                        <DataTable.Cell><Button mode = "contained" onPress={() => {this.ClockIn(dep.id)}}>
                            Clock In/Out
                        </Button></DataTable.Cell>
                        <DataTable.Cell>{containsUser ? "Yes" : "No"}</DataTable.Cell>
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
