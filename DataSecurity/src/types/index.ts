export type UserRole = 'patient' | 'hospital' | 'guest';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  isAuthenticated: boolean;
}

export interface Patient {
  id: string;
  username: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  problem: string;
  createdAt: string;
  blockchainId: string;
}

export interface Hospital {
  id: string;
  username: string;
  name: string;
  licenseNumber: string;
  address: string;
  website: string;
  createdAt: string;
  blockchainId: string;
}

export interface BlockchainRecord {
  id: string;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
  verified: boolean;
}

export interface SearchFilters {
  patientId?: string;
  patientName?: string;
  problem?: string;
}