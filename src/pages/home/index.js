import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity,
         Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useStorage from '../../hooks/useStorage'

export function Home({navigation}) {

  const { saveItem } = useStorage();

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');

  async function saveInfos() {
    setModalVisible(!modalVisible)
    await saveItem("@name", name);
    await saveItem("@age", age);
    await saveItem("@address", address);
    await saveItem("@occupation", occupation);
    await saveItem("@email", email);
  }

  function openModal() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>

        <Image
        source={require("../../assets/logo.jpeg")}
        style={styles.logo}
        />

      <TouchableOpacity style={styles.button} onPress={ () => openModal() }>
        <Text style={styles.textButton}>Cadastrar</Text>
        <Icon name="pencil" size={30} color="#1C1C1C" style={{ marginLeft: 30, }}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CADASTROS')}>
        <Text style={styles.textButton}>Cadastros</Text>
        <Icon name='file' size={25} color="#1C1C1C" style={{ marginLeft: 30, }}/>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>

          <View style={styles.containerModal}>
            <View style={styles.closeModal}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="times" size={30} color="#1C1C1C" />
              </TouchableOpacity>
              <Text style={styles.textModal}>Preencha os dados!</Text>
            </View>
            
            <SafeAreaView style={styles.inputContainer}>
              <Text style={styles.inputText}>Nome:</Text>
              <TextInput
                style={styles.inputButton}
                onChangeText={(text) => setName(text)}
                placeholder="Ex.: Luan Henrique da Silva Barbosa"
              />
              <Text style={styles.inputText}>Idade:</Text>
              <TextInput
                style={styles.inputButton}
                onChangeText={(number) => setAge(number)}
                placeholder="Ex.: 19"
                keyboardType='numeric'
              />
              <Text style={styles.inputText}>Endereço:</Text>
              <TextInput
                style={styles.inputButton}
                onChangeText={(text) => setAddress(text)}
                placeholder="Ex.: R. das Flores, Bairro Cruzeiro, n° 48"
              />
              <Text style={styles.inputText}>Email:</Text>
              <TextInput
                style={styles.inputButton}
                onChangeText={(text) => setEmail(text)}
                placeholder="Ex.: luan112004@gmail.com"
              />
              <Text style={styles.inputText}>Ocupação:</Text>
              <TextInput
                style={styles.inputButton}
                onChangeText={(text) => setOccupation(text)}
                placeholder="Ex.: Advogado"
              />
            </SafeAreaView>

            <View style={styles.sendContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={() => saveInfos()}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>

      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#708090",
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginTop: 100,
        marginBottom: 100,
    },
    button: {
        width: "90%",
        height: 60,
        marginBottom: 80,
        backgroundColor: "#D2691E",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    textButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1C1C"
    },
    containerModal: {
      borderRadius: 8,
      width: "85%",
      height: "90%",
      backgroundColor: "#C0C0C0",
      margin: 30,
    },
    closeModal: {
      flexDirection: "row",
    },
    closeButton: {
      width: 40,
      marginLeft: 20,
      marginTop: 20,
    },
    textModal: {
      color: "#1C1C1C",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 22,
      marginLeft: 30,
    },
    inputContainer: {
      margin: 5,
      marginTop: 50,
    },
    inputButton: {
      fontSize: 15,
      width: "93%",
      height: 40,
      backgroundColor: "#808080",
      fontWeight: 'bold',
      marginBottom: 30,
      marginLeft: 13,
      borderRadius: 5,
      paddingLeft: 5,
    },
    inputText: {
      marginLeft: 25,
      color: "#000",
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 5,
    },
    sendContainer: {
      alignItems: "flex-end",
      marginTop: 30,
      marginRight: 40,
    },
    sendButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4682B4",
      width: 100,
      height: 40,
      borderRadius: 10,
    },
    sendButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#363636",
    }
})