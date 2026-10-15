import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/lg.png";
import './header.css';

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/heritage', display: 'Explore Heritage' },
  { path: '/about', display: 'About Bharat Heritage' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  return (
    <header className={`header ${isScrolled ? 'sticky__header' : ''}`} ref={headerRef} id='head'>
      <Container>
        <Row>
          <div className='nav__wrapper d-flex align-items-center justify-content-between'>
            {/* ===== Logo / Name ===== */}
            <Link to='/' className='logo d-flex align-items-center gap-2 text-decoration-none'>
              <img src={logo} alt="Bharat HeritageX Logo" style={{ height: "65px", objectFit: "contain" }} />
              <div className="d-flex flex-column">
                <span className="brand-title" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#d97706", letterSpacing: "0.5px" }}>
                  Bharat Heritage <span style={{ color: "#b45309" }}>X</span>
                </span>
                <span className="brand-tagline" style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: "-3px" }}>
                  Timeless Odyssey of Indian Culture
                </span>
              </div>
            </Link>

            {/* ===== Menu ===== */}
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-4 mb-0'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? 'active__link' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== Right Side ===== */}
            <div className='nav__right d-flex align-items-center gap-3'>
              <div className='nav__btns'>
                <Button className='btn primary__btn' style={{ backgroundColor: "#d97706", borderColor: "#d97706", borderRadius: "24px", padding: "8px 20px" }}>
                  <Link to='/heritage' style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                    <i className="ri-compass-3-line me-1"></i> Explore Sites
                  </Link>
                </Button>
              </div>

              {/* Mobile Menu Icon */}
              <span className='mobile__menu' onClick={toggleMenu} role="button" aria-label="Toggle Navigation">
                <i className="ri-menu-line" style={{ fontSize: "1.5rem", color: "#1f2937" }}></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;