import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function App() {

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = ()=>{
    
    const hei = height / 100;
    const imc = weight/(hei * hei);
    
    if(imc < 18.6){
      alert("Você está abaixo do peso! " + imc.toFixed(2));
    }else if(imc >= 18.6 && imc < 24.9){
      alert("Seu peso é ideal! " +  imc.toFixed(2));
    }else if(imc >= 24.9 && imc < 34.9){
      alert("Seu peso é ideal! " +  imc.toFixed(2));
    }else{
      alert("Você está acima do peso! " +  imc.toFixed(2));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcule seu IMC</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={(weight) => { setWeight(weight) }}
        placeholder="Peso(kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={(height) => { setHeight(height) }}
        placeholder="Altura (com)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText} >
          Calcular
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 30

  },
  input: {
    backgroundColor: "#121212",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    color: "#FFF",
    fontSize: 23
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    backgroundColor: "#41Aef4",
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 25
  }
})