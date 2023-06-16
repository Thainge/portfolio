import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Fade from 'react-reveal/Fade';
import styles from './phone.module.css';
import { ContextFunction } from '../../Context/ContextProvider';

function Phone({ type }) {
    const obj = ContextFunction();
    const { AboutRef, PortfolioRef, ContactRef } = obj;

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

    let list = [
        {
            image: <img className={`${styles.contentImage} ${styles.buttonScreenImage}`} src={require('../../assets/tobey.png')} />,
            text: <div onClick={scrollToAbout} className={styles.buttonScreen}>Tobey Hainge</div>
        },
        {
            image: <img className={styles.buttonImage} src={require('../../assets/locThird.png')} />,
            text: <div onClick={scrollToPortfolio} className={styles.buttonScreen}>View Portfolio</div>
        },
        {
            image: <img className={styles.buttonImage} src={require('../../assets/phoneThird.png')} />,
            text: <div onClick={scrollToContact} className={styles.buttonScreen}>Contact Me</div>
        },
    ]

    const ref = useRef(null)
    const isVisible = useOnScreen(ref)

    const [index, setIndex] = useState(0);
    const [playPhone, setPlayPhone] = useState(false);

    const [firstIndex, setFirstIndex] = useState(0);
    const [firstPlayPhone, setFirstPlayPhone] = useState(false);

    useEffect(() => {
        startFirstPhoneCycle();
        setTimeout(() => {
            setActiveOverlay(() => false);
        }, 1500)
    }, [])

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (isVisible && !started && type !== '1') {
            setStarted(() => false);
            let delay = type === '2' ? 700 : 0;
            setTimeout(() => {
                startPhoneCycle();
            }, delay)
        }
    }, [isVisible])

    function startFirstPhoneCycle() {
        setTimeout(() => {
            setFirstPlayPhone(() => true);
        }, 1500);

        setInterval(() => {
            // Hide old
            setFirstPlayPhone(() => false);
            setFirstIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex > list.length - 1) {
                    newIndex = 0;
                }

                return newIndex;
            });

            // Delay showing new one for x seconds
            setTimeout(() => {
                setFirstPlayPhone(() => true);
            }, 1000);

        }, 4000)
    }

    function startPhoneCycle() {
        setTimeout(() => {
            setPlayPhone(() => true);
        }, 1000);

        setInterval(() => {
            // Hide old
            setPlayPhone(() => false);
            setIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex > list.length - 1) {
                    newIndex = 0;
                }

                return newIndex;
            });

            // Delay showing new one for x seconds
            setTimeout(() => {
                setPlayPhone(() => true);
            }, 1000);

        }, 4000)
    }

    const [activeOverlay, setActiveOverlay] = useState(true);
    const [canClickOverlay, setCanClickOverlay] = useState(true);

    function toggleOverlay() {
        if (canClickOverlay) {
            setCanClickOverlay(() => false);
            setTimeout(() => {
                setCanClickOverlay(() => true);
            }, 800);
            setActiveOverlay((prev) => !prev);
        }
    }

    return (
        <div className={`
        ${styles.phone}
        ${type === '1' ? styles.phoneShadow : styles.phoneShadowOther}
        ${type === '1' ? styles.hover : styles.nothing} 
        ${type !== '1' ? styles.phone2 : styles.nothing}
        `}>
            <div className={styles.topPhone}>
                <div className={styles.topCircle} />
                <div className={styles.topBar} />
            </div>
            <div ref={ref} className={`
            ${styles.phoneScreen} 
            ${type !== '1' ? styles.phoneScreen2 : styles.nothing}
            `}>
                <div className={`
                ${styles.screenIconBox} 
                `}>
                    {
                        type === '1' ? <>
                            <Fade up duration={500} distance={'1em'} when={firstPlayPhone}>{list[firstIndex].image}</Fade>
                            <Fade up duration={500} distance={'1em'} when={firstPlayPhone}><div className={`${styles.screenText} ${!activeOverlay ? styles.screenActive : styles.screenFade}`}>
                                {list[firstIndex].text}
                            </div></Fade>
                        </> : <>
                            <Fade up duration={500} distance={'1em'} when={playPhone}>{list[index].image}</Fade>
                            <Fade up duration={500} distance={'1em'} when={playPhone}><div className={`${styles.screenText} ${!activeOverlay ? styles.screenActive : styles.screenFade}`}>{list[index].text}</div></Fade>
                        </>
                    }
                </div>
                <Fade duration={800} left opposite when={activeOverlay}>
                    <div className={styles.absoluteOverlay}>
                        <div className={styles.centerOverlay}>
                            <img className={styles.centerOverlayImage} src={require('../../assets/logoNoText.png')} />
                            <div className={styles.centerOverlayText}>Tobey Hainge</div>
                        </div>
                    </div>
                </Fade>
            </div>
            {
                type === '1' ? <div className={styles.buttonBox}>
                    <div className={styles.button} onClick={toggleOverlay} />
                </div> : <></>
            }
        </div>
    )
}

function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false)

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])


    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}

export default Phone;