import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { LayoutRouteProps } from "react-router-dom";
import { Header } from "../shared/components/Header";

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" >
            <Box component="header" bgcolor="primary.main" p={2} flex={0}>
                <Header></Header>
            </Box>
            <Box flex={1} style={{ display: "flex" }}>
                {/* <Container style={{ width: "100%", height: "100%" }}></Container> */}
                {children}
            </Box>

            <Box component="footer" bgcolor="text.secondary" p={2} flex={0}>
                <Typography variant="body2" color="common.white" textAlign="center">
                    Footer © {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
};
export default Layout;
