import {
  FormControl,
  VStack,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  ButtonText,
  Button,
  EyeIcon,
  EyeOffIcon,
  Box,
  Image,
  Center,
  Heading,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { router } from "expo-router";

const logo = require("../../assets/images/sign-in-logo.jpg");

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <FormControl maxWidth="$80" rounded="$md">
        <VStack space="2xl">
          <Center>
            <Image h="$80" w="$80" alt="sign-in-logo" source={logo} />
          </Center>
          <VStack space="xs">
            <Heading size="sm" color="$textLight900">
              E-mail
            </Heading>
            <Input borderColor="$borderLight500">
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Heading size="sm" color="$textLight900">
              Password
            </Heading>
            <Input borderColor="$borderLight500">
              <InputField type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            ml="auto"
            onPress={() => {
              router.push("/home/");
            }}
          >
            <ButtonText color="$white">SignIn</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
}
