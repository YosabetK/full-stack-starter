import {useState} from 'react';

function Countdown({seconds}) {
const [secondsRemaning, setSecondsRemaing] = useState(0);
function onStart() {
    const startTime= new Date();
    setSecondsRemaing(seconds);
    const intervalid = setInterval(function(){
        const now = new Date();
        const timeElapsed=now.getTime() - startTime.getTime();
        const timeRemaining = Math.round(seconds - timeElapsed/1000);
        if (timeRemaining<=0){
            clearInterval(intervalid);
            setSecondsRemaing(0);
        }
        else{
            setSecondsRemaing(timeRemaining);
        }

        
    }, 1000);
}
return (
    <div>
        <p> Countdown {seconds} seconds</p>
        {secondsRemaning === 0 && (
            <button type="button" onClick={onStart}>Start!</button>
        )}
        {secondsRemaning >0 && (
            <div>{secondsRemaning} seconds remaining!</div>
        )}
    </div>
);
}
export default Countdown;