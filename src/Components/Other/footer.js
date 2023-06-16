import styles from './footer.module.css';
import { ContextFunction } from '../../Context/ContextProvider';

function Footer() {
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

    return (
        <div className={styles.container}>
            <div className={styles.wave} />
            <div className={styles.footer}>

                {/* Logo & copyright */}
                <div className={`${styles.column} ${styles.col1}`}>
                    <div className={styles.miniColumn}>
                        <div onClick={scrollToAbout} className={styles.h1}>Tobey Hainge</div>
                        <div className={styles.text}><img src={require('../../assets/loc.png')} className={styles.icon} /> United States</div>
                        <div className={styles.text}><img src={require('../../assets/email.png')} className={styles.icon} /> tobeyhainge@gmail.com</div>
                        <div className={styles.text}><img src={require('../../assets/phone.png')} className={styles.icon} /> +1-910-321-8215</div>
                    </div>
                    <div className={styles.copyright}>© 2023 Tobey Hainge</div>
                </div>

                <div className={styles.twoColumns}>
                    {/* Solutions */}
                    <div className={`${styles.column} ${styles.col2}`}>
                        <h2 className={styles.h2}>Resources</h2>
                        <div onClick={scrollToAbout} className={styles.link}>About</div>
                        <div onClick={scrollToPortfolio} className={styles.link}>Portfolio</div>
                        <div onClick={scrollToContact} className={styles.link}>Contact</div>
                    </div>

                    {/* Contact */}
                    <div className={`${styles.column} ${styles.col4}`}>
                        <h2 className={styles.h2}>Have questions?</h2>
                        <div onClick={scrollToContact} className={styles.link}>Contact Me</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer;