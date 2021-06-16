import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationActions as navigation} from "react-navigation";
import {DataTable, Switch} from 'react-native-paper';
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
} from 'react-native-paper';
import {FlatList, TouchableWithoutFeedback} from "react-native-web";
const itemList = ['Organization 1', 'Organization 2']

function DepartmentManagementScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const[fullName, setNameNew] = React.useState('');
    return (
        <Provider>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}} >
                            <Title>Please Add Worker Details</Title>
                            <TextInput label = "Full Name" value = {fullName} style={styles.input} onChangeText={text => setNameNew(text)}/>
                            <Button mode = "contained" onPress={() => console.log('Pressed')}>
                                Confirm
                            </Button>
                            <Button mode = "contained" onPress={() => {console.log('Pressed'), hideModal()}}>
                                Cancel
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <Title>Workers</Title>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Worker Name</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>John Doe</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Jane Doe</DataTable.Cell>
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
                <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed'); showModal()}}>
                    Add Worker
                </Button>
                <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed'); showModal()}}>
                    Remove Worker
                </Button>
                <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Settings')}}>
                    Settings
                </Button>
            </View>
        </Provider>
    );
}

function RegisterScreen({ navigation }) {
    const[userNew, setUserNew] = React.useState('');
    const[passNew, setPassNew] = React.useState('');
    return (
        <View style={styles.container}>
            <Title>Register New Account</Title>
            <TextInput label = "Full Name"  style={styles.input} />
            <TextInput label = "Email" value = {userNew} style={styles.input} onChangeText={text => setUserNew(text)}/>
            <TextInput label = "Password" value = {passNew} style={styles.input} onChangeText={text => setPassNew(text)}/>
            <TextInput label = "Confirm Password"  style={styles.input} />
            <TextInput label = "Phone Number"  style={styles.input} />
            <Button mode = "contained" onPress={() => {console.log('Pressed'); navigation.navigate('Login')}}>
                Register
            </Button>
            <Button mode = "contained" onPress={() => {console.log('Pressed');navigation.navigate('Login')}}>
                Login
            </Button>
        </View>
    );
}
function OrganizationScreen({ navigation }) {
    const[org, setorg] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => {
        setSearchQuery(query);
        console.log("text", query);
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

                <DataTable.Row>
                    <DataTable.Cell onPress={() => {console.log('Pressed');navigation.navigate('DepartmentL')}}>Organization 1</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell onPress={() => {console.log('Pressed');navigation.navigate('DepartmentL')}}>Organization 2</DataTable.Cell>
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
            <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Clockin')}}>
                Clockin Page
            </Button>
            <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Management')}}>
                Data Management
            </Button>
        </View>
    );
}
function DepartmentListScreen({ navigation }) {
    //const[org, setorg] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => {
        setSearchQuery(query);
        console.log("text", query);
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

                <DataTable.Row>
                    <DataTable.Cell onPress={() => {console.log('Pressed');navigation.navigate('DepartmentS')}}>Department 1</DataTable.Cell>
                    <DataTable.Cell onPress={() => {console.log('Pressed')}}>Subscribe</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell onPress={() => {console.log('Pressed');navigation.navigate('DepartmentS')}}>Department 2</DataTable.Cell>
                    <DataTable.Cell onPress={() => {console.log('Pressed')}}>Subscribe</DataTable.Cell>
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
function DepartmentStatusScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
        <Provider>
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <View style={{alignItems: 'center'}} >
                                <Title>Name:</Title>
                                <Title>Phone Number:</Title>
                            </View>
                        </Modal>
                    </Portal>
                    <Title>Workers</Title>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Worker Name</DataTable.Title>
                            <DataTable.Title>Status</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>John Doe</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Jane Doe</DataTable.Cell>
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
                    <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed'); showModal()}}>
                        Contact Info
                    </Button>
                    <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Organization')}}>
                        Search New Organization
                    </Button>
                </View>
            </View>
        </Provider>

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
                    <DataTable.Cell><Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} /></DataTable.Cell>
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
        return (
        <View style={styles.container}>
            <Title>Clock In</Title>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Department</DataTable.Title>
                    <DataTable.Title>Clock In</DataTable.Title>
                    <DataTable.Title>Clock Out</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Department 1</DataTable.Cell>
                    <DataTable.Cell><Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');}}>
                        Clock in
                    </Button></DataTable.Cell>
                    <DataTable.Cell><Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');}}>
                        Clock Out
                    </Button></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Department 2</DataTable.Cell>
                    <DataTable.Cell><Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');}}>
                        Clock in
                    </Button></DataTable.Cell>
                    <DataTable.Cell><Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');}}>
                        Clock Out
                    </Button></DataTable.Cell>
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
function LoginScreen({ navigation }) {
    const[user, setUser] = React.useState('');
    const[pass, setPass] = React.useState('');
    return (
        <View style={styles.container}>
            <Title>Please Log In</Title>
            <TextInput label = "Email" value = {user} style={styles.input} onChangeText={text => setUser(text)}/>
            <TextInput label = "Password" value = {pass} style={styles.input} onChangeText={text => setPass(text)}/>
            <Button mode = "contained"onPress={() => {console.log('Pressed');navigation.navigate('Organization')}}>
                Login
            </Button>
            <Caption>Don't have an account?</Caption>
            <Button mode = "contained" contentStyle ={styles.button3} onPress={() => {console.log('Pressed');navigation.navigate('Register')}}>
                Register
            </Button>
        </View>
    );
}
function HomeScreen({ navigation }) {
    return (
        <View style = {styles.homecontainer}>
            <Title style = {styles.hometext}>
                Welcome to Customer Service Notification Service!
            </Title>
            <Button
                style= {styles.homebutton}
                //icon="send"
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Organization')}}
            >
                Guest Login
            </Button>
            <Button
                style= {styles.homebutton1}
                //icon="send"
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Login')}}
            >
                Login
            </Button>
            <Button
                style= {styles.homebutton2}
                //icon="send"
                mode="contained"
                onPress={() => {console.log('Pressed');navigation.navigate('Register')}}
            >
                Register
            </Button>
        </View>
    );
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create ({
    button3: {
        height:25
    },
    button2:{
        height:30
    },
    input:{
        height:40,
        width: 300
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop:40,

    },
    homecontainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'gray',
        padding: 30
    },
    hometext: {
        fontWeight: 'bold',
        color: 'white' ,
        fontSize: 30
    },
    homebutton: {
        borderWidth: 2,
        padding: 15,
        marginBottom: 10,
        borderColor: 'gold',
        backgroundColor: 'green'
    },
    homebutton1: {
        borderWidth: 2,
        padding: 15,
        marginBottom: 10,
        borderColor: 'gold',
        backgroundColor: 'red'
    },
    homebutton2: {
        borderWidth: 2,
        padding: 15,
        marginBottom: 10,
        borderColor: 'gold',
        backgroundColor: 'blue'
    },
})
