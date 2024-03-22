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
import { signIn, signOut, fetchAuthSession } from "aws-amplify/auth";

const logo = require("../../assets/images/sign-in-logo.jpg");

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <Button
              ml="auto"
              onPress={async () => {
                console.log("サインイン押下", email, password);
                await signOut({ global: true });
                const result = await signIn({
                  username: email,
                  password: password,
                  options: { authFlowType: "USER_PASSWORD_AUTH" }, // パスワードによる認証はこれを設定しないといけない＆CognitoのアプリクライアントでもALLOW_USER_PASSWORD_AUTHを許可する必要あり
                });
                console.log(JSON.stringify(result));

                const session = await fetchAuthSession();
                console.log(session.tokens?.idToken?.toString()); // これをAuthorizationヘッダに追加すればAPIの認証を突破できる
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
