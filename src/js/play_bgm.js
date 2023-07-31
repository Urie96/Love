import bgm from '../assets/chun.mp3';

const sound = new Audio(bgm);
sound.loop = true;
sound.play();
document.body.addEventListener('click', (e) => sound.play());