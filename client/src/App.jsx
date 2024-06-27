import {  Welcome } from "./components";
import Footer from "./components/Footer";

const App = () => (
  <div className="min-h-screen bg-purple-500">
    <div className="gradient-bg-welcome min-h-full">
      <Welcome />
      <Footer/>
    </div>
   
  </div>
);

export default App;
