import type {
  Student,
  Instructor,
  User,
  Course,
  Instructor_Course,
} from "@/types";
import bcrypt from "bcryptjs";

const API_BASE = "/data-api/rest";

export async function addUser(user: User): Promise<User> {
  const user_hashed = {
    user_id: user.user_id,
    password: await bcrypt.hash(user.password, 10),
    role: user.role,
  };

  const response = await fetch(`${API_BASE}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_hashed),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value[0];
}

export async function addStudent(student: Student): Promise<Student> {
  const response = await fetch(`${API_BASE}/Students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value[0];
}

export async function addInstructor(
  instructor: Instructor
): Promise<Instructor> {
  const response = await fetch(`${API_BASE}/Instructors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instructor),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value[0];
}

export async function addCourse(course: Course): Promise<Course> {
  const response = await fetch(`${API_BASE}/Courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value[0];
}

export async function addInstructorCourse(
  record: Instructor_Course
): Promise<Instructor_Course> {
  const response = await fetch(`${API_BASE}/Instructors_Courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value[0];
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE}/Courses`);

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.error.message);
  }
  const data = await response.json();
  return data.value;
}

export async function deleteStudent(student_id: number): Promise<number> {
  const response = await fetch(`${API_BASE}/Users/user_id/${student_id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete student");
  return student_id;
}
