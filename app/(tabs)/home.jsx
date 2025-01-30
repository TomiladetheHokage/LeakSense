import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch, Image, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo

export default function App() {
    const [isFlameDetectorOn, setFlameDetectorOn] = useState(false);
    const [isGasDetectorOn, setGasDetectorOn] = useState(false);
    const [gasLevel, setGasLevel] = useState(null); // State for gas level
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator
    const [gasData, setGasData] = useState([0, 0, 0, 0, 0, 0, 0]); // Dummy data for gas levels


    useEffect(() => {
        const interval = setInterval(() => {
            fetchGasLevel();
        }, 5000); // Fetch gas level every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchGasLevel = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://192.168.137.100/gasReading");
            const text = await response.text();
            const level = extractGasLevel(text);
            setGasLevel(level);
        } catch (error) {
            console.error("Error fetching gas level:", error);
            setGasLevel(null);
        }
        setIsLoading(false);
    };

    const extractGasLevel = (html) => {
        const match = html.match(/Current Gas Level: (\d+)/);
        return match ? parseInt(match[1], 10) : null;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Leak Sense</Text>
            <Image
                source={{ uri: "https://img.icons8.com/emoji/96/fire-emoji.png" }}
                style={styles.icon}
            />

            {/* Real-time Gas Level Graph */}
            <Text style={styles.sectionTitle}>Gas Level Over Time</Text>
            <LineChart
                data={{
                    labels: ["1", "2", "3", "4", "5", "6", "7"],
                    datasets: [
                        {
                            data: gasData,
                        },
                    ],
                }}
                width={Dimensions.get("window").width -20} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=" ppm"
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />

            {/* Alerts and Notifications */}
            <Text style={styles.sectionTitle}>Gas Reading</Text>
            {isLoading ? (
                <View style={styles.alertBox4}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.alertText}>Loading gas levels...</Text>
                </View>
            ) : gasLevel === null ? (
                <View style={styles.alertBox2}>
                    <Text style={styles.alertText}>No gas levels available.</Text>
                </View>
            ) : gasLevel > 950 ? (
                <View style={styles.alertBox}>
                    <Text style={styles.alertText}>Warning: High Gas Level Detected!<br/>    Gas Reading: {gasLevel}ppm</Text>
                </View>
            ) : (
                <View style={styles.alertBox3}>
                    <Text style={styles.alertText}>Gas levels are normal: {gasLevel} ppm</Text>
                </View>
            )}


            {/* Switch Toggles */}
            <View style={styles.grid}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/fire-element.png" }}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardTitle}>Flame Detector</Text>
                    <Switch
                        value={isFlameDetectorOn}
                        onValueChange={setFlameDetectorOn}
                    />
                </View>
                <View style={styles.card}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/gas.png" }}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardTitle}>Gas Detector</Text>
                    <Switch
                        value={isGasDetectorOn}
                        onValueChange={setGasDetectorOn}
                    />
                </View>
            </View>

            {/* Menu Bar */}
            <View style={styles.menuBar}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("connectDevice")}>
                    <Ionicons name="wifi-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Connect to Device</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="log-out-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
        padding: 20,
        paddingBottom: 60,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
    },
    icon: {
        width: 50,
        height: 50,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    alertBox: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    alertBox2:{
        backgroundColor: "black",
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    alertBox3:{
        backgroundColor: "green",
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    alertBox4:{
        backgroundColor: "brown",
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    alertText: {
        color: "#fff",
        fontWeight: "bold",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "90%",
    },
    card: {
        width: "45%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    cardIcon: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    profileCard: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    profileIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    sectionTitle2:{
        color: "white",
    },
    gasLevelBox: {
        padding: 20,
        borderRadius: 10,
    },
    gasLevelText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        bottom: 0,
        position: "absolute",
    },
    menuItem: {
        alignItems: "center",
    },
    menuText: {
        fontSize: 12,
        marginTop: 5,
    },
});



