import { useState } from 'react';
import PropTypes from 'prop-types';

function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const handleInputName = e => {
        setName(e.currentTarget.value);
    };

    const handleInputNumber = e => {
        setNumber(e.currentTarget.value);
    };

    const handleAddUser = e => {
        e.preventDefault();
        onSubmit({ name, number });
        resetForm();
    };
    const resetForm = () => {
        setName('');
        setNumber('');
    };
    return (
        <>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onSubmit={handleAddUser}
            >
                <label
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 18,
                    }}
                >
                    Name
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. 
                            For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleInputName}
                    />
                </label>
                <label
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 18,
                        marginTop: 20,
                    }}
                >
                    Number
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleInputNumber}
                    />
                </label>
                <button
                    type="submit"
                    style={{
                        marginTop: 20,
                    }}
                >
                    Add contact
                </button>
            </form>
        </>
    );
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};
