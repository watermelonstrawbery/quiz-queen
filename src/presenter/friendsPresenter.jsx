import { observer } from "mobx-react-lite";
import { FriendsView } from "../view/friendsView";

const Friends = observer(

    function FriendsRender(props){

        // Logout Handler
        function handleLogoutACB(){
            props.loginModel.logout()
            window.location.hash = "/"
        }

        function handleResetSearchACB(){
            props.model.resetSearch()
        }

        function handleRemoveFriendACB(userID){
            props.model.removeFriend(userID)
        }

        return(
            <div>
                <FriendsView
                    user = {props.model.user}
                    resetSearch = {handleResetSearchACB}
                    logout = {handleLogoutACB}
                    removeFriend = {handleRemoveFriendACB}

                />
            </div>
        );
    }

);

export {Friends};