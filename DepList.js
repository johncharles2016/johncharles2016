import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationActions as navigation} from "react-navigation";
import {DataTable, Snackbar, Switch} from 'react-native-paper';
import {
    HelperText,
    TextInput,
    Title,
    Button,
    Caption,
    Subheading,
    Portal,
    Modal,
    Provider,
    Searchbar,
    Appbar,
} from 'react-native-paper';
import {FlatList, TouchableWithoutFeedback} from "react-native-web";
import OrgList from "./OrgList.js";
import DepList from "./DepList.js";
import DepStat from "./DepStat.js";
import UserDep from "./UserDep.js";
import ManaDep from "./ManaDep.js";
import ManaOrg from "./ManaOrg.js"

const itemList = ['Organization 1', 'Organization 2'];
const baseUrl = 'https://csnc.xyz:3000';

function DepartmentManagementScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [depId, setDepId] = React.useState(undefined);
    const showModal = (id) => {setDepId(id); setVisible(true);}
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const[fullName, setNameNew] = React.useState('');
    const [errorText, setErrorText] = React.useState('Unknown error');
    const [showError, setShowError] = React.useState(false);
    return (
        <Provider>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}} >
                            <Title>Please Add Worker Details</Title>
                            <TextInput label = "Email Address" value = {fullName} style={styles.input} onChangeText={text => setNameNew(text)}/>
                            <HelperText style={{color: 'red'}} visible={showError}>{errorText}</HelperText>
                            <Button mode = "contained"  color = "lightgray" onPress={() => {console.log(depId), AddWorker(depId,setErrorText,setShowError, fullName)}}>
                                Add Worker
                            </Button>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'), RemoveWorker(depId,setErrorText,setShowError,fullName)}}>
                                Remove Worker
                            </Button>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'), hideModal()}} >
                                Close
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <Title>Workers</Title>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Worker Name</DataTable.Title>
                        <DataTable.Title>Add/Remove Workers From Department</DataTable.Title>
                        <DataTable.Title>Delete Department</DataTable.Title>
                    </DataTable.Header>
                    <ManaDep showModal={showModal} />

                    <DataTable.Pagination
                        page={1}
                        numberOfPages={3}
                        onPageChange={page => {
                            console.log(page);
                        }}
                        label="1-2 of 6"
                    />
                </DataTable>
                <Button mode = "contained" color = "lightgray" style ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Settings')}}>
                    Settings
                </Button>
            </View>
        </Provider>
    );
}
function AddWorker(id, setErrorText, setShowError,fullName){
    let urlencoded = new URLSearchParams();
    urlencoded.append("id", id);
    urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
    urlencoded.append("action","add");
    urlencoded.append("email",fullName);

    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(baseUrl + "/departments/workers", requestOptions)
        .then(response => response.text())
        .then(result => {
            let body = JSON.parse(result);
            if (body.success){
                setErrorText("Worker Added");
                setShowError(true);
            }
            else{
                setErrorText("Failed to add Worker");
                setShowError(true);

            }

        })
        .catch(error => {console.log('error', error)});
}

function RemoveWorker(id, setErrorText, setShowError,fullName){
    let urlencoded = new URLSearchParams();
    urlencoded.append("id", id);
    urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
    urlencoded.append("action","add");
    urlencoded.append("email",fullName);


    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(baseUrl + "/departments/workers", requestOptions)
        .then(response => response.text())
        .then(result => {
            let body = JSON.parse(result);
            if (body.success){
                setErrorText("Worker Removed");
                setShowError(true);
            }
            else{
                setErrorText("Failed to remove Worker");
                setShowError(true);

            }

        })
        .catch(error => {console.log('error', error)});
}

function RegisterScreen({navigation}) {
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [errorText, setErrorText] = React.useState('Unknown error');
    const [showError, setShowError] = React.useState(false);
    return (
        <View style={styles.container}>
            <Title>Register New Account</Title>
            <TextInput label="Full Name" value={fullName} onChangeText={text => setFullName(text)} style={styles.input} autoCompleteType={"name"}/>
            <TextInput label="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input} autoCompleteType={"email"} keyboardType={"email-address"}/>
            <TextInput label="Password" value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry={true}/>
            <TextInput label="Confirm Password" style={styles.input} value={passwordConfirm} onChangeText={text => setPasswordConfirm(text)} secureTextEntry={true}/>
            <TextInput label="Phone Number" style={styles.input} value={phone} onChangeText={text => setPhone(text)} autoCompleteType={"tel"} keyboardType={"numeric"}/>
            <HelperText style={{color: 'red'}} visible={showError}>{errorText}</HelperText>
            <Button mode="contained" color = "lightgray" onPress={() => handleRegistration(fullName, email, password, passwordConfirm, phone, setErrorText, setShowError, navigation)}>
                Register
            </Button>
        </View>
    );
}

