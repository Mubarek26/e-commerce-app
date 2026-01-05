import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Props {
  colorOptions: string[];
  selectedColor: string;
  onColorChange: (value: string) => void;
  sizeOptions: string[];
  selectedSize: string;
  onSizeChange: (value: string) => void;
}

const VariantSelector = ({
  colorOptions,
  selectedColor,
  onColorChange,
  sizeOptions,
  selectedSize,
  onSizeChange,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Colors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorRow}>
        {colorOptions.map((color) => {
          const isActive = color === selectedColor;
          return (
            <TouchableOpacity
              key={color}
              style={[styles.colorDot, { backgroundColor: color }, isActive && styles.colorDotActive]}
              onPress={() => onColorChange(color)}
              activeOpacity={0.85}
            />
          );
        })}
      </ScrollView>

      <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Size</Text>
      <View style={styles.sizeRow}>
        {sizeOptions.map((size) => {
          const isActive = size === selectedSize;
          return (
            <TouchableOpacity
              key={size}
              style={[styles.sizeChip, isActive && styles.sizeChipActive]}
              onPress={() => onSizeChange(size)}
              activeOpacity={0.85}
            >
              <Text style={[styles.sizeText, isActive && styles.sizeTextActive]}>{size}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default VariantSelector;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  colorDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDotActive: {
    borderColor: '#111',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  sizeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  sizeChipActive: {
    borderColor: '#111',
    backgroundColor: '#111',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  sizeTextActive: {
    color: '#fff',
  },
});
