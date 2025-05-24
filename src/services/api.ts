import type { Student, Instructor, User } from "@/types";

const API_BASE = "/data-api/rest";

export async function addStudent(student: Student): Promise<Student> {
  const response = await fetch(`${API_BASE}/Students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) throw new Error("Failed to add student");
  const data = await response.json();
  return data.value[0];
}

export async function addInstructor(instructor: Instructor): Promise<Instructor> {
  const response = await fetch(`${API_BASE}/Instructors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instructor),
  });

  if (!response.ok) throw new Error("Failed to add instructor");
  const data = await response.json();
  return data.value[0];
}

export async function addUser(user: User): Promise<User> {
  const response = await fetch(`${API_BASE}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Failed to add user");
  const data = await response.json();
  return data.value[0];
}