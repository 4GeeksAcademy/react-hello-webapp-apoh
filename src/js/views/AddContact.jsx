import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactForm from '../components/ContactForm.jsx';

const AddContact = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = (newContact) => {
        actions.createContact(newContact);
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center">Add New Contact</h1>
            <ContactForm initialValues={{}} onSubmit={handleSubmit} buttonLabel="Add Contact" />
        </div>
    );
};

export default AddContact;
