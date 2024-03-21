import React from 'react';

interface QuestionProps {
    character?: string | null | undefined;
    className?: string; // Define the className prop here
}

const Question: React.FC<QuestionProps> = ({ character, className }) => {
    console.log(character);
    return (
        <div className={`${className} font-bold mb-4 p-4 bg-white shadown h-48 w-48 text-center text-black flex justify-center items-center text-6xl border-4 drop-shadow-2xl rounded-md border-yellow-600`}>
            {character}
        </div>
    );
}

export default Question;
