import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage'
import Icon from 'react-native-vector-icons/FontAwesome';

export function Registered({navigation}) {
    const focused = useIsFocused();

    const { getItem, removeItem } = useStorage();

    const [form, setForm] = useState([]);

    const handleRemoveItem = async (index) => {
        const novoForm = [...form];
        const removedItem = novoForm.splice(index, 1)[0];
    
        setForm(novoForm);
        await removeItem('@name', removedItem.name);
        await removeItem('@age', removedItem.age);
        await removeItem('@address', removedItem.address);
        await removeItem('@occupation', removedItem.occupation);
        await removeItem('@email', removedItem.email);
      };

    useEffect( () => {
        async function loadInfos() {
            const names = await getItem("@name");
            const ages = await getItem("@age");
            const addresses = await getItem("@address");
            const occupations = await getItem("@occupation");
            const emails = await getItem("@email");

            let listForm = [];
            for(let i = 0; i < names.length; i++) {
                listForm.push({
                    name: names[i],
                    age: ages[i],
                    address: addresses[i],
                    email: emails[i],
                    occupation: occupations[i],
                });
           }
            setForm(listForm);
        }
        loadInfos();
    }, [focused])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HOME')}>
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.registrationsText}>Cadastros</Text>
        </View>

        <View style={styles.listContent}>
            <FlatList
                data={form}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.listContainer}>
                        
                        <View style={styles.listItem}>
                            <Text style={styles.listText}>{`Nome: ${item.name}`}</Text>
                            <Text style={styles.listText}>{`Idade: ${item.age}`}</Text>
                            <Text style={styles.listText}>{`Endereço: ${item.address}`}</Text>
                            <Text style={styles.listText}>{`Email: ${item.email}`}</Text>
                            <Text style={styles.listText}>{`Ocupação: ${item.occupation}`}</Text>
                        </View>

                        <View style={styles.listButton}>
                            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                                <Icon name="trash" size={30} color="#FF0000" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#708090",
        alignItems: "center",
    },
    backContainer: {
        marginTop: 30,
        width: "95%",
        height: "8%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#C0C0C0"
    },
    backButton: {
        marginLeft: 10,
        width: "25%",
        height: "50%",
        backgroundColor: "#D2691E",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    backText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1C1C",
    },
    registrationsText: {
        marginRight: 100,
        fontSize: 25,
        fontWeight: "bold",
        color: "#1C1C1C",
    },
    listContent: {
        width: "100%",
    },
    listContainer: {
        width: "100%",
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listItem: {
        width: 360,
        margin: 8,
        backgroundColor: "#D2691E",
        borderRadius: 10,
        padding: 5,
    },
    listText: {
        color: "#1C1C1C",
        fontSize: 14,
        fontWeight: "bold",
    },
    listButton: {
        marginRight: 15,
    }
})