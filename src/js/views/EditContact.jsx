import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactForm from '../components/ContactForm.jsx';

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const foundContact = store.listContacts.find(contact => String(contact.id) === id);
        if (foundContact) {
            setContact(foundContact);
        }
    }, [id, store.listContacts]);

    const handleSubmit = (updatedContact) => {
        actions.editContact(id, updatedContact);
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center">Edit Contact</h1>
            {contact ? (
                <ContactForm initialValues={contact} onSubmit={handleSubmit} buttonLabel="Update Contact" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditContact;
