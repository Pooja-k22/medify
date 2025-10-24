import dayjs from "dayjs";

export const combineDateTime = (date, time) => {
  if (!date || !time) return null;

  const d = dayjs(date);
  const t = dayjs(time); 

  const combined = d
    .hour(t.hour())
    .minute(t.minute())
    .second(0)
    .millisecond(0);

  return combined.toDate(); 
};


export const isTimeOverlap = (start1, end1, start2, end2) => {
  const s1 = dayjs(start1);
  const e1 = dayjs(end1);
  const s2 = dayjs(start2);
  const e2 = dayjs(end2);

  return s1.isBefore(e2) && s2.isBefore(e1); 
};




