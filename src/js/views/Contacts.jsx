import React, { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.jsx";

const Contacts = () => {
    const { store, actions } = useContext(Context);

    
    useEffect(() => {
        actions.getInfoContacts();
    }, []);

    useEffect(() => {
        console.log("🔄 Lista de contactos actualizada:", store.listContacts);
    }, [store.listContacts]);  

    return (
        <div className="w-75 mx-auto">
            <div className="d-flex justify-content-end">
                <Link to="/AddContact">
                    <button className="btn btn-success">Add New contact</button>
                </Link>
            </div>
            <ul className="list-group mt-3">
                {store.listContacts && store.listContacts.length > 0 ? (
                    store.listContacts.map((contact, index) => (
                        <CardContact contact={contact} key={index} />
                    ))
                ) : (
                    <li className="list-group-item text-center">No contacts available</li>
                )}
            </ul>
        </div>
    );
};

export default Contacts;
