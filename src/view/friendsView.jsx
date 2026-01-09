import "../style/structure.css"
import { useState } from 'react';

export function FriendsView(props){

    const [friends, setFriends] = useState(props.user.friends || []); // Initialize state with user friends

    function showFriends(){
        return props.user.friends.map( f => {return(


        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }} key={f.id}>
            <button
                className="buttonRemoveFriend"
                onClick={() => removeFriend(f.id)}
            >
                ✖
            </button>
            <span style={{ fontSize: "20px", paddingLeft: "5px", paddingRight: "5px" }}>❤️</span>
            {f.name}
        </div>

        ) })
    }

    function removeFriend(friendID) {
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendID)); // Update the state in view
        props.removeFriend(friendID);       // Remove friend from user, update backend
    }

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', // Optional: makes the container fill the viewport height
            textAlign: 'center', // Ensures text alignment
            }}>
            <p className = "headlineStyle" >WELCOME</p>
            <img src = {props.user.profilePicture} height = "80" style={{borderRadius: "50%", objectFit: "cover"}}/>
            <p className = "headlineStyle" >{props.user.name}</p>

            <div className = " sideBarBoxStyle">

                <div style={{ display: "flex", justifyContent: "flex-end" }}> 
                    <button onClick = {() => {
                        window.location.hash = "#/searchView"; // Updates the hash to navigate
                        props.resetSearch()
                    }}> Add </button>
                </div>
                <div style={{  display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <p  >Your friends: </p>
                    <span>{props.user.friends && props.user.friends.length > 0 ? showFriends() : "No friends added yet"}</span>
                </div>
            </div>

            <button 
                type = "light"
                style = {{
                    marginTop: "20",
                    borderRadius: '8px', // Correctly styled camelCase property
                    padding: '10px 20px', // Optional: adds padding for better visuals
                    fontSize: '16px', // Optional: adjusts the font size
                    border: '1px solid #ccc', // Optional: gives a subtle border
                }}
                onClick={() => props.logout()}>Sign out
            </button>
        </div>

    
    
)
    
}
