import React, { createContext, useState } from "react";
import "./ProfileTab.scss";
import ContentBox from "../../ContentBox/ContentBox";
import ContentRow from "../../ContentBox/ContentRow";
import ContentItem from "../../ContentBox/ContentItem";
import { getAge } from "../../../helpers/getAge";
import ModalContact from "../../Modal/ModalViews/ModalContact";
import ModalEmergencyContct from "../../Modal/ModalViews/ModalEmergencyContct";

export const IdContext = createContext();

const ProfileTab = ({ client }) => {
    const { _id: id } = client;

    const [currentClient, setCurrentClient] = useState(client);

    const handleChange = (modifiedClient) => {
        setCurrentClient(modifiedClient);
    };

   

    const birthday = new Date(currentClient.birthday).toLocaleDateString();
    const age = getAge(birthday);

    return (
        <div className="profileTab">
            <IdContext.Provider value={id}>
                <ContentBox heading={"Personal Information"}>
                    <ContentRow>
                        <ContentItem value={birthday} label="Birthday" />
                        <ContentItem value={age} label="Age" />
                        <ContentItem value={currentClient.gender} label="Gender" />
                        <ContentItem value={"Single"} label="Marital Status" />
                    </ContentRow>
                    <ContentRow>
                        <ContentItem value={"Employed"} label="Employment" />
                        <ContentItem value={"[pronouns here]"} label="Pronouns" />
                        <ContentItem value={"English"} label="Preferred Language" />
                        <ContentItem value={"Bachelors"} label="Education Level" />
                    </ContentRow>
                </ContentBox>
                <ContentBox
                    addButton={true}
                    heading={"Phones and Emails"}
                    boxId={"Contact"}
                    buttonLabel={""}
                    renderItem={(handleShow) => {
                        return <ModalContact handleChange={handleChange} handleShow={handleShow} />;
                    }}
                >
                    {currentClient &&
                        currentClient.phone &&
                        currentClient.phone.map((item, index) => {
                            return (
                                <ContentRow boxId={'Contact'} edit={true} del={true} copy={true} value={item} handleChange={handleChange} rowId={"phone"} key={index}>
                                    <ContentItem value={item} label={"Mobile"} />
                                </ContentRow>
                            );
                        })}

                    <ContentRow boxId={'Contact'} edit={true} del={false} copy={true} value={currentClient.username} handleChange={handleChange} rowId={"username"}>
                        <ContentItem value={currentClient.username} label={"Primary Email"} />
                    </ContentRow>

                    {currentClient &&
                        currentClient.email &&
                        currentClient.email.map((item, index) => {
                            return (
                                <ContentRow boxId={'Contact'} edit={true} del={true} copy={true} value={item} handleChange={handleChange} rowId={"email"} key={index}>
                                    <ContentItem value={item} label={"Email"} />
                                </ContentRow>
                            );
                        })}
                </ContentBox>

                <ContentBox
                    addButton={true}
                    heading={"Emergency Contact"}
                    buttonLabel={""}
                    boxId={"Emergency"}
                    handleChange={handleChange}
                    renderItem={(handleShow) => {
                        return <ModalEmergencyContct handleChange={handleChange} handleShow={handleShow} />;
                    }}
                >
                    {currentClient &&
                        currentClient.emergency &&
                            currentClient.emergency.map((item,index) => {
                                return (
                                    <ContentRow rowId={'emergency'} handleChange={handleChange} value={item} boxId={'Emergency'} key={index} del={true}>
                                        <ContentItem value={item.firstName + ' ' + item.lastName} label={"Name"} />
                                        <ContentItem value={item.relationship} label={"Relationship"} />
                                        <ContentItem value={item.phone} label={"Phone"} />
                                    </ContentRow>
                                )
                            })}
                    
                </ContentBox>
            </IdContext.Provider>
        </div>
    );
};

export default ProfileTab;
