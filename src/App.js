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
    }, 1000)
  }, [])

  return (
    <div>
      <div className="hide">
        <h1 id="versatility">CAMPEÃO INTERCOMP 2022</h1>
      </div>
      {state === 0 ? <Tiles /> : <Champion />}
    </div>
    );
}

export default App;
