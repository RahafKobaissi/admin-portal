import {
  Button,
  CloseButton,
  Container,
  Field,
  FileUpload,
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { addStudent, addUser } from "@/services/api";
import { LuFileUp } from "react-icons/lu";

export default function AddStudent() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [stClass, setStClass] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState<File>();

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !name || !age || !stClass || !password) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
        duration: 3000,
      });
      return;
    }

    const safePattern = /^[a-zA-Z0-9@$!_]+$/;
    const idValid = safePattern.test(id.toString());
    const nameValid = safePattern.test(name);
    const ageValid = safePattern.test(age.toString());
    const stClassValid = safePattern.test(stClass);
    const passwordValid = safePattern.test(password);

    if (
      !idValid ||
      !nameValid ||
      !ageValid ||
      !stClassValid ||
      !passwordValid
    ) {
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
      const newUser = await addUser({
        user_id: id,
        password: password,
        role: "student",
      });

      console.log(newUser);

      const newStudent = await addStudent({
        id: id,
        name: name,
        age: age,
        class: stClass,
      });

      console.log(newStudent);

      const response = await fetch(
        `https://enrollstudents.azurewebsites.net/api/enrollStudent?student_id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": img ? img.type : "application/octet-stream",
          },
          body: img,
        }
      );

      const data = await response.text();
      console.log(data);

      toaster.create({
        title: "Student added",
        type: "success",
        duration: 3000,
      });

      setId(0);
      setAge(0);
      setName("");
      setStClass("");
      setPassword("");
    } catch (error) {
      setId(0);
      setAge(0);
      setName("");
      setStClass("");
      setPassword("");
      toaster.create({
        title: "Error adding student",
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

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Toaster />
        <VStack marginTop={"10%"}>
          <Spinner />
          <Text>Adding Student ...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <Toaster />
      <VStack marginTop={"5%"}>
        <Field.Root>
          <Field.Root marginTop={"1%"}>
            <Field.Label fontSize={"1rem"} fontWeight={600}>
              Id
            </Field.Label>
            <Input
              name="Id"
              type="number"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value))}
            />
          </Field.Root>

          <Field.Root marginTop={"1%"}>
            <Field.Label fontSize={"1rem"} fontWeight={600}>
              Name
            </Field.Label>
            <Input
              name="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>

          <Field.Root marginTop={"1%"}>
            <Field.Label fontSize={"1rem"} fontWeight={600}>
              Age
            </Field.Label>
            <Input
              name="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </Field.Root>

          <Field.Root marginTop={"1%"}>
            <Field.Label fontSize={"1rem"} fontWeight={600}>
              Class
            </Field.Label>
            <Input
              name="Class"
              type="text"
              value={stClass}
              onChange={(e) => setStClass(e.target.value)}
            />
          </Field.Root>

          <Field.Root marginTop={"1%"}>
            <Field.Label fontSize={"1rem"} fontWeight={600}>
              Password
            </Field.Label>
            <Input
              name="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>

          <FileUpload.Root
            marginTop={"1%"}
            gap="1"
            accept="image/jpeg"
            onFileChange={(e) => {
              setImg(e.acceptedFiles[0]);
            }}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Label fontSize={"1rem"} fontWeight={600}>
              Upload file
            </FileUpload.Label>
            <InputGroup
              startElement={<LuFileUp />}
              endElement={
                <FileUpload.ClearTrigger asChild>
                  <CloseButton
                    me="-1"
                    size="xs"
                    variant="plain"
                    focusVisibleRing="inside"
                    focusRingWidth="2px"
                    pointerEvents="auto"
                  />
                </FileUpload.ClearTrigger>
              }
            >
              <Input asChild>
                <FileUpload.Trigger>
                  <FileUpload.FileText lineClamp={1} />
                </FileUpload.Trigger>
              </Input>
            </InputGroup>
          </FileUpload.Root>

          <Field.Root required marginTop={"2%"}>
            <Button
              type="submit"
              onClick={handleAddStudent}
              backgroundColor={"#1e88e5"}
              fontWeight={700}
              _hover={{ backgroundColor: "#4361ee" }}
            >
              Add Student
            </Button>
          </Field.Root>
        </Field.Root>
      </VStack>
    </Container>
  );
}
