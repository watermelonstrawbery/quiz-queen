import "../style/structure.css"
import { useState } from 'react';


export function SearchView(props){

    function handleKeyDownACB(evt) {
        if (evt.key === "Enter") {  // Trigger the search also when Enter is pressed
            props.onSearch(); 
        }
    }


    function showResult(){
        const [disabledButtons, setDisabledButtons] = useState([]);

        const handleAddFriend = (r) => {
            props.addFriend(r);
            setDisabledButtons((prev) => [...prev, r.id]); // Set button in list of disabled buttons
        };

        return props.results.map( r => {
            const isDisabled = disabledButtons.includes(r.id) || props.isFriend(r); // Flag as disabled if already in the disabled list or a friend
            
            return(
                <div key={r.id} style={{ display: "flex", alignItems: "center" }}>
                    <button
                    className="buttonAddFriend"
                    disabled={isDisabled}                     
                    onClick={() => handleAddFriend(r)}
                    > 👤➕</button>
                    <span style={{ paddingLeft: "10px" }}>{r.name}</span>
                </div>
            )
        })
    }


    return(

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

            <div className = "sideBarBoxStyle">
                
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <button onClick={() => (window.location.hash = "/friendsView")}>
                        Back
                    </button>
                </div>

                <div>
                    <input 
                    type="text" 
                    placeholder="Search for friends.." 
                    style={{ padding: '10px', fontSize: '16px', margin: '10px 10px 10px 0' }} 
                    value = {props.text || ""} 
                    onChange={(evt) => props.changeText(evt.target.value)} 
                    onKeyDown={handleKeyDownACB}
                    />
                    <button onClick = {() => props.onSearch()}> Search </button>
                </div>

                <div>
                    {props.results && props.results.length > 0 && showResult()}
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
                onClick={() => props.logout()}>Sign out</button>
        </div>
    ) 

}