import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });

          if (data.length > 0) {
            const contact = data[0];
            console.group('[+] Success reading contact.');
            console.log(contact);
            console.groupEnd();
          }
        } catch (error) {
          console.group('[-] Error reading contact.');
          console.log(error);
          console.groupEnd();
        }

        try {
          const contact = {
            [Contacts.Fields.FirstName]: 'Bird',
            [Contacts.Fields.LastName]: 'Man',
            [Contacts.Fields.Company]: 'Young Money',
          };
          const contactId = await Contacts.addContactAsync(contact);

          console.group('[+] Success writing contact.');
          console.log(contactId);
          console.groupEnd();
        } catch (error) {
          console.group('[-] Error writing contact.');
          console.log(error);
          console.groupEnd();
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
