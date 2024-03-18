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
  Pressable,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Alert } from "react-native";

const logo = require("../../assets/images/sign-in-logo.jpg");

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    // キーボード外をタップしてキーボードをしまえるようにする
    <Pressable
      flex={1}
      onPress={() => {
        // 入力ができなくなるためWebでは実行しない
        if (Platform.OS === "ios" || Platform.OS === "android") {
          Keyboard.dismiss();
        }
      }}
    >
      <Box flex={1} alignItems="center" mt="$20">
        <FormControl maxWidth="$80" rounded="$md">
          <VStack space="2xl">
            <Center>
              <Image h="$32" w="$32" alt="sign-in-logo" source={logo} />
            </Center>
            <VStack space="xs">
              <Heading size="sm" color="$textLight900">
                E-mail
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type="text"
                  keyboardType="email-address"
                  autoCapitalize="none" // 自動大文字入力をOFF
                />
              </Input>
            </VStack>
            <VStack space="xs">
              <Heading size="sm" color="$textLight900">
                Password
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type={showPassword ? "text" : "password"}
                  keyboardType="default"
                />
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
                Alert.alert("ボタンが押されました");
              }}
            >
              <ButtonText color="$white">SignIn</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </Pressable>
  );
}
