import React, { useState, useCallback, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./src/components/TaskList/index";
import { createAnimatableComponent } from "react-native-animatable";
import * as Animatable from "react-native-animatable";

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);


  useEffect(()=>{
    async function loadTaks(){
      const taskStorage = await AsyncStorage.getItem("@task");

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTaks() 
  }, [])

  useEffect(()=>{
    async function saveTasks(){
      await AsyncStorage.setItem("@task", JSON.stringify(task))
    }
    saveTasks()
  },[task])

  function handleAdd(){
    if (input === "") {
      alert("Tarefa não pode ser vazia!")
    } else {

      const data = {
        key: input,
        task: input
      };

      setTask([...task, data]);
      setOpen(false)
      setInput("")
    }
  }

  const handleDelete = useCallback((data)=>{ 
    const find = task.filter(r=> r.key !== data.key);
    setTask(find);
  })
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />
      <View>
        <Text style={styles.title}> My Tasks</Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={task}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />
          }

        />

        <AnimatedBtn style={styles.fab} useNativeDriver animation="bounceInUp" duration={1500} onPress={() => { setOpen(true) }}>
          <Ionicons name="ios-add" size={35} color="#fff" />
        </AnimatedBtn>

      </View>




      <Modal animationType="slide" transparent={false} visible={open}>

        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => { setOpen(false) }}>
              <Ionicons name="md-arrow-back" size={40} color="#FFF" style={{}} />
            </TouchableOpacity>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput placeholder="O que você precisa Fazer Hoje?" style={styles.input} multiline={true} autoCorrect={false} value={input} onChangeText={(text) => setInput(text)} />
            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText} >Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>

      </Modal>
    </SafeAreaView>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31"
  },
  title: {
    marginTop: 15,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "#fff"
  },
  fab: {
    position: "absolute",
    backgroundColor: "#0094ff",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    right: 25,
    top: 480,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2
  },
  modal: {
    flex: 10,
    backgroundColor: "#171d31",

  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    backgroundColor: "#fff",
    padding: 9,
    height: 85,
    textAlignVertical: "top",
    color: "#000",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,

  },
  handleAdd: {
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 8
  }
})


