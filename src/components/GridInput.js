import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const GridInput = ({ gridData, handleInputChange, rows, columns }) => {
  const renderGrid = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput style={[styles.cell, styles.columnHeader]} editable={false} />
          {columns.map((column, colIndex) => (
            <TextInput
              key={`col-${colIndex}`}
              style={[styles.cell, styles.columnHeader]}
              value={column}
              editable={false}
            />
          ))}
        </View>
        {gridData.map((rowData, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            <TextInput
              style={[styles.cell, styles.rowHeader]}
              value={(rowIndex + 1).toString()}
              editable={false}
            />
            {rowData.map((colData, colIndex) => (
              <TextInput
                key={`col-${rowIndex}-${colIndex}`}
                style={styles.cell}
                value={colData}
                onChangeText={(text) => handleInputChange(rowIndex, colIndex, text)}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return renderGrid();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  rowHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GridInput;
