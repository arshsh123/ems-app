export interface Patient {
  id: string;
  name: string;
  age: number;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  address: string;
  bloodType: string;
}

export interface Agency {
  id: string;
  name: string;
  pin: string;
}

export interface Session {
  agencyId: string;
  agencyName: string;
  timestamp: number;
}