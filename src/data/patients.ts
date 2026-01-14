import { Patient } from "../types";

const patients: Patient[] = [
  {
    id: "john-smith-72",
    name: "John Michael Smith",
    age: 72,
    allergies: ["Penicillin", "Sulfa Drugs", "Latex"],
    medications: ["Metformin", "Aspirin", "Warfarin"],
    conditions: [
      "Type 2 Diabetes",
      "Coronary Artery Disease",
      "Atrial Fibrillation",
      "COPD (on home oxygen)"
    ],
    emergencyContact: {
      name: "Sarah Smith (Daughter)",
      phone: "+1 (732) 555-0147"
    },
    address: "123 Maple Avenue, Brooklyn, NY 11201",
    bloodType: "O+"
  },
  {
    id: "maria-rodriguez-58",
    name: "Maria Elena Rodriguez",
    age: 58,
    allergies: ["Aspirin", "Ibuprofen"],
    medications: ["Lisinopril", "Albuterol", "Topiramate"],
    conditions: [
      "Asthma",
      "Hypertension",
      "Migraine disorder",
      "History of seizures"
    ],
    emergencyContact: {
      name: "Juan Rodriguez (Son)",
      phone: "+1 (646) 555-0234"
    },
    address: "456 Park Avenue, Brooklyn, NY 11201",
    bloodType: "A-"
  },
  {
    id: "robert-chen-81",
    name: "Robert James Chen",
    age: 81,
    allergies: ["Penicillin", "Codeine"],
    medications: ["Warfarin", "Metoprolol", "Insulin"],
    conditions: [
      "Heart failure",
      "Atrial Fibrillation",
      "Chronic kidney disease",
      "Diabetes Type 2"
    ],
    emergencyContact: {
      name: "Linda Chen (Wife)",
      phone: "+1 (718) 555-0345"
    },
    address: "789 Queens Boulevard, Brooklyn, NY 11201",
    bloodType: "B+"
  },
  {
    id: "patricia-johnson-65",
    name: "Patricia Anne Johnson",
    age: 65,
    allergies: ["Morphine", "Penicillin"],
    medications: ["Alendronate", "Lorazepam", "Oxygen therapy"],
    conditions: [
      "COPD",
      "Osteoporosis",
      "Anxiety disorder",
      "History of falls"
    ],
    emergencyContact: {
      name: "David Johnson (Husband)",
      phone: "+1 (917) 555-0456"
    },
    address: "321 Sunset Boulevard, Brooklyn, NY 11201",
    bloodType: "AB+"
  },
  {
    id: "michael-patel-52",
    name: "Michael David Patel",
    age: 52,
    allergies: ["Latex", "NSAIDs"],
    medications: ["Plavix", "Metoprolol", "Insulin"],
    conditions: [
      "History of MI (heart attack)",
      "Diabetes Type 2",
      "Hypertension",
      "High cholesterol"
    ],
    emergencyContact: {
      name: "Priya Patel (Wife)",
      phone: "+1 (212) 555-0567"
    },
    address: "654 Atlantic Avenue, Brooklyn, NY 11201",
    bloodType: "O+"
  }
];

export default patients;