import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ExcelGenerator from './src/utils/ExcelGenerator';
import GridInput from './src/components/GridInput';
import Navbar from './src/components/Navbar';
import XLSX from 'xlsx';

const ROWS = 10;
const COLUMNS = ['A', 'B', 'C', 'D', 'E'];


export default function App() {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    loadDataFromStorage();
    initializeGridData();
  }, []);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
    saveDataToStorage(updatedGridData);
  };

  const handleDownload = async () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(gridData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

      const fileUri = FileSystem.documentDirectory + 'gridData.xlsx';

      await FileSystem.writeAsStringAsync(fileUri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const permission = await Sharing.isAvailableAsync();
      if (permission) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Sharing not available', 'Unable to share the Excel file.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the Excel file.');
    }
  };

  const initializeGridData = () => {
    const initialData = [];
    for (let i = 0; i < ROWS; i++) {
      initialData.push(new Array(COLUMNS).fill(''));
    }
    setGridData(initialData);
  };

  const saveDataToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('gridData', JSON.stringify(data));
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the data.');
    }
  };

  const loadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('gridData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setGridData(parsedData);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while loading the data.');
    }
  };

  return (
    <View style={styles.container}>
      <Navbar onDownload={handleDownload} />
      <GridInput gridData={gridData} handleInputChange={handleInputChange} rows={ROWS} columns={COLUMNS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
