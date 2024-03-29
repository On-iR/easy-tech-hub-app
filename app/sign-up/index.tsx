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
  Pressable,
  Heading,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Keyboard, Platform } from "react-native";
import { signUp } from "aws-amplify/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const switchShowPassword = () => {
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
                Password
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type={showPassword ? "text" : "password"}
                  keyboardType="default"
                  value={password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                  }}
                />
                <InputSlot pr="$3" onPress={switchShowPassword}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </VStack>
            <VStack space="xs">
              <Heading size="sm" color="$textLight900">
                Confirm Password
              </Heading>
              <Input w="$80" borderColor="$borderLight500">
                <InputField
                  type={showPassword ? "text" : "password"}
                  keyboardType="default"
                  value={confirmPassword}
                  onChangeText={(text: string) => {
                    setConfirmPassword(text);
                  }}
                />
                <InputSlot pr="$3" onPress={switchShowPassword}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </VStack>
            <Button
              ml="auto"
              onPress={async () => {
                console.log(
                  "サインアップ押下",
                  email,
                  password,
                  confirmPassword
                );

                if (password !== confirmPassword) {
                  console.log("パスワード不一致");
                  return;
                }
                // Cognitoの設定なのか登録メソッド読んだらリンクメールが飛んできた。もうすこし設定やら挙動を確認する必要ありそう
                const result = await signUp({
                  username: email,
                  password: password,
                });
                console.log(JSON.stringify(result));
              }}
            >
              <ButtonText color="$white">SignUp</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </Pressable>
  );
}
