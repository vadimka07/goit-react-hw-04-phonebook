import React, { useEffect, useState } from 'react';
import Title from './Title/Title';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

function App () {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    const formSubmitHandler = dataForm => {
        if (checkUser(dataForm)) {
            return alert(dataForm.name + 'is already is contacts');
        }

        setContacts(prevState => [...prevState, { id: nanoid(), name: dataForm.name, number: dataForm.number }])

    };

    const checkUser = data => {
        return contacts.some(({ name }) => name === data.name);
    };

    const handlerFilter = e => {
        setFilter(e.target.value);
    };

    const filterData = () => {
        const filterNormalized = filter.toLowerCase();
        return contacts.filter(item =>
            item.name.toLowerCase().includes(filterNormalized),
        );
    };

    const deleteContact = id => {
        setContacts(prevState => [...prevState.filter(item => item.id !== id)])
    };

    useEffect(() => {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        console.log('parsedContacts', parsedContacts);
        if (parsedContacts) {
            setContacts(parsedContacts)
        }
    }, []);

    useEffect(() => {
        console.log(contacts);
        if(contacts.length){
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }, [contacts]);

    return (
        <div
            style={ {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
                color: '#010101',
                padding: 200,
            } }
        >
            <Title title='Phonebook' />
            <ContactForm onSubmit={ formSubmitHandler } />
            <Title title='Contacts' />
            <Filter onChange={ handlerFilter } value={ filter } />
            <ContactList
                listItems={ filterData() }
                onDelete={ deleteContact }
            />
        </div>
    );
}

export default App;

App.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    listItems: PropTypes.array,
    onDelete: PropTypes.func,
};
