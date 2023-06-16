import { useState } from 'react';
import styles from './Contact.module.css';
import Fade from 'react-reveal/Fade';
import { BarLoader } from 'react-spinners';
import { sendEmail } from '../Hooks/email';
import { ContextFunction } from '../Context/ContextProvider';

function Contact({ homePage }) {
    const obj = ContextFunction();
    const { AboutRef, PortfolioRef, ContactRef } = obj;

    let IsHomePage = homePage ?? false;
    const [formValues, setFormValues] = useState({
        fname: '',
        lname: '',
        email: '',
        interest: '',
        budget: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState({ name: 'Max file size: 20MB' });
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (selectedFile.size) {
            formData.append("File", selectedFile);
        }

        formData.append("formData", formValues);

        // Send to nodeJS server to send email
        setLoading(() => true);
        sendEmail(formData);
        setTimeout(() => {
            setSubmitted(() => true);
            setLoading(() => false);
        }, 1000)
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues((prev) => {
            let newData = { ...prev, [name]: value };
            return newData;
        });
    }

    const fileHandler = (event) => {
        let maxLength = 20 * 1000 * 1000;

        if (event.target.files[0].size > maxLength) {
            setSelectedFile(() => {
                let newObj = { name: 'Max File Size' }
                return newObj;
            });
        } else {
            setSelectedFile(() => event.target.files[0]);

            setIsFilePicked(() => true);

            setTimeout(() => {
                setIsFilePicked(() => false);
            }, 1000)
        }
    };

    return (
        <div className={styles.container} ref={ContactRef}>
            <div className={styles.fuzzy}>
                {IsHomePage ? <div className={styles.wave2} /> : <></>}
                <div className={styles.wave} />
                <div className={styles.lettersContainer}>
                    <div className={styles.lettersList}>
                        <Fade delay={600}><i>L</i></Fade>
                        <Fade delay={900}><i>e</i></Fade>
                        <Fade delay={1200}><i>t</i></Fade>
                        <Fade delay={1500}><i>s</i></Fade>
                        <Fade delay={1200}><i>W</i></Fade>
                        <Fade delay={900}><i>o</i></Fade>
                        <Fade delay={600}><i>r</i></Fade>
                        <Fade delay={600}><i>k</i></Fade>
                        <Fade delay={900}><i>T</i></Fade>
                        <Fade delay={1200}><i>o</i></Fade>
                        <Fade delay={600}><i>g</i></Fade>
                        <Fade delay={1500}><i>e</i></Fade>
                        <Fade delay={1200}><i>t</i></Fade>
                        <Fade delay={600}><i>h</i></Fade>
                        <Fade delay={900}><i>e</i></Fade>
                        <Fade delay={600}><i>r</i></Fade>
                    </div>
                </div>
            </div>
            <div className={`${styles.content} ${IsHomePage ? styles.homeContent : styles.nothing}`}>
                <img src={require('../assets/contactbg.png')} className={styles.backImg} />
                <div className={styles.column}>
                    <Fade left distance="5em">
                        <h2 className={styles.sectionH2}>Contact</h2>
                        <h1 className={styles.sectionH1}>Get in touch — let’s work together.</h1>
                    </Fade>
                </div>
                <form className={styles.form} id="contact-form" onSubmit={handleSubmit}>
                    <div className={styles.text}>Got an offer? Drop me a line if you want to work together on something exciting.</div>
                    <div className={styles.row}>
                        <label className={styles.label}>
                            First Name*
                            <input maxLength={20} required className={styles.input} onChange={handleChange} name='fname' type='text' />
                        </label>
                        <label className={styles.label}>
                            Last Name*
                            <input maxLength={20} required className={styles.input} onChange={handleChange} name='lname' type='text' />
                        </label>
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>
                            Email Address*
                            <input maxLength={40} required className={styles.input} onChange={handleChange} name='email' type='text' />
                        </label>
                        <label className={styles.label}>
                            Phone Number
                            <input maxLength={40} className={styles.input} onChange={handleChange} name='phone' type='text' />
                        </label>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.selectBox}>
                            <select name='interest' className={styles.select} onChange={handleChange} defaultValue={'default'}>
                                <option value={'default'}> What are you interested in?</option>
                                <option>Need help with a one-off project</option>
                                <option>Looking for a long term partnership</option>
                                <option>Want to hire me full-time</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styles.selectBox}>
                            <select name='budget' className={styles.select} onChange={handleChange} defaultValue={'default'}>
                                <option value={'default'}>What's your budget?</option>
                                <option>$0-$1000</option>
                                <option>$1000 - $2500</option>
                                <option>$2500 - $5000</option>
                                <option>$5000 - $10000</option>
                                <option>$10000 or more</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.fileInputBox}>
                        <label className={`${styles.label} ${styles.inputLabel}`}>
                            <input className={styles.fileInput} onChange={fileHandler} type='file' accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*" />
                            <img className={styles.inputFileImg} src={require('../assets/inputFile.png')} />
                            <div className={styles.fileButton}>Upload File</div>
                        </label>
                        <div className={styles.fileText}>
                            {selectedFile.name}
                        </div>
                    </div>
                    <label className={`${styles.label} ${styles.textAreaBox}`}>
                        Message:
                        <textarea maxLength={500} name='message' onChange={handleChange} className={styles.textArea} placeholder='What is your message?' />
                        <div className={styles.textareaBottom}>
                            <i className={styles.messageEnd}>Max 500 characters</i>
                            <i className={styles.messageEnd}>{500 - formValues.message.length} characters left</i>
                        </div>
                    </label>
                    <button form='contact-form' className={`${styles.submit} ${isFilePicked ? styles.buttonLoading : styles.nothing} ${submitted || loading ? styles.submitted : styles.nothing}`}>

                        {submitted ? <div className={styles.submitBG} /> : <></>}

                        <Fade up distance={'1em'} duration={500} delay={1000} when={submitted && !loading}>
                            <div className={styles.box}>
                                Message sent!
                            </div>
                        </Fade>
                        <Fade duration={500} when={!submitted && !loading}>
                            <div className={styles.box}>
                                <i className={styles.email}>✉</i> Send Message
                            </div>
                        </Fade>
                        <Fade delay={300} when={loading}>
                            <div className={styles.box}>
                                <BarLoader speedMultiplier={2} size={7} color={'white'} />
                            </div>
                        </Fade>
                    </button>
                </form >
            </div >
        </div >
    )
}

export default Contact;