import { Box, Typography } from "@mui/material";
import { LayoutRouteProps } from "react-router-dom";
import { Header } from "../shared/components/Header";

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" height={"100vh"}>
      <Box component="header" bgcolor="primary.light" p={2} flex="none">
        <Header></Header>
      </Box>

      <Box flexGrow={1} style={{ display: "flex" }}>
        {children}
      </Box>

      <Box flexGrow={0} component="footer" bgcolor="text.secondary" p={2} flex="none">
        <Typography variant="body2" color="common.white" textAlign="center">
          Funny movie © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};
export default Layout;
