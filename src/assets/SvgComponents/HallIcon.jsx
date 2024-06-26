
const HallIcon = ({width, height, fill}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>{`.a { fill: none; stroke: ${fill}; stroke-linecap: round; stroke-linejoin: round; }`}</style>
    </defs>
    <path className="a" d="M13.2488,4.5184,31.3816,7.0878,31.3889,43.5,13.2452,40.9306Z" />
    <path className="a" d="M13.2452,4.5l21.51.0734-.0734,35.7809-3.2191.0734" />
    <path className="a" d="M29.5943,26.018c.058,1.5406-.6439,2.5468-1.3748,2.2655-.5943-.2286-1.0148-1.2222-1.0425-2.2757-.0273-1.0388.2815-2.2247.903-2.2978C28.9187,23.6113,29.5373,24.5062,29.5943,26.018Z" />
  </svg>
  )
}

export default HallIcon