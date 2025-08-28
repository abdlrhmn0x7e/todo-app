import { View } from "react-native";
import { LogOutIcon } from "lucide-react-native";

import { Container } from "~/components/container";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { authClient } from "~/utils/auth";

export default function Settings() {
  return (
    <Container>
      <View className="flex gap-4">
        <ThemedText>Settings</ThemedText>
        <Button onPress={() => authClient.signOut()}>
          <Button.Icon Icon={LogOutIcon} />
          <Button.Text>Logout</Button.Text>
        </Button>
      </View>
    </Container>
  );
}
