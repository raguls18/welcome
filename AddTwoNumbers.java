import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    if (!age || !height || !weight || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      Alert.alert('Error', 'Enter valid numbers');
      return;
    }

    let bmi = (w / ((h / 100) ** 2)).toFixed(2);

    let status = '';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi <= 24.9) status = 'Healthy';
    else if (bmi <= 29.9) status = 'Overweight';
    else status = 'Obese';

    setResult(`BMI: ${bmi} (${status})`);
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>BMI Calculator</Text>

      <TextInput
        placeholder="Age"
        placeholderTextColor="#aaa"
        style={s.i}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        placeholder="Height (cm)"
        placeholderTextColor="#aaa"
        style={s.i}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        placeholder="Weight (kg)"
        placeholderTextColor="#aaa"
        style={s.i}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <View style={s.row}>
        {['M', 'F'].map((x) => (
          <TouchableOpacity
            key={x}
            style={[s.b, gender === x && s.sel]}
            onPress={() => setGender(x)}
          >
            <Text style={s.tx}>{x === 'M' ? 'Male' : 'Female'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={s.btn} onPress={calc}>
        <Text style={s.bt}>Calculate</Text>
      </TouchableOpacity>

      <Text style={s.r}>{result}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000' },
  t: { color: '#0af', fontSize: 26, textAlign: 'center', marginBottom: 10 },
  i: { borderWidth: 1, borderColor: '#0af', color: '#fff', margin: 6, padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  b: { borderWidth: 1, borderColor: '#0af', padding: 8, borderRadius: 6 },
  sel: { backgroundColor: '#0af' },
  tx: { color: '#fff' },
  btn: { backgroundColor: '#0af', padding: 10, marginTop: 10, alignItems: 'center', borderRadius: 6 },
  bt: { fontWeight: 'bold', color: '#000' },
  r: { color: '#fff', textAlign: 'center', marginTop: 10 }
});
