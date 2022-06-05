import { createContext, useState } from "react";
export const NotificationCtx = createContext();

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    status: "",
    message: "",
    title: "",
    notifVisible: false,
  });

  return (
    <NotificationCtx.Provider value={{ state, setState }}>
      {children}
    </NotificationCtx.Provider>
  );
};

export default ContextProvider;
