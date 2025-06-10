# Admin Portal

**Admin Portal** is a modern web application designed to simplify university data management. Built with **React**, **TypeScript**, **Vite**, and **Chakra UI**, it allows administrators to easily manage students, instructors, and courses through an intuitive and responsive interface. The portal integrates with **Azure Static Web Apps**, **Azure SQL Database**, and **Azure Face API** for seamless cloud-based operations and face recognition support.

---

## What Does Admin Portal Do?

Admin Portal provides administrators with a centralized platform to manage academic data and enable face recognition features for student attendance systems.

### Key Features

- 👤 **Student Management**  
  Add students with personal information and a photo. Upon submission, the app uploads the image and sends a POST request to an **Azure Function** that registers the student in the **Azure Face API** Person Group for facial recognition.

- 🧑‍🏫 **Instructor Management**  
  Add instructors and assign their courses.

- 📚 **Course Management**  
  Create courses.

- 🔄 **Azure Integration**  
  All data is securely stored in an **Azure SQL Database**, accessed via **Data API Builder**, and the app is hosted on **Azure Static Web Apps** with CI/CD powered by GitHub Actions.

- 🧪 **Form Validation & Feedback**  
  Smooth user experience with input validation and real-time toast notifications.

- 🌗 **Modern UI**  
  Built with Chakra UI for a responsive, accessible interface supporting both light and dark modes.

- ⚡ **Fast Development**  
  Powered by Vite for instant hot reloading and fast builds.

---

## How It Works

- **Student Enrollment with Face Recognition:**  
  When an admin adds a student:

  - The student’s information (e.g., name, ID, class) is stored directly in the Azure SQL Database using Data API Builder.
  - Simultaneously, the student’s ID and image file are sent to a backend Azure Function.
  - The Azure Function registers the student in a Person Group within the Azure Face API, enabling facial recognition features for attendance tracking.

- **Data Storage & Access:**  
  All records (students, instructors, courses) are stored in **Azure SQL Database** and exposed securely via **Data API Builder**.

- **Deployment & CI/CD:**  
  The portal is deployed using **Azure Static Web Apps**, and every push to `main` triggers a **GitHub Actions** workflow to build and deploy automatically.

---

## Technology Stack

- **Frontend:** React, TypeScript, Chakra UI, Vite
- **Backend & Data:** Azure Static Web Apps, Azure SQL Database, Azure Functions, Azure Face API, Data API Builder
- **DevOps:** GitHub Actions (CI/CD), Azure SWA CLI for local development

---

## Learn More

- [React Documentation](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Vite](https://vite.dev/)
- [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Data API Builder](https://learn.microsoft.com/en-us/azure/static-web-apps/database-overview)
- [Azure SWA CLI](https://azure.github.io/static-web-apps-cli/)
- [GitHub Actions for SWA](https://learn.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow)
