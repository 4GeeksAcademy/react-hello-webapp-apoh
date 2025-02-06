import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
       
        const contactId = String(id); 

        
        if (store.listContacts && store.listContacts.length > 0) {
            const contact = store.listContacts.find(contact => String(contact.id) === contactId); 
            console.log("Contacto encontrado:", contact);  

            if (contact) {
                setName(contact.name);
                setEmail(contact.email);
                setPhone(contact.phone);
                setAddress(contact.address);
            } else {
                console.log("Contacto no encontrado con el id:", contactId); 
            }
        } else {
            console.log("La lista de contactos aún no está disponible.");
        }
    }, [id, store.listContacts]); 

    const handleUpdate = () => {
        const updatedContact = {
            id,  
            name,
            email,
            phone,
            address
        };

        
        if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || address.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }

        actions.editContact(id, updatedContact); 
        navigate("/");  
    };

    return (
        <div className="container">
            <h1 className="text-center">Update Contact</h1>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formGroupExampleInput1" 
                        placeholder="Full name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}  
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="formGroupExampleInput2" 
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}  
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formGroupExampleInput3" 
                        placeholder="Enter phone" 
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone}  
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formGroupExampleInput4" 
                        placeholder="Enter address" 
                        onChange={(e) => setAddress(e.target.value)} 
                        value={address}  
                    />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                        Update Contact
                    </button>
                </div>
            </form>
            <Link to="/">Volver a Contacts</Link>
        </div>
    );
};

export default EditContact;

