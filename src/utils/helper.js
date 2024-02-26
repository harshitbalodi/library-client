export const desksToHalls = (desks) => {
  const hallsMap = {};

  desks.forEach((desk) => {
    const { shift } = desk;
    const { hall } = shift;
    const hallId = hall.id;

    if (!hallsMap[hallId]) {
      hallsMap[hallId] = {
        id: hallId,
        name: hall.name,
        shifts: {},
      };
    }

    const shiftKey = `${shift.id}_${shift.name.replace(/\s+/g, "_")}`;

    if (!hallsMap[hallId].shifts[shiftKey]) {
      hallsMap[hallId].shifts[shiftKey] = {
        id: shift.id,
        name: shift.name,
        start_time: shift.start_time,
        end_time: shift.end_time,
        capacity: shift.capacity,
        fee: shift.fee,
        id_deleted: false,
        desks: [],
      };
    }

    const deskInfo = {
      id: desk.id,
      seat_no: desk.seat_no,
      is_vacant: desk.is_vacant,
      is_active: desk.is_active,
    };

    hallsMap[hallId].shifts[shiftKey].desks.push(deskInfo);
  });

  Object.values(hallsMap).forEach((hall) => {
    hall.shifts = Object.values(hall.shifts);
  });

  const hallsArray = Object.values(hallsMap);
  return hallsArray;
};

export const formatNumber = (num) => {
  if (num < 1000) {
    return num.toLocaleString();
  }
  return (
    num.toString().slice(0, 1) +
    "," +
    num.toString().slice(1, num.toString().length)
  );
};

export const extractShifts =(halls)=>{
  let allShifts=[]
    halls.map(hall=>{
      allShifts =[...allShifts, ...hall.shifts];
    })
  return allShifts;
}

export const sortShiftsByFee = (shifts, order) => {
  return shifts
    .slice()
    .sort((a, b) => (order === "asc" ? a.fee - b.fee : b.fee - a.fee));
};

export const filterShiftsByTime = (shifts, startTime, endTime) => {
  startTime = startTime+':00';
  endTime = endTime+':00';
  console.log(startTime,endTime);
  return shifts.filter(shift =>  shift.start_time >= startTime && shift.end_time <= endTime);
};

