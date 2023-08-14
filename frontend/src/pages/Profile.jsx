import { useEffect, useState } from "react";
import TabSelector from "../components/TabSelector/TabSelector";

import ProfileTab from "../components/ClientTabs/ProfileTab/ProfileTab";
import MessagesTab from "../components/ClientTabs/MessagesTab/MessagesTab";
import AppointmentsTab from "../components/ClientTabs/AppointmentsTab/AppointmentsTab";
import RecordsTab from "../components/ClientTabs/RecordsTab/RecordsTab";
import BillingTab from "../components/ClientTabs/BillingTab/BillingTab";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderIcon from "@mui/icons-material/Folder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ClipLoader from "react-spinners/ClipLoader";

import "./Profile.scss";
import useFetch from "../hooks/useFetch";

const Profile = ({ setView, clientId }) => {
  const { data: client, isLoading } = useFetch(`api/clients/${clientId}`);

  const tabs = [
    {
      title: "Profile",
      icon: <AccountBoxIcon />,
      view: <ProfileTab />,
    },
    {
      title: "Messages",
      icon: <EmailIcon />,
      view: <MessagesTab />,
    },
    {
      title: "Appointments",
      icon: <CalendarMonthIcon />,
      view: <AppointmentsTab />,
    },
    {
      title: "Records",
      icon: <FolderIcon />,
      view: <RecordsTab />,
    },
    {
      title: "Billing",
      icon: <AttachMoneyIcon />,
      view: <BillingTab />,
    },
  ];

  return (
    <div className="profile">
      {isLoading ? (
        <ClipLoader loading={isLoading} size={150} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <>
          <div className="top">
            <ArrowBackIcon
              className="backArrow"
              onClick={() => {
                setView("client");
              }}
            />
            <div className="heading">
              {isLoading ? (
                "loading"
              ) : (
                <p>
                  {client.first_name} {client.last_name}{" "}
                </p>
              )}
            </div>
          </div>
          <TabSelector isLoading={isLoading} client={client} tabs={tabs} />
        </>
      )}
    </div>
  );
};

export default Profile;
