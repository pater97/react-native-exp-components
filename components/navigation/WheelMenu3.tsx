import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from "react-native";
import { Home, Settings, User, Mail, Heart, Search, Menu, X } from "lucide-react-native";

const WheelMenu3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const menuItems = [
    { icon: <Home size={24} />, label: "Home" },
    { icon: <Settings size={24} />, label: "Settings" },
    { icon: <User size={24} />, label: "Profile" },
    { icon: <Mail size={24} />, label: "Messages" },
    { icon: <Heart size={24} />, label: "Favorites" },
    { icon: <Search size={24} />, label: "Search" },
  ];

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const radius = 120;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <TouchableOpacity
          onPress={toggleMenu}
          style={styles.menuToggleButton}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "90deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Menu size={20} color="#FFF" />
          </Animated.View>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["-90deg", "0deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <X size={20} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Overlay */}
      {isOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}

      {/* Floating Menu */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const angle = (index * 360) / menuItems.length * (Math.PI / 180);
          const translateX = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.cos(angle)],
          });
          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.sin(angle)],
          });

          return (
            <Animated.View
              key={item.label}
              style={[
                styles.menuItem,
                {
                  transform: [
                    { translateX },
                    { translateY },
                    { scale: animation },
                  ],
                  opacity: animation,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.8}
                onPress={() => console.log(item.label)}
              >
                {item.icon}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Center Button */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={[
          styles.centerButton,
          {
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }),
              },
            ],
          },
        ]}
        activeOpacity={0.8}
      >
        <Menu size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    height:Dimensions.get('window').height
  },
  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuToggleButton: {
    width: 40,
    height: 40,
    backgroundColor: "#3498db",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menuContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    position: "absolute",
  },
  iconButton: {
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    elevation: 5,
  },
  centerButton: {
    position: "absolute",
    alignSelf:'center',
    top:Dimensions.get('window').height / 2 - 36,
    width: 72,
    height: 72,
    backgroundColor: "#3498db",
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
});

export default WheelMenu3;
