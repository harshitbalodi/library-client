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

export const extractShifts = (halls) => {
  console.log(halls);
  let allShifts = [];
  halls.map((hall) => {
    allShifts = [...allShifts, ...hall.shifts];
  });
  return allShifts;
};

export const sortShiftsByFee = (shifts, order) => {
  return shifts
    .slice()
    .sort((a, b) => (order === "asc" ? a.fee - b.fee : b.fee - a.fee));
};

export const filterShiftsByTime = (shifts, startTime, endTime) => {
  startTime = startTime + ":00";
  endTime = endTime + ":00";
  console.log(startTime, endTime);
  return shifts.filter(
    (shift) => shift.start_time >= startTime && shift.end_time <= endTime
  );
};

export const formatTime = (time) => {
  if (!/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    throw new Error("Invalid time format. Expected HH:MM:SS");
  }

  const newTime = time.slice(0, 5);
  if (newTime === "00:00") {
    return "12:00 AM";
  }

  const [hours, minutes] = newTime.split(":").map(Number);
  const timeHour = hours < 12 ? hours : hours - 12;
  return `${timeHour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
};

export const clubShiftsByTime = (shifts) => {
  const groupedShifts = {};

  shifts.forEach((shift) => {
    const key = `${shift.start_time}-${shift.end_time}`;

    if (!groupedShifts[key]) {
      groupedShifts[key] = {
        start_time: shift.start_time,
        end_time: shift.end_time,
        shifts: [],
      };
    }

    groupedShifts[key].shifts.push({
      id: shift.id,
      name: shift.name,
    });
  });
  return Object.values(groupedShifts);
};

export const getRemainingShiftTime = (shift) => {
  const now = new Date();
  const start = new Date();
  start.setHours(...shift.start_time.split(":"));
  const end = new Date();
  end.setHours(...shift.end_time.split(":"));

  if (now < start) {
    const timeDifference = start - now;
    return {
      ...shift,
      status: "time_remaining",
      value: 0,
      time: formatTimeDifference(timeDifference),
      shifts: shift.shifts,
      timeDifference,
    };
  } else if (now > end) {
    return { ...shift, status: "ended", value: -1, shifts: shift.shifts };
  } else {
    const timeDifference = end - now;
    return {
      ...shift,
      status: "running",
      value: 1,
      time: formatTimeDifference(timeDifference),
      timeDifference,
    };
  }
};

export const formatTimeDifference = (differenceInMs) => {
  const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

  return ` ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  const str = cName + "=" + cValue + "; " + expires + "; path=/; Secure";
  console.log(str);
  document.cookie = str;
}

export function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    console.log(val);
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

export function setImageUrl(imageUrl) {
  // const imageToken = image.split('8000');
  // const newImageURL =import.meta.env.VITE_BACKEND_API_URL + imageToken[1];
  // console.log(newImageURL);
  // return newImageURL;

  const mediaIndex = imageUrl.indexOf('/media');
  if (mediaIndex !== -1) {
    const newImageUrl = import.meta.env.VITE_BACKEND_API_URL + imageUrl.substring(mediaIndex);
    console.log(newImageUrl);
    return newImageUrl;
  } else {
    console.warn('Image URL does not contain "/media":', imageUrl);
    return imageUrl; 
  }
}