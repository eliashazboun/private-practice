import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./EditAppointment.scss";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { formatTime } from "../../helpers/formatTime";
import { formatDate } from "../../helpers/formatDate";
import { deletePopup } from "../../helpers/deletePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";

const EditAppointment = ({ data, change, slotSelect, gotoDate, editEvent, handleEditClose, deleteAppointments, dateChange }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [date, setDate] = useState(null);

    const handleStartTimeChange = (e) => {
        setStartTime(e);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e);
    };

    const handleDateChange = (e) => {
        if (e) {
            if (e.$D) {
                gotoDate(new Date(e.$d));
                slotSelect(new Date(e.$d.toDateString()));
                dateChange(e);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/appointments/${data.id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                deleteAppointments(data.id);
                handleEditClose(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUbmit", date);

        let start_time;
        let end_time;

        const gap = endTime.hour() - startTime.hour();
     
        if (gap + startTime.hour() > 22 || gap < 0) {
            const newEnd = dayjs(endTime).set("hour", 22).set("minute", 0).set("day", dayjs(startTime).get("day"));
            const newStart = dayjs(startTime)
                .set("hour", 22 - gap)
                .set("minute", 0)
                .set("day", dayjs(startTime).get("day"));
            start_time = new Date(newStart);
            end_time = new Date(newEnd);
        } else {
            start_time = new Date(startTime);
            end_time = new Date(endTime);
        }

        if (start_time.getHours() - end_time.getHours() > 0) {
            toast.error("Time error", {
                position: "top-center",
            });
            return;
        }

        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                start_time: formatTime(start_time),
                end_time: formatTime(end_time),
                date: formatDate(date),
            }),
        };
        try {
            const response = await fetch(`http://localhost:4000/api/appointments/${data.id}`, requestOptions);
            if (response.ok) {
                editEvent(data.id, start_time, end_time);
                handleEditClose();
            } else {
                toast.error("Overlap in appointment times!", {
                    position: "top-center",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setStartTime(dayjs(data.start));
        setEndTime(dayjs(data.end));
        setDate(dayjs(data.start));
    }, [data]);

    useEffect(() => {
        if (change) {
            setStartTime(dayjs(change.start));
            setEndTime(dayjs(change.end));
            setDate(dayjs(change.start));
        }
    }, [change]);

    return (
        <div className="editAppointment">
            <CloseIcon className="close" onClick={handleEditClose} />
            <ToastContainer />
            <h2>Editing Appointment for {data.title}</h2>
            <div className="wrapper">
                <ToastContainer />
                <form className="form" onSubmit={handleSubmit}>
                    <div className="even-columns">
                        <div className="left">
                            <h2>Old</h2>
                            <TimePicker disabled={true} label='Old Start Time'  value={dayjs(data.start)} className="picker"/>

                            <TimePicker disabled={true} label='Old End Time'  value={dayjs(data.end)} className="picker" />

                            <DatePicker disabled={true} label='Old Date' value={dayjs(data.start)} className="picker" />
                        </div>
                        <div className="right">
                            <h2>New</h2>
                            <TimePicker required label="New Start Time" value={startTime} minutesStep={30} onChange={handleStartTimeChange} skipDisabled={true} className="picker" slotProps={{ textField: { required: true } }} />

                            <TimePicker required label="New End Time" value={endTime} onChange={handleEndTimeChange} skipDisabled={true} className="picker" slotProps={{ textField: { required: true } }} />

                            <DatePicker required label="New Date" value={date} onChange={handleDateChange} className="picker" slotProps={{ textField: { required: true } }} />
                        </div>
                    </div>

                    <button className="button-green" type="submit">
                        Submit Changes
                    </button>
                    <button className="button-red" type="button" onClick={() => deletePopup(handleDelete, "Appointment for " + data.title)}>
                        Delete Appointment
                    </button>
                    <button className="button-blue" type="button" onClick={handleEditClose}>
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAppointment;
