// import React, { useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Easing,
//   Dimensions,
// } from "react-native";
// import { Menu, Mail, Bell, BedSingle, AirVent, Ban } from "lucide-react-native";

// const WheelMenu2 = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuItems = [
//     { icon: <Mail size={24} color="#000" />, onPress: () => console.log("Home") },
//     { icon: <BedSingle size={24} color="#000" />, onPress: () => console.log("Settings") },
//     { icon: <AirVent size={24} color="#000" />, onPress: () => console.log("Mail") },
//     { icon: <Bell size={24} color="#000" />, onPress: () => console.log("Notifications") },
//     { icon: <Ban size={24} color="#000" />, onPress: () => console.log("Profile") },
//     { icon: <Mail size={24} color="#000" />, onPress: () => console.log("Search") },
//   ];

//   const radius = 100; // Distanza dal pulsante centrale

//   return (
//     <View style={styles.container}>
//       {/* Elementi del menu */}
//       {menuItems.map((item, index) => {
//         const angle = (index * 360) / menuItems.length;
//         const angleRad = (angle * Math.PI) / 180;

//         return (
//           <Animated.View
//             key={index}
//             style={[
//               styles.menuItemContainer,
//               {
//                 transform: isOpen
//                   ? [
//                       { translateX: radius * Math.cos(angleRad) },
//                       { translateY: radius * Math.sin(angleRad) },
//                       { scale: 1 },
//                     ]
//                   : [{ scale: 0 }],
//               },
//             ]}
//           >
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={item.onPress}
//               activeOpacity={0.8}
//             >
//               {item.icon}
//             </TouchableOpacity>
//           </Animated.View>
//         );
//       })}

//       {/* Pulsante centrale */}
//       <TouchableOpacity
//         onPress={toggleMenu}
//         style={styles.menuButton}
//         activeOpacity={0.8}
//       >
//         <Animated.View
//           style={{
//             transform: [
//               {
//                 rotate: isOpen ? "180deg" : "0deg",
//               },
//             ],
//           }}
//         >
//           <Menu size={30} color="#000" />
//         </Animated.View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     height:Dimensions.get('window').height
//   },
//   menuItemContainer: {
//     position: "absolute",
//     zIndex: 0,
//   },
//   menuItem: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   menuButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     zIndex: 10,
//   },
// });

// export default WheelMenu2;

import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, Dimensions, StyleSheet } from "react-native";
import { Menu, Mail, Bell, BedSingle, AirVent, Ban } from "lucide-react-native";

const mainColor = "#3498db"; // Colore centrale del pulsante

const WheelMenu2 = () => {
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
    { icon: <Mail size={24} color="#000" />, onPress: () => console.log("Mail") },
    { icon: <BedSingle size={24} color="#000" />, onPress: () => console.log("BedSingle") },
    { icon: <AirVent size={24} color="#000" />, onPress: () => console.log("AirVent") },
    { icon: <Bell size={24} color="#000" />, onPress: () => console.log("Bell") },
    { icon: <Ban size={24} color="#000" />, onPress: () => console.log("Ban") },
    { icon: <Mail size={24} color="#000" />, onPress: () => console.log("Search") },
  ];

  const radius = 100; // Distanza dal pulsante centrale

  const getTransform = (index: number) => {
    const angle = (index * 360) / menuItems.length * (Math.PI / 180); // Angolo in radianti

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
      outputRange: [0.5, 1], // Ridotto a metà in modalità chiusa
    });

    const opacity = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1], // Opacità crescente
    });

    return {
      transform: [
        { translateX },
        { translateY },
        { scale },
      ],
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <Animated.View
          key={index}
          style={[styles.menuItemContainer, getTransform(index)]}
        >
          <TouchableOpacity
            onPress={item.onPress}
            style={styles.menuItem}
            activeOpacity={0.8}
          >
            {item.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity
        onPress={toggleMenu}
        style={styles.menuButton}
        activeOpacity={0.8}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"], // Rotazione del pulsante centrale
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:Dimensions.get('window').height
  },
  menuItemContainer: {
    position: "absolute",
    zIndex: 0,
  },
  menuItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: mainColor,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
});

export default WheelMenu2