import { View } from "react-native";

import { Container } from "~/components/container";
import ThemedText from "~/components/themed-text";

export default function Settings() {
  return (
    <Container>
      <View>
        <ThemedText>Settings</ThemedText>
      </View>
    </Container>
  );
}
