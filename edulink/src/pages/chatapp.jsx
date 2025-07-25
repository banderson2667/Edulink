import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@src/firebaseConfig';
import '@styles/chatapp.css';
import NavBar from '@components/NavBar.jsx';

const Chatapp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
      <input 
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
      <NavBar/>
    </div>
  );
};
export default Chatapp