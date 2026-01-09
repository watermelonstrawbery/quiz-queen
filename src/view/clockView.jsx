import { useState, useEffect } from "react";
import {TimeBar} from "./timeBar.jsx";

export function ClockView(props) {
    var intervalId;
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const maxTime = 20;

    var timeLeft = 0;

    if(props.clockMode == 1){
        var timeLeft = maxTime - Math.floor((time.getTime() - props.startTime)/1000);

        if(timeLeft < 0){
            timesUpACB();
        }
    }

    return <div>The time is: {timeLeft}<br/>
    <TimeBar value={timeLeft} max={maxTime} />
    </div>;

    function timesUpACB(){
        props.onTimesUp();
    }
}
