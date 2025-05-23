import useMedia from "use-media";
import {MobileNavbar} from "../mobile/NavbarMobile";
import {Navbar} from "../desktop/NavbarDesktop";
import {AlignVerticalJustifyEnd, Menu, ShoppingCart} from "lucide-react";
import Button from "../../Button/Button";
import {useTheme} from "../../../context/ThemeContext";
import {useState} from "react";
import Drawer from "../../Drawer/Drawer";
import {useCart} from "../../../context/CartContext";
import {useLocation} from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const {theme} = useTheme();
  const isMobile = useMedia({maxWidth: "1017px"});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {items} = useCart();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  const drawerContent = (
    <nav>
      <ul>
        <li>
          <Button
            isLink
            to="/products"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive("/products") ? "btn--active" : ""}
          >
            Products
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/categories"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive("/categories") ? "btn--active" : ""}
          >
            Categories
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/locations"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive("/locations") ? "btn--active" : ""}
          >
            Locations
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/commercial"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive("/commercial") ? "btn--active" : ""}
          >
            Commercial
          </Button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header style={{position: "sticky", top: "0", width: "100%", zIndex: "99"}}>
      {isMobile ? (
        <>
          <MobileNavbar
            theme={theme}
            leftContent={
              <Button
                isLink
                to="/"
                icon={<AlignVerticalJustifyEnd size={20} />}
                theme={theme}
                iconPosition="left"
                color="base"
                style={{padding: "0"}}
              >
                ECX
              </Button>
            }
            rightContent={
              <div
                style={{display: "flex", alignItems: "center", gap: "0.5rem"}}
              >
                <Button
                  color="base"
                  isLink
                  to="/cart"
                  theme={theme}
                  hasBadge
                  badgeCount={items.length}
                  aria-label="Ver carrito de compras"
                >
                  <ShoppingCart size={20} />
                </Button>
                <Button color="base" theme={theme} onClick={openDrawer}>
                  <Menu size={20} />
                </Button>
              </div>
            }
          />
          <Drawer isOpen={drawerOpen} onClose={closeDrawer} theme={theme}>
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Navbar
          theme={theme}
          leftContent={
            <Button
              isLink
              to="/"
              icon={<AlignVerticalJustifyEnd size={20} />}
              theme={theme}
              iconPosition="left"
              color="base"
              style={{padding: "0"}}
            >
              ECX
            </Button>
          }
          rightContent={
            <Button
              isLink
              to="/cart"
              color="base"
              theme={theme}
              hasBadge
              badgeCount={items.length}
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart size={20} />
            </Button>
          }
          centerContent={
            <ul style={{display: "flex"}}>
              <li>
                <Button
                  color="base"
                  theme={theme}
                  isLink
                  to="/products"
                  className={isActive("/products") ? "btn--active" : ""}
                >
                  Products
                </Button>
              </li>
              <li>
                <Button
                  color="base"
                  theme={theme}
                  isLink
                  to="/categories"
                  className={isActive("/categories") ? "btn--active" : ""}
                >
                  Categories
                </Button>
              </li>
              <li>
                <Button
                  color="base"
                  theme={theme}
                  isLink
                  to="/locations"
                  className={isActive("/locations") ? "btn--active" : ""}
                >
                  Locations
                </Button>
              </li>
              <li>
                <Button
                  color="base"
                  theme={theme}
                  isLink
                  to="/commercial"
                  className={isActive("/commercial") ? "btn--active" : ""}
                >
                  Commercial
                </Button>
              </li>
            </ul>
          }
        />
      )}
    </header>
  );
};
