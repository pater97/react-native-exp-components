import { Menu,  Mail, Bell, BedSingle,AirVent,Ban } from "lucide-react-native";
import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, Dimensions } from "react-native";
import { mainColor } from "@/constants/Colors";

const WheelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };
  const menuItems = [
    {
      icon: <Mail size={24} color="#000" />,
      onPress: () => console.log("Home"),
    },
    {
      icon: <BedSingle size={24} color="#000" />,
      onPress: () => console.log("Settings"),
    },
    {
      icon: <AirVent size={24} color="#000" />,
      onPress: () => console.log("Mail"),
    },
    {
      icon: <Bell size={24} color="#000" />,
      onPress: () => console.log("Notifications"),
    },
    {
      icon: <Ban size={24} color="#000" />,
      onPress: () => console.log("Profile"),
    },
    {
      icon: <Mail size={24} color="#000" />,
      onPress: () => console.log("Search"),
    },
  ];
  const getTransform = (index:any) => {
    const angle = index * (360 / menuItems.length) * (Math.PI / 180);
    const radius = 100;
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, radius * Math.cos(angle)],
    });
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, radius * Math.sin(angle)],
    });
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    const rotate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    const opacity = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    return {
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale,
        },
        {
          rotate,
        },
      ],
      opacity,
    };
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height:Dimensions.get('window').height
      }}
    >
      {menuItems.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            {
              position: "absolute",
              zIndex: 0,
            },
            getTransform(index),
          ]}
        >
          <TouchableOpacity
            onPress={item.onPress}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {item.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity
        onPress={toggleMenu}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: mainColor,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 1,
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          }}
        >
          <Menu size={30} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
export default WheelMenu;

