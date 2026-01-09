
export function MainView(props){
    //Functions

    return(

        <div style = {{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', // Optional: makes the container fill the viewport height
            textAlign: 'center', // Ensures text alignment
        }}>
            <p className="headlineStyle">GROUP GAMES</p>

            <div className="sideBarBoxStyle">

                <p>Here we will show games in progress</p>

            </div>

            <button className = "buttonStyle">
                Start new group game
            </button>

            <button className = "buttonStyle"
                    onClick={()=> window.location.hash = "#/game"}
            >
                Train your skills
            </button>
            


        </div>

    )


}