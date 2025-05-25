export interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
}

export interface Instructor {
  id: number;
  name: string;
}

export interface User {
  user_id: number;
  username: string;
  password: string;
  role: "student" | "instructor";
}

export interface Course {
  code: string;
  name: string;
  class: string;
  credits: number;
}

export interface Instructor_Course {
  instructor_id: number;
  course_code: string;
}
