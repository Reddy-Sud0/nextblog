"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store, sagaMiddleware } from "@/store";
import { rootSaga } from "@/store/sagas";
import { rehydrateAuth } from "@/store/slices/authSlice";

let sagaStarted = false;

export default function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!sagaStarted) {
      sagaMiddleware.run(rootSaga);
      sagaStarted = true;
    }

    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    if (token && rawUser) {
      const user = JSON.parse(rawUser);
      store.dispatch(
        rehydrateAuth({
          token,
          user: { id: user.id, firstName: user.firstName, email: user.email },
        })
      );
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
