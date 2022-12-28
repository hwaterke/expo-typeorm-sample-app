import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import {DATASOURCE} from './datasource'
import * as DocumentPicker from 'expo-document-picker'
import {DATABASE_NAME} from './constants'

const databaseFolder = () => {
  return FileSystem.documentDirectory + 'SQLite'
}

const databaseFile = () => {
  return `${databaseFolder()}/${DATABASE_NAME}`
}

export const DatabaseService = {
  importDatabase: async (): Promise<void> => {
    // Close the current database
    await DATASOURCE.destroy()

    // Import file
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })

    if (file.type === 'success') {
      if (!(await FileSystem.getInfoAsync(databaseFolder())).exists) {
        await FileSystem.makeDirectoryAsync(databaseFolder())
      }
      await FileSystem.copyAsync({
        from: file.uri,
        to: databaseFile(),
      })
    }

    // Restart the datasource
    await DATASOURCE.initialize()
  },

  exportDatabase: (): Promise<void> => {
    return Sharing.shareAsync(databaseFile())
  },
}
