import dayjs from "dayjs";
import * as yup from "yup";

export const StaffSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed"),

  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed"),

  role: yup.string().required("Role is required"),

  department: yup.string().required("Department is required"),

  qualification: yup.string().required("Qualification is required"),

  experience: yup
    .string()
    .required("Experience is required")
    .matches(/^[0-9]+$/, "Enter valid number of years"),

  contact: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),

  gender: yup.string().required("Gender is required"),

  dob: yup
  .mixed()
  .required("Date of Birth is required")
  .test("is-date", "Invalid date", (value) => value && value.isValid()),

joiningDate: yup
  .mixed()
  .required("Joining date is required")
  .test("is-date", "Invalid date", (value) => value && value.isValid()),


  shift: yup.string().required("Shift is required"),

  status: yup.string().required("Status is required"),
  role: yup.string().required("role is required"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),

  photo:yup
    .string()
    .nullable()
    .test("is-image", "Only image files (jpg, jpeg, png, gif) are allowed", (value) => {
      if (!value) return true; 
      return (
        value.startsWith("data:image/jpeg") ||
        value.startsWith("data:image/png") ||
        value.startsWith("data:image/jpg") ||
        value.startsWith("data:image/gif")
      );
    }),
});

export const calendarschema = yup.object().shape({
  patient: yup.string().required("Patient name is required"),
  doctor: yup.string().required("Doctor name is required"),
  startTime: yup
    .mixed()
    .required("Start time is required")
    .test("is-dayjs", "Invalid start time", (value) => {
      return dayjs.isDayjs(value);
    }),
  endTime: yup
    .mixed()
    .required("End time is required")
    .test("is-dayjs", "Invalid end time", (value) => {
      return dayjs.isDayjs(value);
    })
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;
        // Compare Day.js objects
        return value.isAfter(startTime);
      }
    ),
});

export const cancelSchema = yup.object().shape({
  reason: yup.string().required("Reason is required").min(5, "Reason must be at least 5 characters"),
});
;

