import React , {useState, useEffect} from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
    },[count]) //only run if count changes

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    
    return !robots.length ?
        <h1 className = 'tc'>Loading...</h1> :
        (
            <div className ='tc'>
                <h1 className = 'f1'>Robofriends</h1>
                <button onClick={()=>setCount(count + 1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
 
}

export default App;