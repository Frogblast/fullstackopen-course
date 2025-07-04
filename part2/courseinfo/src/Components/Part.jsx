export const Part = ({ name, exercises }) => {
    return (
        <div>
            <h2>
                {name}
            </h2>
            <p>Number of exercises: {exercises}</p>
        </div>
    );
};
