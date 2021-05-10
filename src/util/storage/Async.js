import AsyncStorage from '@react-native-community/async-storage';

class Async {
  static async get(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      return JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  static async set(key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  static async remove(key) {
    await AsyncStorage.removeItem(key);
  }
}

export default Async;
