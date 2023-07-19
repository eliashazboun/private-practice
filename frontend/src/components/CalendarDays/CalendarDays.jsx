import { useState } from "react";

const CalendarDays = (props) => {
    const [active, setActive] = useState('');

    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
    let times = [];

    // This will come from availabilty when set
    const start_time = 10
    const end_time = 23

    for(let hour = 8; hour < 21; hour++){
        let time_obj = {
            hour:hour,
            time: ""
        }

        if(hour === 12){
            let time = `${hour}:00 PM`
            time_obj.time = time;
            times.push(time_obj)
        }else if(hour === 24){
            let time = `${hour-12}:00 AM`
            time_obj.time = time;
            times.push(time_obj)
        }
        else if(hour > 12){
            let time = `${hour-12}:00 PM`
            time_obj.time = time;
            times.push(time_obj)
        }else{
            let time = `${hour}:00 AM`
            time_obj.time = time;
            times.push(time_obj)
        }
    }



    for (let day = 0; day < 7; day++){
        if (day === 0 && weekdayOfFirstDay === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate());
        }else if (day === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        }else{
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay);

    };

    const handleClick = (event) => {
        console.log(active)
        console.log(event.target.id)
        setActive(event.target.id);
    }


    return (
        <div className="table-content">
            {
                currentDays.map((day, i) => {
                    return(
                        <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}>
                            {times.map((time,j) => {
                                return(
                                    <button
                                    id={`${i}-${j}`}
                                    onClick={handleClick}
                                    className={"calendar-day-button " + (time.hour >= start_time && time.hour <= end_time ? "calendar-day-button-enabled" : "calendar-day-button-disabled" + (active === `${i}-${j}` ? '-active' : '')  )}>{time.time}</button>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CalendarDays;