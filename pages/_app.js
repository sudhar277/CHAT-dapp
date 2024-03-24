import "../styles/globals.css";

//internal import 
import {ChatAppProvider} from '../Context/ChatAppContext';
import {NavBar} from "../Components/index";


const Myapp = ({Component, pageProps}) =>(
      <div>
        <ChatAppProvider>
          <NavBar/>
          <Component {...pageProps} />
        </ChatAppProvider>
        
      </div>
);

export default Myapp;