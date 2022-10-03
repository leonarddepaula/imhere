import React, { useState } from 'react'

import { Text, View, TextInput, TouchableOpacity, FlatList, Alert  } from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, SetParticipantName] = useState('',)
  
  function handleParticipantAdd() {
    if(participants.includes(participantName)){
     return Alert.alert("Participante Existe"," Já Existe esse nome na Lista")
    }
    //console.log("clicou no botão Add");
    setParticipants(prevState => [...prevState, participantName])
    SetParticipantName('')
    
  }

  function handleParticipantremove(name: string){
    

    
    Alert.alert("Remover", `Deseja remover ${name} da Lista?`, [
      {
        text: 'sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },

      {
        text:' Não',
        style: 'cancel'
      }

    ])
    //console.log(`Clicou no botão de remover ${name}`)
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sábado, 01 de Outubro 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={SetParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants} 
        keyExtractor={item =>item}
        renderItem={({ item }) => (
         <Participant 
            key={item}
            name={item}
            onRemove={() => handleParticipantremove(item)} 
          />   
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent = {()=> (
          <Text style={styles.listEmpyText}>
            Adicione participantes a sua lista
          </Text>
        )}
      />
    </View>
  );
}
