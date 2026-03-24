import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "./Theme"
import { RouterProvider } from "react-router-dom";
import { useAppSelector } from "./Store/hooks";
import { Router } from "./Routers";

function App() {
  const { isToggleTheme } = useAppSelector((state) => state.layout);
  return (
    <>
      <ThemeProvider theme={getTheme(isToggleTheme === "light" ? "light" : "dark")}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </>
  )
}

export default App
