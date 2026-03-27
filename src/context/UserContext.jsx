import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [chatHistory, setChatHistory] = useState([]);

  const updateProfile = (profile) => setUserProfile(profile);
  const updateLanguage = (lang) => setLanguage(lang);
  const addMessage = (msg) => setChatHistory(prev => [...prev, msg]);
  const clearChat = () => setChatHistory([]);

  return (
    <UserContext.Provider value={{
      userProfile, updateProfile,
      language, updateLanguage,
      chatHistory, addMessage, clearChat,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
