import {MainView} from "../view/mainView"
import { observer } from "mobx-react-lite";


const Main = observer(

    function MainRender(props){


        return(
            <MainView/>
        )
    }

);

export {Main}