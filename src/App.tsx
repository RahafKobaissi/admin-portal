import { Box } from "@chakra-ui/react";
import "./App.css";
import AddStudent from "./components/AddStudent";

function App() {
  // async function list() {
  //   const endpoint = "/data-api/rest/Students";
  //   const response = await fetch(endpoint);
  //   const data = await response.json();
  //   console.table(data.value);
  // }

  return (
    <Box>
      <AddStudent />
    </Box>
  );
}

export default App;
