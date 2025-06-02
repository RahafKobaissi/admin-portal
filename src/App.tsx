import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import { useColorMode } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";
import AddInstructor from "./components/AddInstructor";
import AddCourse from "./components/AddCourse";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function Main() {
  const { setColorMode } = useColorMode();
  const [title, setTitle] = useState("Add Student");
  const [studentSelected, setStudentSelected] = useState(true);
  const [instructorSelected, setInstructorSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setColorMode("light");
    // Sync state with the current URL
    switch (location.pathname) {
      case "/":
        setTitle("Add Student");
        setStudentSelected(true);
        setInstructorSelected(false);
        break;
      case "/add-instructor":
        setTitle("Add Instructor");
        setStudentSelected(false);
        setInstructorSelected(true);
        break;
      case "/add-course":
        setTitle("Add Course");
        setStudentSelected(false);
        setInstructorSelected(false);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        borderRadius="md"
        boxShadow="lg"
        p={8}
      >
        <Text fontSize={"2rem"} fontWeight={700}>
          {title}
        </Text>
        <HStack>
          <Link to="/">
            <Button
              backgroundColor={"transparent"}
              borderBottom={
                studentSelected ? "2px solid black" : "1px solid black"
              }
              _hover={{ borderBottom: "2px solid black" }}
              color={"black"}
              fontWeight={studentSelected ? 700 : 400}
            >
              Add Student
            </Button>
          </Link>

          <Link to="/add-instructor">
            <Button
              backgroundColor={"transparent"}
              borderBottom={
                instructorSelected ? "2px solid black" : "1px solid black"
              }
              _hover={{ borderBottom: "2px solid black" }}
              color={"black"}
              fontWeight={instructorSelected ? 700 : 400}
            >
              Add Instructor
            </Button>
          </Link>

          <Link to="/add-course">
            <Button
              backgroundColor={"transparent"}
              borderBottom={
                !studentSelected && !instructorSelected
                  ? "2px solid black"
                  : "1px solid black"
              }
              _hover={{ borderBottom: "2px solid black" }}
              color={"black"}
              fontWeight={!studentSelected && !instructorSelected ? 700 : 400}
            >
              Add Course
            </Button>
          </Link>
        </HStack>
      </Flex>

      <Routes>
        <Route path="/" element={<AddStudent />} />
        <Route path="/add-instructor" element={<AddInstructor />} />
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
