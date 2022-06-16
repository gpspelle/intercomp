import Tiles from './components/Tiles';

import "./App.css"
import "./scss/Tiles.scss"
import "./scss/Fireworks.scss"
import { useEffect, useState } from 'react';
import Champion from './components/Champions';

document.body.style.overflow = "hidden"

function App() {

  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState(1)
    }, 10000)
  }, [])

  return (
    <div>
      {state === 0 ?
        <>
          <h2>QUEM VAI SER CAMPEÃO DO INTERCOMP 2022?</h2>
          <Tiles />
          <div style={{ position: "absolute", bottom: "10px" }}>
            <h4>Aguarde os nossos algoritmos calcularem o resultado...</h4>
          </div>
        </>
        :
        <>
          <h2>UNICAMP PE PE Ô</h2>
          <h2>UNICAMP PE PE Ô</h2>
          <h2>UNICAMP PE PE Ô</h2>
          <Champion />
        </>
      }
    </div>
    );
}

export default App;