function handleRegistration(fullName, email, password, passwordConfirm, phone, setErrorText, setShowError, navigation){
    console.log('Ran!');
    if(fullName === "" || email === "" || password === "" || passwordConfirm === "" || phone === ""){
        setErrorText('Please complete all fields.');
        setShowError(true);
        return;
    }
    if(password !== passwordConfirm){
        setErrorText('Passwords do not match.');
        setShowError(true);
        return;
    }
    if(!email.includes('@')){
        setErrorText('Please correct the email.');
        setShowError(true);
        return;
    }
    setShowError(false);
    // process request
    let data = new URLSearchParams();
    data.append('email', email);
    data.append('name', fullName);
    data.append('password', password);
    data.append('phone', phone);
    let url = baseUrl + '/users/signup';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    }).then(response => {

    })
        .then((body) => {
            console.log(body);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

/*
Typing timeout functionality

Instead of sending a request every keystroke, we wait until there are no keystrokes for
0.7 seconds before sending a request.
 */
let typingTimeout = null;

function OrganizationScreen({ navigation }) {
    const[org, setorg] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    let placeholder1 = "DepartmentL";

    // This creates a "reference", assigned to the OrgList class using ref={orgRef}
    let orgRef = React.createRef();

    // This fires whenever the text in the search changes
    const onChangeSearch = query => {
        // FIRST - Update the searchQuery parameter
        setSearchQuery(query);
        // Now here is the typing timeout functionality - check if typingTimeout is null
        if(typingTimeout === null) {
            // If typingTimeout was null, that means they currently ARE NOT on cooldown, so perform the search
            orgRef.current.updateList(query);
            // Now assign typing timeout to a function that makes it null again in 700ms
            typingTimeout = setTimeout(() => {
                // This makes typingTimeout null again in 700ms
                typingTimeout = null;
            }, 700);
        }
    }



    return (
        <View style={styles.container}>
            <Title>Please Search for an organization</Title>
            <Searchbar
                placeholder = "Search"
                onChangeText ={onChangeSearch}
                value = {searchQuery}
            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Organization Name</DataTable.Title>
                </DataTable.Header>


                <OrgList query={searchQuery} ref={orgRef} test = {placeholder1} navigation = {navigation}>
                </OrgList>


                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />

            </DataTable>
            <Button mode = "contained" color = "lightgray"  style ={styles.button3} onPress={() => {console.log("Pressed");navigation.navigate('Clockin')}}>
                Clockin Page
            </Button>
            <Button mode = "contained" color = "lightgray" style ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Management')}}>
                Data Management
            </Button>
            <Button mode = "contained" color = "lightgray" style ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('OrgMana')}}>
                Manage Organizations
            </Button>
        </View>
    );
}

function DepartmentListScreen({ route, navigation }) {
    console.log(route.params);
    const[org, setorg] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    let placeholder1 = "DepartmentS";

    // This creates a "reference", assigned to the OrgList class using ref={orgRef}
    let orgRef = React.createRef();

    // This fires whenever the text in the search changes
    const onChangeSearch = query => {
        // FIRST - Update the searchQuery parameter
        setSearchQuery(query);
        // Now here is the typing timeout functionality - check if typingTimeout is null
        if(typingTimeout === null) {
            // If typingTimeout was null, that means they currently ARE NOT on cooldown, so perform the search
            orgRef.current.updateList(query);
            // Now assign typing timeout to a function that makes it null again in 700ms
            typingTimeout = setTimeout(() => {
                // This makes typingTimeout null again in 700ms
                typingTimeout = null;
            }, 700);
        }
    }
    return (
        <View style={styles.container}>
            <Title>Please Search for an Department</Title>
            <Searchbar
                placeholder = "Search"
                onChangeText ={onChangeSearch}
                value = {searchQuery}
            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Department Name</DataTable.Title>
                    <DataTable.Title>Subscribe to department?</DataTable.Title>
                </DataTable.Header>

                <DepList query={searchQuery} ref={orgRef} test={placeholder1} orgId={route.params.id} navigation = {navigation}>
                </DepList>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />

            </DataTable>
        </View>
    );
}

