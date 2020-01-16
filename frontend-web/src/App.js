import React, {useState, useEffect} from 'react';
import api from './services/api'
import DevItem from './components/DevItem'
import FormDev from './components/DevForm'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

// componentes: função que retorna um JS, CSS ou HTML (colocar um componente por arquivo)
// propriedade: são os parametros da função (atributos das tags)
// estado: informação mantida pelo componente, gerenciado pelo userState (imutabilidade)

function App() {
  const [devs, setDevs] = useState([])
  
  useEffect(() => {
    async function loadDevs () {
      const response = await api.get('/dev')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/dev', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <FormDev onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(
            dev => (
              <DevItem key={dev._id} dev={dev} />
            )
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
