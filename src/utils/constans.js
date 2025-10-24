export const  trialStite =["All",'JCCR',"ABC","PQW","JCCI",'Others']
export const roles =['Admin','Staff','Coordinator']
export const statusPatient =["All",'Active','Inactive']
export const phoneTypes =['Mobile','Home']
export const headCells = [
  { id: "site", numeric: false, label: "Site" },
  { id: "name", numeric: false, label: "Name" },
  { id: "phone", numeric: false, label: "Phone" },
  { id: "dob", numeric: false, label: "DOB" },
  { id: "createdBy", numeric: false, label: "Created By" },
  { id: "patientStatus", numeric: false, label: "Status" },
  { id: "action", numeric: false, label: "Action" },
];
export const filterColumn = [{ label: "SITE", value: "site" },
  { label: "NAME", value: "name" },
  { label: "PHONE", value: "phone" },
  { label: "CREATED BY", value: "createdBy" },
  { label: "STATUS", value: "patientStatus" },]

export const statusP=['Active','Inactive']

 export const colors = [
    "rgba(46, 122, 187, 1)",
  "#5f7b73", 
  "rgb(255, 203, 112)", 
  "#ed115eff", 
  "#6a1b9a", 
  "#00838f", 
  ];
  
  export const staffRoles = [
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Lab Technician",
  "Receptionist",
  "Administrator",
  "Janitor",
  "Security",
];

export const statusStaff =['Active','Inactive']

export const departmentOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Oncology",
  "Orthopedics",
  "Dermatology",
  "ENT",
  "Radiology",
  "Gynecology",
  "Urology",
];

export const qualificationOptions = [
  "MBBS",
  "MD",
  "MS",
  "BDS",
  "MDS",
  "BPT",      
  "MPT",       
  "PhD",
  "Diploma in Nursing",
  "BSc Nursing",
  "MSc Nursing",
  "Pharmacy Diploma",
  "B.Pharm",
  "M.Pharm",
  "Lab Technician Diploma",
  "Radiology Diploma",
  
];

export const shiftOptions = [
  "Morning",   
  "Afternoon", 
  "Evening",   
  "Night",     
  "Rotational"
];

export const genderoptions = ['Male', 'Female','Other']

export const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Patients", path: "/dashboard/patientsList" },
  { label: "Staffs", path: "/dashboard/staffListing" },
  { label: "Appointment", path: "/dashboard/appointment" },
  { label: "Settings", path: "/dashboard/settings" },
];

export const statusOption = ["All","Approved", "Pending", "Cancelled"];
