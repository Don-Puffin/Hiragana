//component for producing the 'question character' e.g. find this character on the left
const Question = ({character}: {
    character?: string | null | undefined
}) => {
    console.log(character)
    return (
        <div className = " font-bold mb-4 p-4 bg-white shadown h-48 w-48 text-center text-blue-700 flex justify-center items-center text-6xl border-4 rounded-md border-blue-700">
            {character}
        </div>
    )
}

export default Question