import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import {DATASOURCE} from './database/datasource'
import {Item} from './database/entities/Item'
import {DatabaseService} from './database/database-service'

export const App = () => {
  const [text, setText] = useState('')
  const [items, setItems] = useState<Item[]>([])

  const getItems = async () => {
    const repo = DATASOURCE.getRepository(Item)
    setItems(await repo.find())
  }

  const addItem = async (name: string) => {
    const repo = DATASOURCE.getRepository(Item)
    await repo.save({name})
    setItems(await repo.find())
  }

  useEffect(() => {
    const main = async () => {
      if (!DATASOURCE.isInitialized) {
        console.log('Initializing datasource')
        try {
          await DATASOURCE.initialize()
          await getItems()
        } catch (err) {
          console.error('Error while initializing the database', err)
        }
      }
    }
    main()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {items.map((item) => {
        return (
          <View style={styles.item} key={item.id}>
            <Text>{item.name}</Text>
          </View>
        )
      })}

      <TextInput
        onChangeText={(text) => setText(text)}
        onSubmitEditing={async () => {
          await addItem(text)
          setText('')
        }}
        placeholder="Name?"
        style={styles.input}
        value={text}
      />

      <Button
        title="Export database"
        onPress={DatabaseService.exportDatabase}
      />
      <Button
        title="Import database"
        onPress={DatabaseService.importDatabase}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  input: {
    borderColor: '#111',
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  item: {borderColor: '#555', borderWidth: 1, padding: 8, margin: 8},
})
