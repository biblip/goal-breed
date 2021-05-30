import logo from './logo.svg';
import './App.css';

import { DataStore } from '@aws-amplify/datastore';
import { Book } from './models';
import { useEffect } from 'react';

function App() {

    async function getBooks() {
        const models = await DataStore.query(Book);
        console.log(models);
    }

    async function createBook() {
        await DataStore.save(
            new Book({
                "title": "Titulo 3",
                "description": "Description 3",
                "price": 30000
            })
        );
    }

    useEffect(() => {
        //createBook();
        getBooks();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
        </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>
        </div>
    );
}

export default App;
