import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import "../style/structure.css"

export function LoginView(props){

    let content; 

      content = (
        <div>
          <div
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '16px', 
              textAlign: 'center',
              width: 'auto' 
              }}
          >

              <h1 className="header">Welcome to<br />QUIZQUEEN</h1>
              <GoogleLoginButton 
              type = "light"
              style = {{
                borderRadius: '8px', // Correctly styled camelCase property
                padding: '10px 20px', // Optional: adds padding for better visuals
                fontSize: '16px', // Optional: adjusts the font size
                width: '240px'
              }}
                onClick={props.googleLogin}>Sign in with Google</GoogleLoginButton>
              <FacebookLoginButton 
              style = {{
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '16px',
                width: '240px',
                backgroundColor: '#d3d3d3', // Optional: dim the color to indicate it's disabled
                cursor: 'not-allowed', // Optional: change cursor style to indicate it's disabled
                pointerEvents: 'none', // Disable all interaction
              }}
              onClick={null} //props.facebookLogin
              disabled={true} >Sign in with Facebook (will be implemented)</FacebookLoginButton>

              <div className = "headlineStyle">
                OR
              </div>

              <button 
              style = {{
                borderRadius: '8px', 
                padding: '10px 20px', 
                fontSize: '16px', 
                width: '240px',
              }}
              onClick={playTrainingGameACB}
             >Play without signing in</button>
          </div>

          <div>
            {props.error && (       //&& means "if statement on the left is truthy the statement on the right will show"
            <p style={{ color: 'black', marginTop: '10px' }}>
            {props.error}
            </p>
            )}
          </div>

        </div>
            
            
        );

    return (
      <div
        style = {{
          display: "flex",
          justifyContent: "center", /* Horizontal alignment */
          alignItems: "center", /* Vertical alignment */
          height: "100vh", /* Full viewport height for centering */
        }}
      >
        {content}
      </div>

    )

    function playTrainingGameACB(){
      props.onPlayTrainingGame();
      window.location.hash = "#/game";
    }
}  
