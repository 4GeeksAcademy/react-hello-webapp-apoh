const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: []
        },
        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user", {
                    method: "POST",
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Failed to create user");
                        return response.json();
                    })
                    .then((data) => console.log("User created:", data))
                    .catch((error) => console.log("Error creating user:", error));
            },

            getInfoContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts", {
                    method: "GET"
                })
                    .then((response) => {
                        if (response.status === 404) {
                            getActions().createUser();
                            return null;
                        }
                        if (!response.ok) throw new Error("Failed to fetch contacts");
                        return response.json();
                    })
                    .then((data) => {
                        if (data) {
                            console.log("Contacts data received:", data);  
                            setStore({ listContacts: data.contacts });
                        } else {
                            setTimeout(() => getActions().getInfoContacts(), 1000);  
                        }
                    })
                    .catch((error) => console.log(error));
            },
            
            addContactToList: (contact) => {
                const store = getStore();
                setStore({ ...store, listContacts: [...store.listContacts, contact] });
            },

            createContact: (payload) => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Failed to create contact");
                        return response.json();
                    })
                    .then((data) => {
                        const actions = getActions();
                        actions.addContactToList(data);
                        console.log("Contact added:", data);
                    })
                    .catch((error) => console.log("Error adding contact:", error));
            },

            deleteContact: (id) => {
                const store = getStore();
                
                // Verificamos si el contacto existe en el store
                if (!store.listContacts.some(contact => contact.id === id)) {
                    console.log(`Contact with ID ${id} not found.`);
                    return;
                }
            
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Failed to delete contact");
            
                        
                        if (response.status === 204) {
                            console.log(`✅ Contact with ID ${id} deleted successfully`);
                            return null;
                        }
            
                        
                        return response.json();
                    })
                    .then(() => {
                        // Filtramos el contacto eliminado de la lista y actualizamos el store
                        const updatedContacts = store.listContacts.filter(contact => contact.id !== id);
                        setStore({ listContacts: updatedContacts });
                        

            
                        console.log(`Contact with ID ${id} deleted and list updated`);
                    })
                    .catch((error) => console.log("❌ Error deleting contact:", error));
            },
            
            
            editContact: (id, updatedContact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedContact),
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Failed to update contact");
                        return response.json();
                    })
                    .then(() => {
                        console.log(`✅ Contacto con ID ${id} actualizado correctamente`);
            
                        
                        const store = getStore();
                        const updatedList = store.listContacts.map(contact =>
                            contact.id === id ? { ...contact, ...updatedContact } : contact
                        );
                        setStore({ listContacts: updatedList });
            
                        
                        getActions().getInfoContacts();
                    })
                    .catch((error) => console.log("❌ Error al actualizar contacto:", error));
            }
            
            
        }
    };
};

export default getState;
