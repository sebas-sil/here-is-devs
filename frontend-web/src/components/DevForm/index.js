import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }){

    const [lat, setLatitude] = useState('')
    const [lng, setLongitude] = useState('')
    const [github, setGithub] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords
    
            setLatitude(latitude)
            setLongitude(longitude)
    
            console.log(position)
        },
        (err) => {
          console.log(err)
        },
        {
          timeout: 30000
        })
      }, [])

    async function handleSubmit(e){
        e.preventDefault()

        await onSubmit({
            github,
            techs: techs.split(',').map(t => t.trim()),
            location:{lat, lng}
        })
        
        setGithub('')
        setTechs('')
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github">Usuário do Guthub</label>
            <input name="github" id="github" required value={github} onChange={e => setGithub(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>
          </div>
          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="lat">Latitude</label>
              <input type="number" name="lat" id="lat" required value={lat} onChange={e => setLatitude(e.target.value)}/>
            </div>
            <div className="input-block">
              <label htmlFor="lng">Longitude</label>
              <input type="number" name="teclnghs" id="lng" required value={lng}onChange={e => setLongitude(e.target.value)}/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm