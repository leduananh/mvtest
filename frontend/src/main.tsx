import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./layouts/layout.tsx";
import theme from "./layouts/theme.tsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import config from "./app/config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Layout>
          <SnackbarProvider maxSnack={3} anchorOrigin={config.ALERT.ANCHOR}>
            <App />
          </SnackbarProvider>
        </Layout>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
