import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {AuthContextProvider,Myroutes,} from "./index";
function App() {
  const [count, setCount] = useState(0);

  return (
  <>
    <AuthContextProvider>
    <Myroutes/>
   </AuthContextProvider>
   </>

  );
}

export default App;
