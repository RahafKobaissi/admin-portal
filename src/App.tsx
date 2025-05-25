import { Box } from "@chakra-ui/react";
import "./App.css";
// import AddStudent from "./components/AddStudent";
import { useColorMode } from "@/components/ui/color-mode";
import { useEffect } from "react";
import AddInstructor from "./components/AddInstructor";

function App() {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <Box>
      {/* <AddStudent /> */}
      <AddInstructor />
    </Box>
  );
}

export default App;
