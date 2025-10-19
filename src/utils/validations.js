 
export const getAge=(dobString) => {
    if (!dobString) return false;
  const today = new Date();
  const dob = new Date(dobString);

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age
}

export const isAdult = (dobString, minAge = 18) => {
  return getAge(dobString) >=minAge
};