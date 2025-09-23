import { MenuLogo } from "./MenuLogo"
import { MenuRight } from "./MenuRight"


export const Navbar = () => {
  return (
    <nav className="navbar-container">
        <MenuLogo />
        <MenuRight />
    </nav>
  )
}
