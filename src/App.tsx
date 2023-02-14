//* import third-party
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//* import local (utils)
import ThemeColorContext from "./context/colorContext";

//* import local (pages)
import Nav from "components/common/nav/NavView";
import Index from "components/pages/index/IndexView";
import Profile from "components/pages/profile/ProfileView";

/*
 * App is the head component for the entire site
*/
const App = (): JSX.Element => {
  //* component logic
  const location = useLocation();
  const [themeColor, setThemeColor] = useState<string>("#287485");

  //* render
  return (
    <ThemeColorContext.Provider value={themeColor}>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </ThemeColorContext.Provider>
  );
}

export default App;