import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./layouts/layout.tsx";
import theme from "./layouts/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>,
);
