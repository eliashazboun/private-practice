import React, { useEffect, useState } from "react";
import "./AdminDashView.scss";

import Clients from "../../pages/Clients";
import Profile from "../../pages/Profile";
import Calendar from "../../pages/Calendar/Calendar";
import { formatTime } from "../../helpers/formatTime";
import { formatDate } from "../../helpers/formatDate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDash from "../../pages/AdminDash/AdminDash";

const AdminDashView = ({ selected, allClients }) => {
    const [view, setView] = useState(selected);
    const [clientId, setClientId] = useState("none");
    const [allAppointments, setAllAppointments] = useState();

    const editAppointments = (id, start, end) => {
        setAllAppointments(
            allAppointments.map((appointment) => {
                if (appointment._id === id) {
                    return {
                        ...appointment,
                        start_time: formatTime(start),
                        end_time: formatTime(end),
                        date: formatDate(start),
                    };
                } else {
                    return appointment;
                }
            })
        );
    };

    const addAppointments = (appointment) => {
        toast("Appointment Created!", {
            position: "top-center",
            type: "success",
        });
        setAllAppointments((appointments) => [...appointments, appointment]);
    };

    const deleteAppointments = (id) => {
        toast("Appointment Deleted!", {
            position: "top-center",
            type: "success",
        });
        const filtered = allAppointments.filter(
            (appointment) => appointment._id !== id
        );
        setAllAppointments(filtered);
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch("/api/appointments");
            if (response.ok) {
                const json = await response.json();
                setAllAppointments(json);
            } else {
                alert("Something went wrong with fetching appointments");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setView(selected);
    }, [selected]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="adminDashView">
            <ToastContainer />
            {(() => {
                switch (view) {
                    case "client":
                        return (
                            <Clients
                                setView={setView}
                                setClientId={setClientId}
                                allClients={allClients}
                            />
                        );
                    case "appointment":
                        return (
                            <Calendar
                                allClients={allClients}
                                allAppointments={allAppointments}
                                editAppointments={editAppointments}
                                addAppointments={addAppointments}
                                deleteAppointments={deleteAppointments}
                            />
                        );
                    case "video":
                        return <h1>Video</h1>;
                    case "profile":
                        return (
                            <Profile clientId={clientId} setView={setView} />
                        );
                    default:
                        return allAppointments && <AdminDash allAppointments={allAppointments} />;
                }
            })()}
        </div>
    );
};

export default AdminDashView;
