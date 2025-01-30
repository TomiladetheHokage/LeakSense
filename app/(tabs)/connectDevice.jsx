import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import qs from "qs";

export default function ConnectDevice({ navigation }) {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [buttonText, setButtonText] = useState("Connect"); // State for button text

    const handleConnect = async () => {
        console.log("Connect button pressed"); // Log to check if function is called
        const data = {
            ssid,
            password,
            receiverEmail,
            senderEmail,
            emailPassword,
        };

        try {
            const response = await fetch("http://192.168.4.1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: qs.stringify(data),
            });

            if (response.ok) {
                Alert.alert("Connection Successful", "The device has been successfully connected.");
                setButtonText("Connect"); // Reset button text on success
                // Navigate to another screen if needed
                console.log("Response OK!:", response.status);
                router.push("/home");
            } else {
                Alert.alert("Connection Failed", "Failed to connect to the device.");
                setButtonText("Try Again"); // Change button text on failure
                console.log("Response not OK:", response.status);
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while connecting to the device.");
            setButtonText("Try Again"); // Change button text on error
            console.error("Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Connect to Device</Text>
            <TextInput
                style={styles.input}
                placeholder="SSID"
                value={ssid}
                onChangeText={setSsid}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Sender Email"
                value={senderEmail}
                onChangeText={setSenderEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Receiver Email"
                value={receiverEmail}
                onChangeText={setReceiverEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="App Password"
                value={emailPassword}
                onChangeText={setEmailPassword}
                secureTextEntry
            />
            <Button title={buttonText} onPress={handleConnect} /> {/* Use buttonText state */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
