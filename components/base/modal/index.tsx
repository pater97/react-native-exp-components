// -- REACT
import React, { FC } from "react";
// -- COMPONENTS
import { Modal, View, Text, TouchableOpacity } from "react-native";
// --STYLES
import { styles } from "./modal-style";
// -- TYPE
import { modalProps } from "./modal";

export const CustomModal: FC<modalProps> = ({
  closeDialog,
  confirm,
  confirmText,
  modalVisible,
  title,
  subtitle,
  declineText,
  modalAnim='fade',
  opacityBg=true
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType={modalAnim}
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDialog}
      >
        <View
          style={[
            styles.modalBackground,
            {
              backgroundColor: opacityBg
                ? "rgba(0, 0, 0, 0.5)"
                : undefined,
            },
          ]}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{title}</Text>
            {subtitle && (
              <Text style={styles.modalText}>{subtitle}</Text>
            )}
            <View style={styles.buttonContainer}>
              {declineText && (
                <TouchableOpacity
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={closeDialog}
                >
                  <Text style={[styles.buttonText, styles.declineText]}>
                    {declineText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirm}
              >
                <Text style={[styles.buttonText, styles.confirmText]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
