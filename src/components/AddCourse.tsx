import { Toaster, toaster } from "@/components/ui/toaster";
import { addCourse } from "@/services/api";
import {
  Button,
  Container,
  Field,
  Input,
  Spinner,
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

    const safePattern = /^[a-zA-Z0-9@$!_]+$/;
    const codeValid = safePattern.test(code);
    const nameValid = safePattern.test(name);
    const courseClassValid = safePattern.test(courseClass);
    const creditsValid = safePattern.test(credits.toString());

    if (!codeValid || !nameValid || !courseClassValid || !creditsValid) {
      toaster.create({
        title: "Invalid input",
        description:
          "Only letters, numbers, and the characters @ $ ! _ are allowed.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      await addCourse({
        code: code,
        name: name,
        class: courseClass,
        credits: credits,
      });

      toaster.create({
        title: "Course added",
        type: "success",
        duration: 3000,
      });

      setCode("");
      setName("");
      setCourseClass("");
      setCredits(0);
    } catch (error) {
      setCode("");
      setName("");
      setCourseClass("");
      setCredits(0);
      toaster.create({
        title: "Error adding course",
        description:
          error instanceof Error ? error.message : "Failed to add course",
        type: "error",
        duration: 6000,
      });
      console.log(
        error instanceof Error ? error.message : "Failed to add course"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Toaster />
        <VStack marginTop={"10%"}>
          <Spinner />
          <Text>Adding Course ...</Text>
        </VStack>
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
            backgroundColor={"#1e88e5"}
            fontWeight={700}
            _hover={{ backgroundColor: "#4361ee" }}
          >
            Add Course
          </Button>
        </Field.Root>
      </VStack>
    </Container>
  );
}
