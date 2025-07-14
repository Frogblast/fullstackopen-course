import { Contact } from './Contact.jsx';

export const Persons = ({ persons, filter, deleteContact }) => {
  const personsToShow = () => {
    return persons.filter(person => { return person.name.toLowerCase().includes(filter.toLowerCase()); });
  };

  return (
    <>
      {personsToShow().map(person => <Contact
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        deleteContact={deleteContact} />)}
    </>
  );
};
