"use server";

export interface HRUser {
  id: string;
  name: string;
  email: string;
  role: "HR";
  active: boolean;
}

export async function getAllHRUsers(): Promise<HRUser[]> {
  return [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@company.com",
      role: "HR",
      active: true,
    },
    {
      id: "2",
      name: "Priya Verma",
      email: "priya@company.com",
      role: "HR",
      active: false,
    },
    {
      id: "3",
      name: "Aman Singh",
      email: "aman@company.com",
      role: "HR",
      active: true,
    },
  ];
}