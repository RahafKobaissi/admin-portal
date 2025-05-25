import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import { useColorMode } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";
import AddInstructor from "./components/AddInstructor";
import AddCourse from "./components/AddCourse";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const { setColorMode } = useColorMode();
  const [title, setTitle] = useState("Add Student");

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <Box>
      <BrowserRouter>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"2rem"} fontWeight={800}>
            {title}
          </Text>
          <HStack>
            <Link to="/">
              <Button onClick={() => setTitle("Add Student")}>
                Add Student
              </Button>
            </Link>

            <Link to="/add-instructor">
              <Button onClick={() => setTitle("Add Instructor")}>
                Add Instructor
              </Button>
            </Link>

            <Link to="/add-course">
              <Button onClick={() => setTitle("Add Course")}>Add Course</Button>
            </Link>
          </HStack>
        </Flex>

        <Routes>
          <Route path="/" element={<AddStudent />} />
          <Route path="/add-instructor" element={<AddInstructor />} />
          <Route path="/add-course" element={<AddCourse />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
