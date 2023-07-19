import { useState } from "react";
import CalendarDays from "../CalendarDays/CalendarDays";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const BookingCalendar = () => {
    const [currentDay, setCurrentDay] = useState(new Date());

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number))
    }

    const nextDay = () => {
        const tomorrow = new Date (currentDay.setDate(currentDay.getDate()+7))
        setCurrentDay(tomorrow);
    };

    const prevDay = () => {
        const yesterday = new Date (currentDay.setDate(currentDay.getDate()-7))
        setCurrentDay(yesterday);
    };


    return(
        <div className="booking-calendar">
            <div className="booking-calendar-header">  
                <ArrowBackIosIcon onClick={prevDay}/>
                <h3>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h3>
                <ArrowForwardIosIcon onClick={nextDay}/>
            </div>
            <div className="booking-calendar-body">
                <div className="table-header">
                    {
                        
                        weekdays.map((weekday, index) => {
                            return <div className="weekday">
                                    <p className="weekday-title">{weekday}</p>
                                    <p>{new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + index).getDate()}</p>
                                </div>
                        })
                    }
                </div>
                
                <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay}/>
                
            </div>
        </div>

    )
}

export default BookingCalendar;