function DepartmentStatusScreen({route, navigation }) {
    console.log(route.params);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Title>Clocked In Workers</Title>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Worker Name</DataTable.Title>
                            <DataTable.Title>Email</DataTable.Title>
                            <DataTable.Title>Phone Number</DataTable.Title>
                        </DataTable.Header>
                        <DepStat depId = {route.params.id}>
                        </DepStat>

                        <DataTable.Pagination
                            page={1}
                            numberOfPages={3}
                            onPageChange={page => {
                                console.log(page);
                            }}
                            label="1-2 of 6"
                        />
                    </DataTable>
                    <Button mode = "contained" color = "lightgray" style ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Organization')}}>
                        Search New Organization
                    </Button>
                </View>
    );
}

function SettingsScreen({ navigation }) {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
    const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);

    return (
        <View style={styles.container}>
            <Title>Management Settings</Title>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Setting</DataTable.Title>
                    <DataTable.Title>Setting Description</DataTable.Title>
                    <DataTable.Title>On/Off</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Setting Name 1</DataTable.Cell>
                    <DataTable.Cell>Description 1</DataTable.Cell>
                    <DataTable.Cell><Switch value={isSwitchOn} onValueChange={onToggleSwitch} /></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Setting Name 2</DataTable.Cell>
                    <DataTable.Cell>Description 2</DataTable.Cell>
                    <DataTable.Cell><Switch/></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />

            </DataTable>
        </View>
    );
}

function ClockInScreen({ navigation }) {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <View>
            <Title>Clock In</Title>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Department</DataTable.Title>
                    <DataTable.Title>Clock In/Out</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                </DataTable.Header>

                <UserDep/>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />

            </DataTable>
        </View>
    );
}


