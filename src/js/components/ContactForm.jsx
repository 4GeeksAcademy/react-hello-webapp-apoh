import React, { useState, useEffect } from "react";

const ContactForm = ({ initialValues = {}, onSubmit, buttonLabel }) => {
    const [name, setName] = useState(initialValues.name || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [phone, setPhone] = useState(initialValues.phone || "");
    const [address, setAddress] = useState(initialValues.address || "");

    useEffect(() => {
        setName(initialValues.name || "");
        setEmail(initialValues.email || "");
        setPhone(initialValues.phone || "");
        setAddress(initialValues.address || "");
    }, [initialValues]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
            alert("All fields are required");
            return;
        }
        onSubmit({ name, email, phone, address });
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">{buttonLabel}</button>
        </form>
    );
};

export default ContactForm;
