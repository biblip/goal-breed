//@ts-check

import { useEffect, useState } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Task } from './models';
import { Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        AssessLoggedInState();
    }, []);

    const AssessLoggedInState = () => {
        Auth.currentAuthenticatedUser().then(() => {
            setIsAuthenticated(true);
        }).catch(() => {
            setIsAuthenticated(false);
        })
    }
    
    /*
    Amplify.configure({
        ...awsconfig,
        aws_appsync_authenticationType: isAuthenticated ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    });
    */

    async function getTasks() {
        const models = await DataStore.query(Task);
        setTaskList(models);
    }

    async function createTask(e) {
        const nm = Math.floor(Math.random() * 10000);
        await DataStore.save(
            new Task({
                "title": "Tarea " + nm,
                "description": "Description " + nm,
                "status": "sin terminar"
            })
        );
        getTasks();
    }

    async function deleteAll(e) {
        await DataStore.delete(Task, Predicates.ALL)
        getTasks();
    }

    const signIn  = async () => {
        try {
            //const user = await Auth.signIn("user1@cuplease.com","mmmm3333");
            await Auth.signIn("user1@cuplease.com","mmmm3333");
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Error signing in ', error);
        }
    }

    const signOut = async() => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
        } catch (error) {
            console.log('error signing out ', error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Card>
            <CardActions>
                <Button variant="outlined" onClick={createTask}>New</Button>
                <Button variant="outlined" onClick={deleteAll}>Delete All</Button>
                {
                    isAuthenticated ? <Button variant="outlined" onClick={signOut}>Sign Out</Button>
                    :
                    <Button variant="outlined" onClick={signIn}>Sign In</Button>
                }                
            </CardActions>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableBody>
                        {
                            taskList.map( (item, index) => 
                                <TableRow key={index}>
                                    <TableCell>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>
                                        {item.title}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        {item.status}
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default App;