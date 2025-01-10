import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-black-100">
      <Text className={"text-3xl font-pblack text-center"}>Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-center text-blue-600">
        Go to Home
      </Link>
    </View>
  );
}
