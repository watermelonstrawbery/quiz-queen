import { observer } from "mobx-react-lite";
import { SearchView } from "../view/searchView";

const Search = observer(

    function searchRenderer(props){

        function queryChangeACB(query){
            props.model.setSearchQuery(query)
        }

        function searchFriendACB(){
            props.model.doSearch()
        }

        function handleAddFriendACB(newFriend){
            props.model.addFriend(newFriend)
        }

        function handleIsFriendAdded(user){
            if(props.model.user.friends.some(f => f.id === user.id)){
                console.log("Friend found")
                return true
            }
            return false
        }

        function handleLogoutACB(){
            props.loginModel.logout()
            window.location.hash = "/"
        }


        return (
            <div>

                <SearchView
                    user = {props.model.user}
                    
                    text = {props.model.searchQuery}
                    results = {props.model.searchResult}

                    isFriend = {handleIsFriendAdded}
                    logout ={ handleLogoutACB }
                    addFriend = { handleAddFriendACB }
                    onSearch = {searchFriendACB}
                    changeText = {queryChangeACB}
                />
            </div>
        );

        
    } 

);

export { Search }