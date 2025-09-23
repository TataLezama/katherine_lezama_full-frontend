import { NavLink } from "react-router-dom"

export const MenuRight = () => {
  const navItems = [
    { path: "/search", label: "Buscar" },
    { path: "/my-albums", label: "Mis Álbumes" },
  ];


  return (
    <div className="menu-right">
        {
          navItems.map(({ path, label }: { path: string, label: string }) => (
            <NavLink
              to={ path }
              end // asegura que "/" solo se active en Home exacto
              className={({ isActive }) =>
                isActive
                  ? "is-active"
                  : ""
              }
            >{ label }</NavLink>
          ))
        }
        <div className="button-logout">
          <button type="button">Cerrar sesión</button>
        </div>
    </div>
  )
}
