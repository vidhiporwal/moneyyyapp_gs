import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Navbar = ({ onDownload }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Google Sheets Clone</Text>
      <TouchableOpacity onPress={onDownload} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navbar;
