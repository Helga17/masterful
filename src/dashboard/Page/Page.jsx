import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {

    let [actors, setActors] = useState([]);
    let [actorStore, setActorStore] = useState([]);
    let [flag, setFlag] = useState(false);
    let [isToggleOn, setIsToggleOn] = useState(false);

    useEffect(() => {
        axios.get('https://60781db4e7f4f50017183c27.mockapi.io/api/actors')
            .then(result => {
                const actorsData = result.data;
                setActors(actorsData);
                setActorStore(actorsData);
            });
    }, []);

    let actorElements = actors.map(actor => {
        return (
            <tr key={actor.id}>
                <td>{actor.id}</td>
                <td>{actor.name}</td>
                <td>{actor.createdAt}</td>
                <td>{actor.avatar}</td>
                <td>{actor.rating}</td>
            </tr>
        );
    })

    
    function handleRating() {
        const clonedActors = [...actorStore];
        const stateFlag = !flag;
        setFlag(stateFlag);

        let filteredActors = clonedActors.sort(function (a, b) {
            if (stateFlag) {
                return a.rating - b.rating;
            }
            else {
                return b.rating - a.rating;
            }
        })
        setActors(filteredActors);
    }


    function handleClick() {
        const clonedActors = [...actors];
        let filteredActors = clonedActors.filter(function (actor) {
            return actor.name.charAt(0) === 'K';
        });
        setActors(filteredActors);
    };

    function handleMax() {
        const clonedActors = [...actors];
        let findMax = Math.max(...clonedActors.map(item => item.rating));
    }

    function handleMin() {
        const findMin = Math.min.apply(Math, actors.map(actor => actor.rating));
        
        setActors(findMin);
    }

    
    const inputChange = (event) => {
        const query = event.target.value.toLowerCase();
        const filteredActors = actorStore.filter(function (actor) {
            return actor.name.toLowerCase().includes(query);
        });
     
        setActors(filteredActors);
    };

    return (
        <div>
            <button onClick={() => handleClick()}>Sort</button> <br/><br/>
            <button onClick={() => handleMax()}>Max</button><br/><br/>
            <button onClick={() => handleMin()}>Min</button><br/><br/>
            <button onClick={() => handleRating()}>Rating</button><br/><br/>
            <input type="text" placeholder="Search" onChange={inputChange}  name="search"
            style={{width: "400px", border:"1px solid", padding:"10px"}}/>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>created</th>
                        <th>avatar</th>
                        <th onClick={() => handleRating()} style={{cursor: "pointer"}}>{flag ? '>' : '<'} rating</th>
                    </tr>
                </thead>
                <tbody>
                    {actorElements}
                </tbody>
                
            </table>
        </div>

    );
}

export default Page;