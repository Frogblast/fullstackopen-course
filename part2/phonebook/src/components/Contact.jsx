export const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <div>{name} {number}
      <button onClick={() => deleteContact(id)}>delete</button>
    </div>
  );
};
