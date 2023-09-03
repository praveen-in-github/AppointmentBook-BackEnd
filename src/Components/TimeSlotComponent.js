
import "./TimeSlotComponent.css"
import { useRef } from "react";import { useState } from "react";


export   function showCreateComponent({date,time}){
    return(
        <div>
        <div className="element-group">
            <input type="text" placeholder="subject for Appointment"/>
        </div>

        </div>
    )
}


export default function TimeSlotComponent({selectedDate,existingSlots}){
    let height=50;
    let bookedSlots=[]
    

    function slotClicked(event,id){
        console.log(event)
    }
    function bookedSlotClicked(index){    
        console.log("slot button Clicked")
    }
    for(let i=0;i<existingSlots.length;i++){
        let slot=existingSlots[i];
        let start=new Date(slot.AppointmentStartDate)
        let close=new Date(slot.AppointmentEndDate)
        console.log(slot);
        if(start.getFullYear()==selectedDate.getFullYear() && start.getDate()==selectedDate.getDate() && start.getMonth()==selectedDate.getMonth()){
            let shours=start.getHours();let sminutes=start.getMinutes();
            let chours=close.getHours();let cminutes=close.getMinutes();
            let ele_top=(shours*height)+((50/60) *sminutes );
            let ele_height=(((chours-shours)*60+(cminutes-sminutes))*50)/60;
            console.log(ele_top," ",ele_height)
            bookedSlots.push(
                <div className="booked-slot" style={{top:ele_top+"px",height:ele_height+"px",left:0+"px"}} onClick={()=>bookedSlotClicked(i)}>{slot.subject}</div>
            )

        }
    }


    let timesJSX=[];
    const[ showCreationForm,setShowCreationForm]=useState(false);
    for(let i=0;i<23;i++){
        timesJSX.push(<div className="hour-label">
            {parseInt(i%12) == 0?12:parseInt(i%12)}{i/12 > 1 || i==12 ? "PM":"AM"}
        </div>)
    }

    let slotsJSX=[];
    for(let i=0;i<23;i++){
        slotsJSX.push(<div className="hour-slot" onClick={(event)=>slotClicked(event,i)}>
        </div>)
    }
    return (
        <div className="container">
            <div className="hours-labels">{timesJSX}</div>
            <div className="hours-slots">{slotsJSX}
                
               {bookedSlots}
            </div>
            {
                showCreationForm 
            }
        </div>
    )
}