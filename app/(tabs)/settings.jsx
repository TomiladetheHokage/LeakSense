const styles = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: "#fff"},
    backButton: {marginBottom: 20},
    header: {fontSize: 24, fontWeight: "bold", marginBottom: 20},
    section: {marginBottom: 20},
    sectionTitle: {fontSize: 18, fontWeight: "bold", marginBottom: 10},
    settingRow: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10},
    optionButton: {paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc"},
    logoutButton: {marginTop: 30, backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center"},
    logoutText: {color: "#fff", fontWeight: "bold"},
    modalContainer: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)"},
    modalContent: {backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%"},
    modalTitle: {fontSize: 20, fontWeight: "bold", marginBottom: 10},
    input: {borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginVertical: 10, width: "100%"},
    saveButton: {backgroundColor: "blue", padding: 10, borderRadius: 5, alignItems: "center", marginVertical: 5},
    saveButtonText: {color: "white", fontWeight: "bold"},
    cancelButton: {backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center", marginVertical: 5},
    cancelButtonText: {color: "white", fontWeight: "bold"},
})




import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const Settings = () => {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // State for modals
    const [isGasThresholdModalVisible, setGasThresholdModalVisible] = useState(false);
    const [isManageDevicesModalVisible, setManageDevicesModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [safeGasLevel, setSafeGasLevel] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSaveGasLevel = () => {
        // Add logic to save the safe gas level
        setGasThresholdModalVisible(false);
    };

    const handleSavePassword = () => {
        // Add logic to save the new password
        setChangePasswordModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.header}>Settings</Text>

            {/* Notification Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.settingRow}>
                    <Text>Enable Alerts</Text>
                    <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
                </View>
                <View style={styles.settingRow}>
                    <Text>Sound & Vibration</Text>
                    <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
                </View>
            </View>

            {/* Gas Threshold Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Gas Threshold</Text>
                <TouchableOpacity style={styles.optionButton} onPress={() => setGasThresholdModalVisible(true)}>
                    <Text>Set Safe Gas Level</Text>
                </TouchableOpacity>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <TouchableOpacity style={styles.optionButton} onPress={() => setManageDevicesModalVisible(true)}>
                    <Text>Manage Connected Devices</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => setChangePasswordModalVisible(true)}>
                    <Text>Change Password</Text>
                </TouchableOpacity>
            </View>

            {/* Display Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Display</Text>
                <View style={styles.settingRow}>
                    <Text>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} />
                </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/")}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Gas Threshold Modal */}
            <Modal visible={isGasThresholdModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Set Safe Gas Level</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter safe gas level"
                            value={safeGasLevel}
                            onChangeText={setSafeGasLevel}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveGasLevel}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setGasThresholdModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Manage Devices Modal */}
            <Modal visible={isManageDevicesModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Manage Connected Devices</Text>
                        {/* Add content to manage devices */}
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setManageDevicesModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Change Password Modal */}
            <Modal visible={isChangePasswordModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setChangePasswordModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



export default Settings;
