export const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
        <div>
            <h2>Total</h2>
            <p>
                {sum}
            </p>
        </div>
    );
};
