import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx"
import { model } from "./model/TriviaModel.js"
import { observable, configure, reaction } from "mobx";
import { firebaseModel , connectToFirebase} from "../firebaseModel.js";

    

const reactiveModel =  observable(model)

const reactiveLoginModel = observable(firebaseModel)

createRoot(document.getElementById('root'))
    .render(<ReactRoot model = {reactiveModel} loginModel = { reactiveLoginModel}/>);  // here we want to render our model when we have one 

// making the model available at the console
window.myModel= reactiveModel; 

connectToFirebase(reactiveModel, reaction);
