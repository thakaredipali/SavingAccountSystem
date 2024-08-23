import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View } from 'react-native';

interface DeleteButtonProps {
  onConfirm: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setModalVisible(false);
    onConfirm(); // Call the parent component's delete logic
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete the account?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDelete}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5800EB',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    height:40
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#5800EB',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
