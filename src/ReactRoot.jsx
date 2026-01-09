import { observer } from "mobx-react-lite";
import { Game } from "./presenter/gamePresenter.jsx";
import { Login } from "./presenter/loginPresenter.jsx";
import { Search } from "./presenter/searchPresenter.jsx";
import { Friends } from "./presenter/friendsPresenter.jsx";
import { Main } from "./presenter/mainPresenter.jsx";


import {  createHashRouter,  RouterProvider, useParams} from "react-router-dom";

function SplitScreenLayout({left, right}){
    return(
            <div className = "parentStyle">
                <div className="sideBarStyle">
                    {left}
                </div>
                <div className="rightViewStyle">
                    {right}
                </div>
            </div>
    )
}

export function makeRouter(props){
  return createHashRouter([
    {
        path: "/", 
        element: <Login loginModel = {props.loginModel} model = {props.model}/>
    },
    
    {

        path: "/searchView",
        element:(
            <SplitScreenLayout 
            left = {<Search loginModel = {props.loginModel} model = {props.model}/>} 
            right = {<Main model = {props.model}/>}
            />
        )
         
    },

    {
        path: "/friendsView",
        element:(
            <SplitScreenLayout 
            left = {<Friends loginModel = {props.loginModel} model = {props.model}/>} 
            right = {<Main model = {props.model}/>}
            />
        )
    },

    {
        path: "/game", 
        element: (
        <Game model = {props.model}/>

        )
    }
  ])

}

const ReactRoot = observer(
    function ReactRoot(props){       
        return (<div>
                <RouterProvider router={makeRouter(props)} />
                </div>
            );
    }

)

export { ReactRoot }