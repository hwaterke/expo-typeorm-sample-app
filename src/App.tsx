import {Button, StyleSheet, Text, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React, {useEffect} from 'react'
import {DATASOURCE} from './database/datasource'
import {Item} from './database/entities/Item'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import * as DocumentPicker from 'expo-document-picker'

export const App = () => {
  useEffect(() => {
    const main = async () => {
      console.log('Running main')
      if (!DATASOURCE.isInitialized) {
        console.log('Initializing datasource')
        await DATASOURCE.initialize()
      }

      console.log(DATASOURCE.isInitialized)

      const repo = DATASOURCE.getRepository(Item)

      console.log('repo ok')

      try {
        const a = await repo.save({name: 'Bob'})
        console.log(a)
      } catch (err) {
        console.log(err)
      }

      const d = await repo.find()
      console.log(d)
    }
    main()
  }, [])

  const importDatabase = async () => {
    // Close the current database
    await DATASOURCE.destroy()

    // Import file
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })

    if (file.type === 'success') {
      if (
        !(
          await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')
        ).exists
      ) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + 'SQLite'
        )
      }
      await FileSystem.copyAsync({
        from: file.uri,
        to: FileSystem.documentDirectory + 'SQLite/app.db',
      })
    }

    // Restart the datasource
    await DATASOURCE.initialize()
  }

  const exportDatabase = () => {
    return Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/app.db')
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Export database" onPress={exportDatabase} />
      <Button title="Import database" onPress={importDatabase} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
