import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const USER_PROFILES = {
  conservative: {
    label: "Conservative Investor",
    emoji: "🛡️",
    holdings: ["FD", "Gold", "Bonds", "Debt MF"],
    investmentTypes: ["SIP", "SGB", "Govt Bonds", "Fixed Deposits"],
    sectors: ["Banking", "FMCG", "Pharma"],
    riskColor: "#22c55e",
    riskLevel: "Low",
    riskAppetite: "Conservative",
  },
  moderate: {
    label: "Moderate Investor",
    emoji: "⚖️",
    holdings: ["Mutual Funds", "SIP", "Blue-chip Stocks", "Gold"],
    investmentTypes: ["Index Funds", "Large Cap Equity", "Gold ETFs"],
    sectors: ["IT", "Banking", "FMCG", "Auto"],
    riskColor: "#f59e0b",
    riskLevel: "Moderate",
    riskAppetite: "Moderate",
  },
  aggressive: {
    label: "Aggressive Trader",
    emoji: "🔥",
    holdings: ["Direct Stocks", "F&O", "Crypto", "Small-cap MF"],
    investmentTypes: ["Direct Equity", "Derivatives", "Cryptocurrency", "Angel Investing"],
    sectors: ["IT", "Adani", "PSU", "EV", "Commodities"],
    riskColor: "#ef4444",
    riskLevel: "High",
    riskAppetite: "Aggressive",
  },
};

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [chatHistory, setChatHistory] = useState([]);

  const updateProfile = (profileKey) => {
    if (USER_PROFILES[profileKey]) {
      setUserProfile(USER_PROFILES[profileKey]);
    } else {
      setUserProfile(profileKey);
    }
  };
  
  const logout = () => setUserProfile(null);
  const updateLanguage = (lang) => setLanguage(lang);
  const addMessage = (msg) => setChatHistory(prev => [...prev, msg]);
  const clearChat = () => setChatHistory([]);

  return (
    <UserContext.Provider value={{
      userProfile, updateProfile, logout,
      language, updateLanguage,
      chatHistory, addMessage, clearChat,
      profiles: USER_PROFILES
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
