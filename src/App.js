import { useEffect, useState } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Task } from './models';
import { Button, Card, CardActionArea, CardActions, CardContent, TableCell, TableContainer, TableRow } from '@material-ui/core';


function App() {
    const [taskList, setTaskList] = useState([]);

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

    useEffect(() => {
        //createTask();
        getTasks();
    }, []);

    return (
        <Card>
            <CardActions>
                <Button variant="outlined" onClick={createTask}>New</Button>
                <Button variant="outlined" onClick={deleteAll}>Delete All</Button>
            </CardActions>
            <CardContent>
                <TableContainer>
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
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default App;