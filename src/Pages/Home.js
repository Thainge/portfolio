import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Phone from '../Components/Other/phone';
import styles from './Home.module.css';
import ReactRotatingText from 'react-rotating-text';
import Contact from './Contact';
import { ContextFunction } from '../Context/ContextProvider';
import Project from '../Components/Other/Project';
import projectsData from '../Data/projects';

function Home() {
    const obj = ContextFunction();
    const { AboutRef, PortfolioRef, ContactRef } = obj;

    // scroll to sections
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

    return (
        <>
            <div className={styles.header} ref={AboutRef}>
                <div className={styles.headerFlex}>
                    <Fade left distance={'10em'}>
                        <div className={styles.headerText}>
                            <h2 className={`${styles.headerH2} ${styles.aboutHeader}`}>About</h2>
                            <h1 className={styles.headerH1}>
                                <ReactRotatingText items={['Fullstack Developer', 'UI/UX Designer']} />
                            </h1>
                            <div className={styles.headerPara}>
                                Experienced as a Full Stack Developer and Consultant consisting of over three (3) years of experience with all phases of the software development lifecycle. Specializes in analyzing large volumes of data, problem-solving, and presentation of data through visualization and reporting. Development experience leading projects in large enterprise infrastructures involving Data Analytics, Build/Release Management, and Cloud Development.
                            </div>
                            <div className={styles.headerButtons}>
                                <div className={styles.button2} onClick={scrollToPortfolio}>View Portfolio</div>
                                <div className={styles.headerSplitter}>or</div>
                                <div className={styles.buttonText} onClick={scrollToContact}>Contact Me</div>
                            </div>
                        </div>
                    </Fade>
                    <Fade up delay={400} distance={'5em'}>
                        <div className={styles.phoneBox}>
                            <Phone type='1' />
                        </div>
                    </Fade>
                </div>
                <div className={styles.waveBox}>
                    <div className={styles.waveAnimation}>
                        <div className={styles.wave} />
                        <div className={styles.waveStatic} />
                    </div>
                </div>
            </div>
            <div className={styles.homeContainer}>

                {/* Portfolio Projects */}
                <div className={`${styles.section} ${styles.portfolioSection}`} ref={PortfolioRef}>
                    <div className={styles.containerCol2}>
                        <div className={styles.papaCol2}>
                            <div className={styles.projectHeaderContainer}>
                                <Fade right distance='10em'>
                                    <div className={styles.center}>
                                        <h2 className={styles.sectionH2}>Portfolio</h2>
                                        <h1 className={styles.sectionH1}>Professional Projects</h1>
                                    </div>
                                </Fade>
                            </div>
                            {/* Projects list */}
                            <div className={styles.portfolioContainer}>
                                <div className={styles.projectsList}>
                                    {
                                        projectsData.map((item, index) => (
                                            <div key={index}>
                                                <Fade delay={index * 150}>
                                                    <Project item={item} />
                                                </Fade>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contact Form */}
                <Contact homePage={true} />
            </div >
        </>
    );
}

export default Home;