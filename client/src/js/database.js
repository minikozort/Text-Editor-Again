import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store named 'jate' with an auto-incrementing key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {  
  try {
    console.log('PUT to the database');
    
    // Open the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    
    // Create a readwrite transaction on the 'jate' object store
    const tx = jateDb.transaction('jate', 'readwrite');
    
    // Get the object store
    const store = tx.objectStore('jate');
    
    // Add content with a fixed ID of 1 (update if it exists)
    const request = store.put({ id: 1 , edited_text: content });
    
    // Wait for the transaction to complete and get the result
    const result = await request;
    console.log('Data saved to the database', result);
    return result;
  } catch (error) {
    console.error('putDb failed', error);
  }
};

// Function to retrieve all content from the database
export const getDb = async () => {
  try {
    console.log('GET all content from the database');
    
    // Open the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    
    // Create a readonly transaction on the 'jate' object store
    const tx = jateDb.transaction('jate', 'readonly');
    
    // Get the object store
    const store = tx.objectStore('jate');
    
    // Retrieve the content with ID 1
    const request = store.get(1);
    
    // Wait for the transaction to complete and get the result
    const result = await request;
    console.log('Data retrieved from the database', result);
    return result;
  } catch (error) {
    console.error('getDb failed', error);
  }
};

// Initialize the database when the script is first run
initdb();
