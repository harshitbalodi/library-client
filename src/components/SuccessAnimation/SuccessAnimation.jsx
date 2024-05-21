import './SuccessAnimation.css';

const SuccessAnimation = () => {
    return (
        <div className='success-animation'>
            <svg width="200" height="200">
                <circle
                    fill="none"
                    stroke="#68E534"
                    strokeWidth="10"
                    cx="100"
                    cy="100"
                    r="85"
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="circle"
                />
                <polyline
                    fill="none"
                    stroke="#68E534"
                    points="44,107 86.5,142 152,69"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tick"
                />
            </svg>
        </div>
    )
}

export default SuccessAnimation