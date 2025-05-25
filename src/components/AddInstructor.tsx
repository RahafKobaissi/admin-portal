import { Toaster, toaster } from "@/components/ui/toaster";
import {
  addInstructor,
  addUser,
  getCourses,
  addInstructorCourse,
} from "@/services/api";
import type { Course } from "@/types";
import {
  Button,
  Container,
  createListCollection,
  Field,
  Input,
  Portal,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AddInstructor() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData: Course[] = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        toaster.create({
          title: "Error fetching data",
          type: "error",
          duration: 5000,
        });
        console.log(
          error instanceof Error ? error.message : "Failed to load data"
        );
      }
    };

    fetchData();
  }, []);

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !name || !password) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      await addUser({
        user_id: id,
        password: password,
        role: "instructor",
      });

      await addInstructor({
        id: id,
        name: name,
      });

      await Promise.all(
        selectedCourses.map((course_code) => {
          const record = {
            instructor_id: id,
            course_code: course_code,
          };
          return addInstructorCourse(record);
        })
      );

      toaster.create({
        title: "Instructor added",
        type: "success",
        duration: 3000,
      });

      setId(0);
      setName("");
      setPassword("");
    } catch (error) {
      setId(0);
      setName("");
      setPassword("");
      toaster.create({
        title: "Error adding instructor",
        type: "error",
        duration: 5000,
      });
      console.log(
        error instanceof Error ? error.message : "Failed to add course"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const coursesCollection = createListCollection({
    items: courses.map((c) => ({
      value: c.code,
      label: c.code,
    })),
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Toaster />
        <VStack marginTop={"10%"}>
          <Spinner />
          <Text>Adding Instructor ...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Toaster />
      <VStack marginTop={"5%"}>
        <Field.Root>
          <Field.Label>Id</Field.Label>
          <Input
            name="Id"
            type="number"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
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
          <Field.Label>Password</Field.Label>
          <Input
            name="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Courses</Field.Label>
          <Select.Root
            multiple
            collection={coursesCollection}
            onValueChange={(e) => {
              setSelectedCourses(e.value);
            }}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Courses" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {coursesCollection.items.map((course) => (
                    <Select.Item item={course} key={course.value}>
                      {course.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root>

        <Field.Root required marginTop={"2%"}>
          <Button
            type="submit"
            onClick={handleAddInstructor}
            backgroundColor={"#1e88e5"}
            fontWeight={700}
            _hover={{ backgroundColor: "#4361ee" }}
          >
            Add Instructor
          </Button>
        </Field.Root>
      </VStack>
    </Container>
  );
}
