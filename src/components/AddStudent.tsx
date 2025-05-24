import {
  Button,
  CloseButton,
  Container,
  Field,
  FileUpload,
  HStack,
  Input,
  InputGroup,
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

    try {
      setIsLoading(true);

      const newUser = await addUser({
        user_id: id,
        username: name,
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
        `${import.meta.env.VITE_FUNCTION_URL}?student_id=${id}`,
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

      setIsLoading(false);
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
      setIsLoading(false);
    } catch (error) {
      setId(0);
      setAge(0);
      setName("");
      setStClass("");
      setPassword("");
      setIsLoading(false);
      setIsLoading(false);
      toaster.create({
        title: "Error adding student",
        description:
          error instanceof Error ? error.message : "Failed to add student",
        type: "error",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Adding Student ...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Toaster />
      <Text fontSize={"2rem"} fontWeight={800}>
        Add Student
      </Text>
      <VStack marginTop={"5%"}>
        <Field.Root>
          <HStack width={"100%"}>
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
          </HStack>

          <HStack width={"100%"}>
            <Field.Root>
              <Field.Label>Age</Field.Label>
              <Input
                name="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Class</Field.Label>
              <Input
                name="Class"
                type="text"
                value={stClass}
                onChange={(e) => setStClass(e.target.value)}
              />
            </Field.Root>
          </HStack>

          <HStack width={"100%"}>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                name="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>

            <FileUpload.Root
              gap="1"
              accept="image/jpeg"
              onFileChange={(e) => {
                console.log(
                  e.acceptedFiles[0].bytes().then((e) => console.log(e))
                );
                setImg(e.acceptedFiles[0]);
              }}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Label>Upload file</FileUpload.Label>
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
          </HStack>

          <Field.Root required marginTop={"2%"}>
            <Button
              type="submit"
              onClick={handleAddStudent}
              backgroundColor={"#0db39e"}
              fontWeight={700}
              _hover={{ backgroundColor: "#06d6a0" }}
            >
              Add Student
            </Button>
          </Field.Root>
        </Field.Root>
      </VStack>
    </Container>
  );
}
