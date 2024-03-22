import {
  FormControl,
  VStack,
  Input,
  InputField,
  Button,
  Pressable,
  Heading,
  Box,
  ButtonText,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Keyboard, Platform } from "react-native";

// リンクメールを使えればこのページは不要
export default function SignUpConfirm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

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
            <VStack space="xs">
              <Heading size="sm" color="$textLight900">
                E-mail
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type="text"
                  keyboardType="email-address"
                  autoCapitalize="none" // 自動大文字入力をOFF
                  value={email}
                  onChangeText={(text: string) => {
                    setEmail(text);
                  }}
                />
              </Input>
            </VStack>
            <VStack space="xs">
              <Heading size="sm" color="$textLight900">
                Code
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type="text"
                  keyboardType="default"
                  autoCapitalize="none" // 自動大文字入力をOFF
                  value={code}
                  onChangeText={(text: string) => {
                    setCode(text);
                  }}
                />
              </Input>
            </VStack>
            <Button
              ml="auto"
              onPress={() => {
                console.log(email);
                console.log(code);
              }}
            >
              <ButtonText color="$white">Confirm</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </Pressable>
  );
}
