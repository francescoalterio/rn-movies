import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, View, Text } from "react-native";

interface Props {
  bannerUrl: string;
  name: string;
}

export default function ActorCard({ bannerUrl, name }: Props) {
  return (
    <View style={{ gap: 5 }}>
      <View style={styles.container}>
        <Image source={{ uri: bannerUrl }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
    aspectRatio: 2 / 3,
  },

  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    color: Colors.text,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});
