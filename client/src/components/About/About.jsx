import { useState } from 'react';
import style from './About.module.css';
import Loading from '../Loading/Loading'

const About = () => {

    const [load, setLoad] = useState(true);

    setTimeout(() => {
        setLoad(false);
    }, 1000)

    return (
        <div className={style.containerAbout}>
            {
                load ? <Loading /> :
                    <>
                        <div className={style.informacionAbout}>
                            <div className={style.myInfo}>
                                <h1>About Me</h1>
                                <p>My name is Nicolas Flores and I am 23 years old. I have always been a very collaborative person and willing to help others. I enjoy working in a team and learning from my colleagues.</p>
                                <p>As for my personal interests, I love football and follow my favourite team in every match. I also like to watch anime and play video games when I have free time. </p>
                                <p>Currently, I am learning new technologies to improve my skills as a developer and offer innovative solutions to my clients. I focus on constantly learning and maintaining a positive attitude towards challenges.</p>
                                <p>If you need more information about me or want to work together on a project, do not hesitate to contact me.</p>
                            </div>
                            <div className={style.myPhoto}>
                                <img src="https://media.licdn.com/dms/image/D4D03AQGzHYrRG_4Pwg/profile-displayphoto-shrink_800_800/0/1669349490038?e=1685577600&v=beta&t=F4PKcrjDsfYM9LJ_D39xghW_7eckmsQY65UwbDR1Ns8" alt="FotoPersonal" />
                            </div>
                        </div>
                    </>
            }
        </div >
    );
};

export default About;