import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
    // Buscar itens salvos:
    const getItem = async (key) => {
        try {
            const infos = await AsyncStorage.getItem(key);
            return JSON.parse(infos) || [];
        } catch(error) {
            console.log("ERRO AO BUSCAR: ", error);
            return [];
        }
    }

    // Salvar um item no storage:
    const saveItem = async (key, value) => {
        try {
            let infos = await getItem(key);
            infos.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(infos));
        } catch(error) {
            console.log("ERRO AO SALVAR: ", error);
        }
    }

    // Remover algo do storage:
    const removeItem = async (key, item) => {
        try {
            let infos = await getItem(key);
            let myInfos = infos.filter((info) => {
                return (info !== item)
            })
            await AsyncStorage.setItem(key, JSON.stringify(myInfos));
            return myInfos;
        } catch(error) {
            console.log("ERRO AO DELETAR: ", error);
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;