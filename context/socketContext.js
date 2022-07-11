import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.178.115:3000");

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  // get the context
  const context = useContext(SocketContext);

  //if there isnt then throw an error
  if (!context) {
    throw new Error("useAuth must be used within an SocketProvider");
  }

  //if there is, return the context
  return context;
};

export { SocketProvider, useSocket };
