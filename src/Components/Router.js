import React, { useEffect, useRef, useState } from 'react';
import Home from '../Pages/Home';
import Footer from './Other/footer';
import styles from './Router.module.css';
import { Fade } from 'react-reveal';
import { ContextFunction } from '../Context/ContextProvider';
import Loader from './Other/Loader';
import FixedScroller from './Other/FixedScroller';

function RouterComponent() {
    const obj = ContextFunction();
    const { AboutRef, PortfolioRef, ContactRef } = obj;

    const ref = useRef();

    const [menuOpen, setMenuOpen] = useState(false);

    useOnClickOutside(ref, setMenuOpen);

    const scrollToPortfolio = () => {
        window.scrollTo({
            top: PortfolioRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const scrollToContact = () => {
        window.scrollTo({
            top: ContactRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const scrollToAbout = () => {
        window.scrollTo({
            top: AboutRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        // display loading page
        const loadData = async () => {
            // Wait for two second
            await new Promise((r) => setTimeout(r, 1600));
            // hide loading page
            setLoading(() => false);
        };
        loadData();
    }, []);

    return (
        <div className={`${styles.bodyContainer} ${loading ? styles.fixedBody : styles.nothing}`}>
            <Loader loading={loading} />
            <div className={styles.sldingRoutes}></div>
            <div className={styles.navContainer}>
                <ul className={styles.navBar}>
                    <div onClick={scrollToAbout} className={styles.navItem}>About</div>
                    <div onClick={scrollToPortfolio} className={styles.navItem}>Portfolio</div>
                    <div onClick={scrollToContact} className={styles.navItem}>Contact</div>
                    <a href={"https://www.linkedin.com/in/tobey-hainge-0aa7b1199"} target='_blank' className={styles.navItem}>LinkedIn</a>
                    <a href={"https://github.com/Thainge"} target='_blank' className={styles.navItem}>Github</a>
                </ul>
                <div className={styles.specialNav}>
                    <div className={styles.menuHeaderLeft}>
                        {/* Text and Icon */}
                        <div className={styles.menuHeaderDiv} onClick={scrollToPortfolio}>
                            <img className={styles.circleImage} src={require('../assets/menuLastName.png')}></img>
                            <div className={styles.headerText}>
                                <div className={styles.h2}>Tobey Hainge</div>
                                <div className={styles.h4}>Full Stack Developer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.navMenu} ref={ref}>
                <div onClick={() => setMenuOpen((prev) => !prev)} className={styles.imgBox}>
                    <img src={require('../assets/menu.png')} className={styles.menuIcon} />
                </div>
                <Fade duration={300} up distance={'2em'} when={menuOpen}>
                    <ul className={styles.menuList}>
                        <div onClick={() => {
                            setMenuOpen(() => false);
                            scrollToAbout();
                        }} className={`${styles.navItem} ${styles.menuItem}`}>About</div>
                        <div onClick={() => {
                            setMenuOpen(() => false);
                            scrollToPortfolio();
                        }} className={`${styles.navItem} ${styles.menuItem}`}>Portfolio</div>
                        <div onClick={() => {
                            setMenuOpen(() => false);
                            scrollToContact();
                        }} className={`${styles.navItem} ${styles.menuItem}`}>Contact</div>
                    </ul>
                </Fade>
            </div>
            <FixedScroller />
            <Home />

            <Footer />
        </div>
    );
}

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(() => false);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default RouterComponent;