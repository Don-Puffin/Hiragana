// returns happy, sad or neutral birdState. ClassName is passed as a prop to get the bird jumping
export default function GameBird({state, className}) {
    const images = {
        happy: '/enaga-happy.png',
        neutral: '/enaga-neutral.png',
        sad: '/enaga-sad.png',
      };

      return (
        <div className={className}>
            <img
            src={images[state]}
            alt="Enaga-Chan"
            className="h-96"
            />
        </div>
      )

}