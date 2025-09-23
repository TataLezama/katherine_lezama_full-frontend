# 🎵 Spotify React App

Aplicación web creada con **React + TypeScript** que permite
autenticarse con la API de Spotify, buscar artistas, ver el detalle de
un artista con sus álbumes y consultar los álbumes guardados del
usuario.

------------------------------------------------------------------------

## 📌 Características

-   🔑 Autenticación con **Spotify API (Implicit Grant Flow)**.\
-   🏠 Página **Home** con navegación.\
-   🔍 **Búsqueda de artistas** en Spotify.\
-   🎤 **Detalle de artista** con su lista de álbumes.\
-   💽 Vista de **mis álbumes guardados** en la cuenta de Spotify.\
-   🌐 Navegación con **React Router v6**.\
-   📱 Diseño con Navbar común en todas las páginas.

------------------------------------------------------------------------

## 📂 Estructura del proyecto

    src/
     ├── components/
     │   └── navbar/
     │       └── Navbar.tsx          # Barra de navegación
     ├── pages/
     │   ├── home/
     │   │   └── Home.tsx            # Página principal
     │   ├── search/
     │   │   └── Search.tsx    # Búsqueda de artistas
     │   ├── artist/
     │   │   └── Artist.tsx    # Detalle de artista y álbumes
     │   └── myalbums/
     │       └── MyAlbums.tsx        # Álbumes guardados del usuario
     ├── spotify/
     │   ├── auth.ts                 # Manejo de autenticación con Spotify
     │   └── spotifyApi.ts           # Servicio de llamadas a la API
     └── App.tsx                     # Configuración de rutas y layout

------------------------------------------------------------------------

## 🚀 Instalación

1.  Clonar el repositorio:

``` bash
git clone https://github.com/tuusuario/spotify-react-app.git
cd spotify-react-app
```

2.  Instalar dependencias:

``` bash
npm install
```

3.  Configurar variables:
    -   Ve a [Spotify Developer
        Dashboard](https://developer.spotify.com/dashboard/).\
    -   Crea una aplicación y copia tu **Client ID**.\
    -   Agrega la **Redirect URI** (ejemplo:
        `http://localhost:5173/callback`).\
    -   Edita `src/spotify/auth.ts` y coloca tu **Client ID** y Redirect
        URI.
4.  Ejecutar en modo desarrollo:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🛠️ Librerías utilizadas

-   [React](https://reactjs.org/)\
-   [TypeScript](https://www.typescriptlang.org/)\
-   [React Router v6](https://reactrouter.com/)

------------------------------------------------------------------------

## 🌐 Rutas disponibles

  ------------------------------------------------------------------------
  Ruta            Página               Descripción
  --------------- -------------------- -----------------------------------
  `/`             **Home**             Página principal con navegación.

  `/search`       **Buscar Artista**   Permite buscar artistas en Spotify.

  `/artist/:id`   **Detalle de         Muestra info y álbumes de un
                  Artista**            artista.

  `/my-albums`    **Mis Álbumes**      Lista los álbumes guardados del
                                       usuario.
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 🔐 Autenticación con Spotify

La app utiliza **Implicit Grant Flow**:\
- Al iniciar sesión, el usuario es redirigido a Spotify para dar
permisos.\
- Spotify devuelve un `access_token` en la URL.\
- Ese token se guarda en `localStorage` para realizar peticiones a la
API.

Ejemplo de uso en el código:

``` ts
fetch("https://api.spotify.com/v1/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

------------------------------------------------------------------------

## 📦 Build y despliegue

Para crear el build de producción:

``` bash
npm run build
```

Si deseas publicarlo en **GitHub Pages**:

``` bash
npm run deploy
```

(Asegúrate de configurar el `homepage` en tu `package.json`).

------------------------------------------------------------------------

## 📸 Preview

*(Aquí puedes poner capturas de pantalla de tu app una vez corra con
datos de Spotify.)*
