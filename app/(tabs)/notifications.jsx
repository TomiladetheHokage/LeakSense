import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const THRESHOLD_VALUE = 50;

const Notifications = ({ notifications = [] }) => {
    const router = useRouter();

    console.log("Notifications received:", notifications);

    const filteredNotifications = Array.isArray(notifications)
        ? notifications.filter((item) => item.gasLevel > THRESHOLD_VALUE)
        : [];

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.header}>Notifications</Text>

            {filteredNotifications.length > 0 ? (
                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.notificationBox, styles[item.severity]]}>
                            <Text style={styles.message}>{item.message}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noNotifications}>No new alerts</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    notificationBox: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#ffcccc", // Red for high alert
    },
    message: {
        fontSize: 16,
        fontWeight: "bold",
    },
    time: {
        fontSize: 14,
        color: "gray",
    },
    noNotifications: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginTop: 20,
    },
});

export default Notifications;


// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
//
// const THRESHOLD_VALUE = 950;
//
// const Notifications = () => {
//     const router = useRouter();
//
//     // Simulated gas level data
//     const [notifications, setNotifications] = useState([]);
//
//     useEffect(() => {
//         // Simulate a gas leak after 5 seconds
//         setTimeout(() => {
//             setNotifications([
//                 { id: "1", message: "⚠️ High Gas Level Detected!", gasLevel: 975, time: "Just now", severity: "high" },
//                 { id: "2", message: "⚠️ Dangerous Gas Levels!", gasLevel: 990, time: "1 min ago", severity: "critical" },
//             ]);
//         }, 5000);
//     }, []);
//
//     const filteredNotifications = notifications.filter((item) => item.gasLevel > THRESHOLD_VALUE);
//
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//                 <Ionicons name="arrow-back" size={24} color="black" />
//             </TouchableOpacity>
//
//             <Text style={styles.header}>Notifications</Text>
//
//             {filteredNotifications.length > 0 ? (
//                 <FlatList
//                     data={filteredNotifications}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={[styles.notificationBox, styles[item.severity]]}>
//                             <Text style={styles.message}>{item.message}</Text>
//                             <Text style={styles.time}>{item.time}</Text>
//                         </View>
//                     )}
//                 />
//             ) : (
//                 <Text style={styles.noNotifications}>No new alerts</Text>
//             )}
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
//     backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
//     header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
//     notificationBox: { padding: 15, borderRadius: 10, marginBottom: 10, backgroundColor: "#ffcccc" },
//     message: { fontSize: 16, fontWeight: "bold" },
//     time: { fontSize: 14, color: "gray" },
//     noNotifications: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
// });
//
// export default Notifications;
