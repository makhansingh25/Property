import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Property from "./pages/Property";
import Signup from "./pages/Signup";
import AddProperty from "./pages/AddProperty";
import Navbar from "./components/Navbar";
import "./App.css";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import SaveProperty from "./pages/SaveProperty";
import DeleteProperty from "./pages/DeleteProperty";
import PropertyDetail from "./pages/PropertyDetail";
import PageNotFound from "./pages/PageNotFound";
import GetMessage from "./pages/GetMessage";
import Logout from "./pages/Logout";
import UpdateProperty from "./pages/UpdateProperty";
import Deletepop from "./pages/Deletepop";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/message" element={<GetMessage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Saveproperty" element={<SaveProperty />} />
        <Route path="/deleteproperty/:id" element={<DeleteProperty />} />
        <Route path="/propertydetail/:id" element={<PropertyDetail />} />
        <Route path="/updateproperty/:id" element={<UpdateProperty />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/popup" element={<Deletepop />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
