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

    const safePattern = /^[a-zA-Z0-9@$!_ ]+$/;
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
      <Container
        maxW="md"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        mt={12}
      >
        <Toaster />
        <VStack gap={4} mt={8}>
          <Spinner size="lg" color="blue.500" />
          <Text fontSize="lg" fontWeight="medium">
            Adding Course...
          </Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container bg="white" p={8} borderRadius="md" boxShadow="lg" mt={12}>
      <Toaster />
      <VStack>
        <Field.Root>
          <Field.Label
            fontSize="1.1rem"
            fontWeight={600}
            mb={1}
            color="gray.700"
          >
            Code
          </Field.Label>
          <Input
            name="Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter course code"
            bg="gray.50"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        <Field.Root marginTop={"1%"}>
          <Field.Label
            fontSize="1.1rem"
            fontWeight={600}
            mb={1}
            color="gray.700"
          >
            Name
          </Field.Label>
          <Input
            name="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter course name"
            bg="gray.50"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        <Field.Root marginTop={"1%"}>
          <Field.Label
            fontSize="1.1rem"
            fontWeight={600}
            mb={1}
            color="gray.700"
          >
            Class
          </Field.Label>
          <Input
            name="Class"
            type="text"
            value={courseClass}
            onChange={(e) => setCourseClass(e.target.value)}
            placeholder="e.g., I4"
            bg="gray.50"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        <Field.Root marginTop={"1%"}>
          <Field.Label
            fontSize="1.1rem"
            fontWeight={600}
            mb={1}
            color="gray.700"
          >
            Credits
          </Field.Label>
          <Input
            name="Credits"
            type="number"
            value={credits}
            onChange={(e) => setCredits(parseInt(e.target.value))}
            placeholder="Enter credits"
            bg="gray.50"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        <Field.Root marginTop={"1%"}>
          <Button
            type="submit"
            backgroundColor="blue.500"
            color="white"
            fontWeight={700}
            _hover={{ backgroundColor: "blue.600" }}
            w="50%"
            py={4}
            mt={4}
            onClick={handleAddCourse}
            alignSelf={"center"}
          >
            Add Course
          </Button>
        </Field.Root>
      </VStack>
    </Container>
  );
}
