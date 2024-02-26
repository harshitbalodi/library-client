import { v4 as uuidv4 } from 'uuid';
import './Shimmer.css';

const ShimmerCard = () =>{
    return(<div className="shimmerCard">
    <div className="shimmerSeats">
        {Array(10).fill().map((_, index) => (
            <div key={index} className="shimmerSeat" />
        ))}
    </div>
    <div className="shimmerDetails">
        <div className="shimmerHallName" />
        <div className="shimmerTiming" />
        <div className="shimmerFee" />
    </div>
    
</div>
    )
}

const Shimmer = () => {
  return (
    <div className='shimmer-container'>
        {
        Array(8).fill().map(() => {
          return <ShimmerCard key={uuidv4()} />
        })
      }
    </div>
  )
}

export default Shimmer