import { NavLink, useNavigate } from "react-router-dom"

export const MenuRight = () => {
  const navItems = [
    { path: "/search", label: "Buscar" },
    { path: "/my-albums", label: "Mis Álbumes" },
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem("spotifyToken");

  const handleLogout = () => {
    localStorage.removeItem("spotifyToken");
    navigate("/"); 
    window.location.reload();
  };


  return (
    <div className="menu-right">
      {token ? (
      <>
        {navItems.map(
          ({ path, label }: { path: string; label: string }) => (
            <NavLink
              key={path}
              to={path}
              end // asegura que "/" solo se active en Home exacto
              className={({ isActive }) =>
                isActive ? "is-active" : ""
              }
            >
              {label}
            </NavLink>
          )
        )}
        <div className="button-logout">
          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </>
    ) : ''
    }
    </div>
  )
}
