import { View } from "react-native";

import { Container } from "~/components/container";
import ThemedText from "~/components/themed-text";

export default function Home() {
  return (
    <Container>
      <View>
        <ThemedText>Tasks Page</ThemedText>
      </View>
    </Container>
  );
}
