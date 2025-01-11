import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-[88vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={e => setForm({ ...form, username: e })}
            placeholder={"example_09"}
            otherStyles="mt-7"
            keyboardType="username-address"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            placeholder={"example@gamil.com"}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder={"........."}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title={"Sign In"}
            handlePress={handleSubmit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-semibold text-secondary"
            >
              Sing In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
