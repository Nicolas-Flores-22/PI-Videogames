import style from './Footer.module.css';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div>
                <p>© 2023 | Nicolas Flores</p>
                <div className={style.socialLinks}>
                    <a href="https://www.linkedin.com/in/nicolas-flores-celi/">
                        <img src={linkedin} alt="LinkedIn" />
                        LinkedIn
                    </a>
                    <a href="https://github.com/Nicolas-Flores-22">
                        <img src={github} alt="GitHub" />
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;