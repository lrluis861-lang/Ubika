import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated as RNAnimated, TouchableWithoutFeedback, Image } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const { width } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const { theme } = useTheme();
  const [rotation] = useState(new RNAnimated.Value(0));
  const [opacity] = useState(new RNAnimated.Value(0));

  useEffect(() => {
    RNAnimated.loop(
      RNAnimated.timing(rotation, { toValue: 1, duration: 3000, useNativeDriver: true })
    ).start();

    RNAnimated.timing(opacity, { toValue: 1, duration: 3000, useNativeDriver: true }).start();
  }, []);

  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY }],
    opacity,
  };

  const handlePress = () => {
    navigation.replace("Intro");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
        <RNAnimated.Image
          source={require("../assets/images/logo.png")}
          style={[styles.logo, animatedStyle]}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: width * 0.5, height: width * 0.5 },
});