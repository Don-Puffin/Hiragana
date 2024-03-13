//component for producing the 'question character' e.g. find this character on the left
const Question = ({character}) => {
    return (
        <div className = "text-2xl font-bold mb-4 p-4 bg-white shadown rounded">
            {character}
        </div>
    )
}

export default Question