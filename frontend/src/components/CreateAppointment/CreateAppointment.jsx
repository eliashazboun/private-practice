import React, { useState, useEffect } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { formatTime } from "../../helpers/formatTime";
import { formatDate } from "../../helpers/formatDate";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

import "react-toastify/dist/ReactToastify.css";

import "./CreateAppointment.scss";

const CreateAppointment = ({ data, allClients, slotSelect, gotoDate, addAppointments, handleCreateClose }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [date, setDate] = useState(null);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState({id: null, name: null,});

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
                setDate(e);
            }
        }
    };

    const handleClientSelect = (event, newValue) => {
        setSelectedClient({ id: newValue?.id, name: newValue?.label });
    };

    const formatClients = () => {
        allClients.forEach((client, index) => {
            const slot = {label: client.first_name + " " + client.last_name, id: client._id,};
            setClients((clients) => [...clients, slot]);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const start_time = new Date(startTime);
        const end_time = new Date(endTime);

        if (start_time.getHours() - end_time.getHours() > 0) {
            toast.error("Start time must be before end time.", {
                position: "top-center",
            });
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: selectedClient.name,
                date: formatDate(date),
                start_time: formatTime(start_time),
                end_time: formatTime(end_time),
                client_id: selectedClient.id,
            }),
        };

        try {
            const response = await fetch("http://localhost:4000/api/appointments", requestOptions);
            const res = await response.json();
            if (response.ok) {
                addAppointments(res);
                handleCreateClose();
            } else {
                toast("Overlap in appointments", {
                    type: "error",
                    position: "top-center",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setStartTime(dayjs(data.date));
        setEndTime(dayjs(data.date).add(1, "hour"));
        setDate(dayjs(data.date));
    }, [data]);

    useEffect(() => {
        formatClients();
    }, []);

    return (
        <div className="create-appointment">
            <CloseIcon className="close" onClick={handleCreateClose} />
            <h2>Create Appointment</h2>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form">
                    <TimePicker required label="Start Time" value={startTime} onChange={handleStartTimeChange} minutesStep={15} skipDisabled={true} className="picker" slotProps={{ textField: { required: true } }} />

                    <TimePicker required label="End Time" value={endTime} onChange={handleEndTimeChange} minutesStep={15} skipDisabled={true} className="picker" slotProps={{ textField: { required: true } }} />

                    <DatePicker required label="Date" value={date} onChange={handleDateChange} className="picker" slotProps={{ textField: { required: true } }} />

                    <Autocomplete disablePortal options={clients} renderInput={(params) => <TextField {...params} label="Client" required={true} />} onChange={handleClientSelect} />
                    <button className="button-green" type="submit" id="submit">
                        Create
                    </button>
                    <button className="button-red" type="button" onClick={handleCreateClose}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAppointment;
