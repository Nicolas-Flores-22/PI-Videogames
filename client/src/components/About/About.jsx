import style from './About.module.css';

const About = () => {
    return (
        <div className={style.containerAbout}>
            <div className={style.informacionAbout}>
                <div className={style.myInfo}>
                    <h1>Sobre Mí</h1>
                    <p>Mi nombre es Nicolas Flores y tengo 23 años. Siempre he sido una persona muy colaborativa y dispuesta a ayudar a los demás. Disfruto mucho trabajar en equipo y aprender de mis compañeros.</p>
                    <p>En cuanto a mis intereses personales, me encanta el fútbol y sigo a mi equipo favorito en cada partido. También me gusta ver animes y jugar videojuegos cuando tengo tiempo libre. </p>
                    <p>Actualmente, estoy aprendiendo nuevas tecnologías para mejorar mis habilidades como desarrollador y ofrecer soluciones innovadoras a mis clientes. Me enfoco en aprender constantemente y en mantener una actitud positiva ante los desafíos.</p>
                    <p>Si necesitas más información sobre mí o quieres trabajar juntos en un proyecto, no dudes en contactarme.</p>
                </div>
                <div className={style.myPhoto}>
                    <img src="https://media.licdn.com/dms/image/D4D03AQGzHYrRG_4Pwg/profile-displayphoto-shrink_800_800/0/1669349490038?e=1685577600&v=beta&t=F4PKcrjDsfYM9LJ_D39xghW_7eckmsQY65UwbDR1Ns8" alt="FotoPersonal" />
                </div>
            </div>
        </div >
    );
};

export default About;