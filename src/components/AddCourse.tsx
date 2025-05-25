import { Toaster, toaster } from "@/components/ui/toaster";
import { addCourse } from "@/services/api";
import {
  Button,
  Container,
  Field,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddCourse() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [courseClass, setCourseClass] = useState("");
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !name || !courseClass || !credits) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      addCourse({
        code: code,
        name: name,
        class: courseClass,
        credits: credits,
      });

      setIsLoading(false);
      toaster.create({
        title: "Course added",
        type: "success",
        duration: 3000,
      });

      setCode("");
      setName("");
      setCourseClass("");
      setCredits(0);
      setIsLoading(false);
    } catch (error) {
      setCode("");
      setName("");
      setCourseClass("");
      setCredits(0);
      setIsLoading(false);
      toaster.create({
        title: "Error adding course",
        description:
          error instanceof Error ? error.message : "Failed to add course",
        type: "error",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Adding Course ...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Toaster />
      <VStack marginTop={"5%"}>
        <Field.Root>
          <Field.Label>Code</Field.Label>
          <Input
            name="Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            name="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Class</Field.Label>
          <Input
            name="Class"
            type="text"
            value={courseClass}
            onChange={(e) => setCourseClass(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Credits</Field.Label>
          <Input
            name="Credits"
            type="number"
            value={credits}
            onChange={(e) => setCredits(parseInt(e.target.value))}
          />
        </Field.Root>

        <Field.Root marginTop={"2%"}>
          <Button
            type="submit"
            onClick={handleAddCourse}
            backgroundColor={"#0db39e"}
            fontWeight={700}
            _hover={{ backgroundColor: "#06d6a0" }}
          >
            Add Course
          </Button>
        </Field.Root>
      </VStack>
    </Container>
  );
}