function LoginScreen({navigation}) {
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [errorText, setErrorText] = React.useState('Unknown error');
    const [showError, setShowError] = React.useState(false);
    return (
        <View style={styles.container}>
            <Title>Please Log In</Title>
            <TextInput label="Email" value={user} style={styles.input} onChangeText={text => setUser(text)} dense ={false}/>
            <TextInput label="Password" value={pass} style={styles.input} onChangeText={text => setPass(text)}/>
            <HelperText style={{color: 'red'}} visible={showError}>{errorText}</HelperText>
            <Button mode="contained" color = "lightgray" onPress={() => handleLogin(setShowError, setErrorText, user, pass, navigation)}>
                <Text>Login</Text>
            </Button>
            <Caption>Don't have an account?</Caption>
            <Button mode="contained" color = "lightgray" style={styles.button3}containerStyle={styles.loginButtons} onPress={() => {
                console.log('Pressed');
                navigation.navigate('Register')
            }}>
               Register
            </Button>
            <Button
                style= {styles.button3}
                //icon="send" 
				 color = "lightgray"
                mode="contained"
                onPress={() => {test();}}
            >
                test
            </Button>

        </View>
    );
}
function test(){
    let urlencoded = new URLSearchParams();
    urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
    urlencoded.append("id", "3");

    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://csnc.xyz:3000/organizations/details", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function handleLogin(setShowError, setErrorText, email, password, navigation){
    if(email === "" || password === ""){
        setErrorText("Fill out all required fields");
        setShowError(true);
        return;
    }
    if(!validateEmail(email)){
        setErrorText("Invalid email");
        setShowError(true);
        return;
    }
    setErrorText("");
    setShowError(false);
    // process request
    let data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    let url = baseUrl + '/users/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    }).then(response => {
        console.log(response);
        return response.text();
    })
        .then((body) => {
            if(body === "Unsanitized input."){
                setErrorText("Database error.");
                setShowError(true);
                return;
            }
            body = JSON.parse(body);
            if(body.success){
                navigation.navigate('Organization');
            }else{
                setErrorText(body.reason);
                setShowError(true);
                return;
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function HomeScreen({ navigation }) {
    return (
        <View style = {styles.container}>
            <Title style = {styles.hometext}>
                Welcome to Customer Service Notification Service!
            </Title>
            <Button
                style= {styles.button3}
                //icon="send"
				color = "lightgray" 
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Organization')}}
            >
                Guest Login
            </Button>
            <Button
                style= {styles.button3}
                //icon="send" 
				color = "lightgray"
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Login')}}
            >
                Login
            </Button>
            <Button
                style= {styles.button3}
                //icon="send"
				color = "lightgray" 
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Register')}}
            >
                Register
            </Button>
        </View>
    );
}

function OrgManaScreen({  navigation: { goBack } }) {
    const [visible2, setVisible2] = React.useState(false);
    const onToggleSnackBar = () => setVisible2(!visible);
    const onDismissSnackBar = () => setVisible2(false);

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [visible3, setVisible3] = React.useState(false);
    const [OrgId, setOrgId] = React.useState(undefined);
    const showModal3 = (id) => {setOrgId(id); setVisible3(true);}
    const hideModal3 = () => setVisible3(false);


    const [errorText, setErrorText] = React.useState('Unknown error');
    const [showError, setShowError] = React.useState(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const[orgName, setOrgNameNew] = React.useState('');
    const[depName, setDepNameNew] = React.useState('');
    return (
        <Provider>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}} >
                            <Title>Please Add Organization Name </Title>
                            <TextInput label = "Full Name" value = {orgName} style={styles.input} onChangeText={text => setOrgNameNew(text)}/>
                            <HelperText style={{color: 'red'}} visible={showError}>{errorText}</HelperText>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'),orgCreate(orgName,setErrorText,setShowError), setOrgNameNew('')}}>
                                Confirm
                            </Button>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'), hideModal(), console.log(test)}}>
                                Cancel
                            </Button>
                        </View>
                    </Modal>
                    <Modal  visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}} >
                            <Title>Please Add Department Name </Title>
                            <TextInput label = "Department Name" value = {depName} style={styles.input} onChangeText={text => setDepNameNew(text)}/>
                            <HelperText style={{color: 'red'}} visible={showError}>{errorText}</HelperText>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'), setOrgNameNew(''),depCreate(depName,setErrorText,setShowError,OrgId)}}>
                                Add
                            </Button>
                            <Button mode = "contained" color = "lightgray" onPress={() => {console.log('Pressed'), hideModal3(), console.log(test)}}>
                                Cancel
                            </Button>
                        </View>

                    </Modal>
                </Portal>
                <Appbar.Header style = {styles.backarrow}>
                    <Appbar.BackAction onPress={() => {goBack()}} />
                </Appbar.Header>
                <Title>Organization Management</Title>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Organization</DataTable.Title>
                        <DataTable.Title>Delete Organization</DataTable.Title>
                        <DataTable.Title>Add Department</DataTable.Title>
                    </DataTable.Header>
                    <ManaOrg onToggleSnackBar = {onToggleSnackBar} showModal3 = {showModal3}/>
                </DataTable>
                <Snackbar
                    visible={visible2}
                    onDismiss={onDismissSnackBar}
                    action={{
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    Organization Deleted
                </Snackbar>
                <Button mode = "contained" color = "lightgray" style ={styles.button3} onPress={() => {console.log('Pressed'); showModal();setShowError(false);}}>
                    Add Organization
                </Button>
            </View>
        </Provider>
    );
}
function depCreate(depName, setErrorText,setShowError,id){
    console.log(id)
    console.log(depName)
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", depName);
    urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");
    urlencoded.append("organization",id);

    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(baseUrl + "/departments/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            let body = JSON.parse(result);
            if (body.success){
                setErrorText("Depatment Created");
                setShowError(true);
            }
            else{
                setErrorText("Department Creation Failed Please Try Again");
                setShowError(true);
            }

        })
        .catch(error => {console.log('error', error)});
}


function orgCreate(orgName, setErrorText,setShowError){
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", orgName);
    urlencoded.append("token", "19c3b84f9e28a02fd28b48be5");

    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(baseUrl + "/organizations/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            let body = JSON.parse(result);
            if (body.success){
                setErrorText("Organization Created");
                setShowError(true);
            }
            else{
                setErrorText("Organization Failed Please Try Again");
                setShowError(true);
            }

        })
        .catch(error => {console.log('error', error)});

}


const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Management" component={DepartmentManagementScreen} options={{ title: 'Management page' }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registration page' }}/>
                <Stack.Screen name="Organization" component={OrganizationScreen} options={{ title: 'Organizational Search page' }}/>
                <Stack.Screen name="DepartmentL" component={DepartmentListScreen} options={{ title: 'Departmental Search page' }}/>
                <Stack.Screen name="DepartmentS" component={DepartmentStatusScreen} options={{ title: 'Department Status page' }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login page' }}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home page' }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings page' }}/>
                <Stack.Screen name="Clockin" component={ClockInScreen} options={{ title: 'Clock in page' }}/>
                <Stack.Screen name="OrgMana" component={OrgManaScreen} options={{ title: 'Organization management' }}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create ({
    button3: {
        height:"5%",
        marginBottom: 10,
        marginTop: 10,
		fontSize: "105%",
		color: 'white'
    },
    button2:{
        height:30,
        marginBottom: 10,
        marginTop: 10
    },
    input:{
        fontSize: "100%",
        height:50,
        width: 300
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop:40,
		color: "orange"

    },
    hometext: {
        fontWeight: 'bold',
        color: 'black' ,
        fontSize: "250%"
    },
    backarrow:{
        position:'absolute',
        left: 0,
        right:0,
    },
})

