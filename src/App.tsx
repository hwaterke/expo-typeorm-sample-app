import {StyleSheet, Text, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React, {useEffect} from 'react'
import {DATASOURCE} from './database/datasource'
import {Item} from './database/entities/Item'

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

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
