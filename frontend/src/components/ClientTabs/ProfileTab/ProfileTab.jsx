import React, { createContext, useEffect, useState } from "react";
import "./ProfileTab.scss";
import ContentBox from "../../ContentBox/ContentBox";
import ContentRow from "../../ContentBox/ContentRow";
import ContentItem from "../../ContentBox/ContentItem";
import { getAge } from "../../../helpers/getAge";

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
                        <ContentItem
                            value={currentClient.gender}
                            label="Gender"
                        />
                        <ContentItem value={"Single"} label="Marital Status" />
                    </ContentRow>
                    <ContentRow>
                        <ContentItem value={"Employed"} label="Employment" />
                        <ContentItem
                            value={"[pronouns here]"}
                            label="Pronouns"
                        />
                        <ContentItem
                            value={"English"}
                            label="Preferred Language"
                        />
                        <ContentItem
                            value={"Bachelors"}
                            label="Education Level"
                        />
                    </ContentRow>
                </ContentBox>

                <ContentBox
                    heading={"Phones and Emails"}
                    addButton={true}
                    boxId={"contact"}
                    handleChange={handleChange}
                >
                    {currentClient &&
                        currentClient.phone &&
                        currentClient.phone.map((item, index) => {
                            return (
                                <ContentRow
                                    edit={true}
                                    del={true}
                                    copy={true}
                                    value={item}
                                    handleChange={handleChange}
                                    rowId={"phone"}
                                    key={index}
                                >
                                    <ContentItem
                                        value={item}
                                        label={"Mobile"}
                                    ></ContentItem>
                                </ContentRow>
                            );
                        })}

                    <ContentRow
                        edit={true}
                        del={false}
                        copy={true}
                        value={currentClient.username}
                        handleChange={handleChange}
                        rowId={"username"}
                    >
                        <ContentItem
                            value={currentClient.username}
                            label={"Primary Email"}
                        />
                    </ContentRow>

                    {currentClient &&
                        currentClient.email &&
                        currentClient.email.map((item, index) => {
                            return (
                                <ContentRow
                                    edit={true}
                                    del={true}
                                    copy={true}
                                    value={item}
                                    handleChange={handleChange}
                                    rowId={"email"}
                                    key={index}
                                >
                                    <ContentItem value={item} label={"Email"} />
                                </ContentRow>
                            );
                        })}
                </ContentBox>

                <ContentBox
                    heading={"Emergency Contact"}
                    addButton={true}
                    buttonLabel={"Contact"}
                    boxId={"emergency"}
                >
                    <ContentRow edit={true} del={true}>
                        <ContentItem value={"252-333-4102"} label={"Mobile"} />
                        <ContentItem
                            value={"Type of contact"}
                            label={"Relationship"}
                        />
                    </ContentRow>
                </ContentBox>
            </IdContext.Provider>
        </div>
    );
};

export default ProfileTab;
