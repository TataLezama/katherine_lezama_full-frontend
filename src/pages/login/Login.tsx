

export const Login = () => {
  return (
    <>
      <div className="login">
        <img src="/login-image.svg" alt="spotify-logo" />
        <h1 className="title">Inicia sesión en Spotify</h1>
        <form action="">
            <div className="grid-form">
                <label htmlFor="email">Email o nombre de usuario</label>
                <input type="text" placeholder="Correo electrónico" name="email" />
            </div>
            <div className="grid-form"> 
                <label htmlFor="password">Contraseña</label>
                <input type="password" placeholder="Contraseña" name="password" />
            </div>
            <button type="submit" className="button button-color">Iniciar sesión</button>
        </form>
      </div>
    </>
  )
}
