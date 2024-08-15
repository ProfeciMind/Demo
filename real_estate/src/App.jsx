import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import Profiel1 from "./pages/Profiel1";
import Signup from "./pages/Signup";
import Signinpage from "./pages/Signinpage";
import Aboutpage from "./pages/Aboutpage";
import CreateListing from "./pages/CreateListing1";
import PrivateRoute from "./Components/PrivateRoute";
import UpdateList from "./pages/UpdateList";
import ListingPage from "./pages/ListingPage";




export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
       <Route path="/" element={<HomePage/> }/>
       <Route path="/Aboutpage" element={<Aboutpage/> }/>
       <Route path="/Signup" element={<Signup />}/>
       <Route path="/Signinpage" element={<Signinpage/> }/>
       <Route path="/listing/:listingId" element={<ListingPage/>}/>
       <Route element={<PrivateRoute/>} >
        <Route path="/Profiel1" element={<Profiel1 />}/>
        <Route path="/CreateListing" element={<CreateListing /> }/>
        <Route path="/updateListing/:listingId" element={<UpdateList />}/>
       </Route>
      </Routes>
    </BrowserRouter>
  );
}
