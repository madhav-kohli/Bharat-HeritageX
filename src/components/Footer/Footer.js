import React, { useEffect } from 'react'
import './footer.css'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/lg.png"

const quick__links = [
    { path: '/home', display: 'Home' },
    { path: '/about', display: 'About' },
    { path: '/heritage', display: 'Heritage' }
]

const quick__links2 = [
    { path: '/gallery', display: 'Gallery' },
    { path: '/', display: 'Explore' }
]

const Footer = () => {
    const year = new Date().getFullYear()

    // 🔥 Scroll glow effect
    useEffect(() => {
        const items = document.querySelectorAll(".footer-item")

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("glow-active")
                }
            })
        }, { threshold: 0.2 })

        items.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <footer className='footer'>
            <Container>
                <Row>

                    {/* ===== Logo Section ===== */}
                    <Col lg='3'>
                        <div className='logo footer-item'>
                            <img src={logo} alt='' />
                            <p>
                                India's heritage and traditions are a rich tapestry of ancient wisdom,
                                diverse cultural practices, and artistic brilliance.
                            </p>

                            <div className='social__links d-flex align-items-center gap-3'>
                                <span>
                                    <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                                        <i className="ri-instagram-line"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </Col>

                    {/* ===== Discover ===== */}
                    <Col lg='3'>
                        <h5 className='footer__link-title footer-item'>Discover</h5>
                        <ul className='footer__quick-links'>
                            {quick__links.map((item, index) => (
                                <li key={index} className="footer-item">
                                    <Link to={item.path}>{item.display}</Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* ===== Quick Links ===== */}
                    <Col lg='3'>
                        <h5 className='footer__link-title footer-item'>Quick Links</h5>
                        <ul className='footer__quick-links'>
                            {quick__links2.map((item, index) => (
                                <li key={index} className="footer-item">
                                    <Link to={item.path}>{item.display}</Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* ===== Contact ===== */}
                    <Col lg='3'>
                        <h5 className='footer__link-title footer-item'>Contact</h5>
                        <ul className='footer__quick-links'>
                            <li className="footer-item">
                                <i className="ri-map-pin-line"></i> JMIT
                            </li>
                            <li className="footer-item">
                                <i className="ri-mail-line"></i> madhavkohli128@gmail.com
                            </li>
                            <li className="footer-item">
                                <i className="ri-phone-fill"></i> +91 7027390494
                            </li>
                        </ul>
                    </Col>

                    {/* ===== Bottom ===== */}
                    <Col lg='12'>
                        <div className='footer__bottom text-center mt-4 pt-3 footer-item'>
                            <p className='copyright'>
                                Copyright {year}, design and develop by{' '}
                                <a
                                    href='https://Vishal-Piprotar.github.io/Vishal-Piprotar-portfolio'
                                    className='portfolio'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Madhav Kohli & co.
                                </a>. All rights reserved.
                            </p>
                        </div>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
}

export default Footer