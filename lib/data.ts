export interface Patient {
  id: string
  initials: string
  fullName: string
  age: number
  height: string
  weight: string
  bloodType: string
  status: "Stable" | "Critical" | "Unstable"
  lastUpdated: string
  alertStatus: string
  callStatus: string
  allergies: Array<{
    name: string
    severity: "high" | "moderate" | "low" | "none"
    risk: string
  }>
  conditions: Array<{
    name: string
    severity: "high" | "moderate" | "low"
  }>
  medications: Array<{
    name: string
    dosage: string
  }>
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
}

export const agencies = [
  { id: "nyc-ems-1", name: "NYC EMS District 1" },
  { id: "nyc-ems-2", name: "NYC EMS District 2" },
  { id: "st-marys", name: "St. Mary's Hospital" },
  { id: "sunset-nursing", name: "Sunset Nursing Home" },
]

export const patients: Patient[] = [
  {
    id: "john-smith",
    initials: "JS",
    fullName: "John Michael Smith",
    age: 72,
    height: "5'10\"",
    weight: "185 lbs",
    bloodType: "O+",
    status: "Stable",
    lastUpdated: "2 min ago",
    alertStatus: "No critical alerts",
    callStatus: "Ready",
    allergies: [
      { name: "Penicillin", severity: "high", risk: "Anaphylaxis risk - Do NOT administer" },
      { name: "Sulfa Drugs", severity: "moderate", risk: "Skin rash, hives" },
      { name: "Latex", severity: "low", risk: "Contact dermatitis" },
    ],
    conditions: [
      { name: "Type 2 Diabetes", severity: "high" },
      { name: "COPD", severity: "moderate" },
      { name: "Hypertension", severity: "high" },
      { name: "Atrial Fibrillation", severity: "moderate" },
    ],
    medications: [
      { name: "Metformin", dosage: "500mg 2x daily" },
      { name: "Lisinopril", dosage: "10mg daily" },
      { name: "Warfarin", dosage: "5mg daily" },
    ],
    emergencyContact: {
      name: "Sarah Smith",
      relation: "Spouse",
      phone: "(555) 123-4567",
    },
  },
  {
    id: "maria-rodriguez",
    initials: "MR",
    fullName: "Maria Elena Rodriguez",
    age: 58,
    height: "5'4\"",
    weight: "145 lbs",
    bloodType: "A+",
    status: "Stable",
    lastUpdated: "5 min ago",
    alertStatus: "No critical alerts",
    callStatus: "Ready",
    allergies: [{ name: "Aspirin", severity: "moderate", risk: "GI bleeding risk" }],
    conditions: [
      { name: "Asthma", severity: "moderate" },
      { name: "Anxiety Disorder", severity: "low" },
    ],
    medications: [
      { name: "Albuterol", dosage: "PRN" },
      { name: "Sertraline", dosage: "50mg daily" },
    ],
    emergencyContact: {
      name: "Carlos Rodriguez",
      relation: "Son",
      phone: "(555) 234-5678",
    },
  },
  {
    id: "robert-chen",
    initials: "RC",
    fullName: "Robert James Chen",
    age: 81,
    height: "5'8\"",
    weight: "160 lbs",
    bloodType: "B-",
    status: "Critical",
    lastUpdated: "1 min ago",
    alertStatus: "DNR on file",
    callStatus: "Ready",
    allergies: [
      { name: "Morphine", severity: "high", risk: "Severe respiratory depression" },
      { name: "Iodine", severity: "high", risk: "Anaphylaxis - avoid contrast dyes" },
    ],
    conditions: [
      { name: "Congestive Heart Failure", severity: "high" },
      { name: "Chronic Kidney Disease", severity: "high" },
      { name: "Dementia", severity: "moderate" },
    ],
    medications: [
      { name: "Furosemide", dosage: "40mg daily" },
      { name: "Carvedilol", dosage: "12.5mg 2x daily" },
    ],
    emergencyContact: {
      name: "Lisa Chen",
      relation: "Daughter",
      phone: "(555) 345-6789",
    },
  },
  {
    id: "patricia-johnson",
    initials: "PJ",
    fullName: "Patricia Anne Johnson",
    age: 65,
    height: "5'6\"",
    weight: "170 lbs",
    bloodType: "AB+",
    status: "Stable",
    lastUpdated: "10 min ago",
    alertStatus: "No critical alerts",
    callStatus: "Ready",
    allergies: [],
    conditions: [
      { name: "Osteoarthritis", severity: "moderate" },
      { name: "Hypothyroidism", severity: "low" },
    ],
    medications: [
      { name: "Levothyroxine", dosage: "75mcg daily" },
      { name: "Ibuprofen", dosage: "400mg PRN" },
    ],
    emergencyContact: {
      name: "Michael Johnson",
      relation: "Husband",
      phone: "(555) 456-7890",
    },
  },
  {
    id: "michael-patel",
    initials: "MP",
    fullName: "Michael David Patel",
    age: 52,
    height: "5'11\"",
    weight: "195 lbs",
    bloodType: "O-",
    status: "Unstable",
    lastUpdated: "30 sec ago",
    alertStatus: "Active chest pain",
    callStatus: "In Progress",
    allergies: [{ name: "Codeine", severity: "moderate", risk: "Nausea, vomiting" }],
    conditions: [
      { name: "Coronary Artery Disease", severity: "high" },
      { name: "Hyperlipidemia", severity: "moderate" },
      { name: "Type 2 Diabetes", severity: "moderate" },
    ],
    medications: [
      { name: "Atorvastatin", dosage: "40mg daily" },
      { name: "Metoprolol", dosage: "50mg 2x daily" },
      { name: "Aspirin", dosage: "81mg daily" },
    ],
    emergencyContact: {
      name: "Priya Patel",
      relation: "Wife",
      phone: "(555) 567-8901",
    },
  },
]
