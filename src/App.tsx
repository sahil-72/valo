import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [scene, setScene] = useState<number>(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenes = [
    {
      title: "Suniye my sweet Gajar... ❤️",
      message: "Main kaafi der se humare baare mein soch raha tha, aur mujhe aap se kuch dil ki baat kehni hai.",
      img: "/assets/bubu_shy.png",
      btnText: "Bataiye kya baat hai? 🙈"
    },
    {
      title: "Aap mujhe boht cute lagte ho, Motu! ✨",
      message: "Aap kitni sexy, sundar aur pyaari hain... main hamesha sochta hoon ki main kitna lucky hoon ki aap jaisa koi meri life mein hai.",
      img: "/assets/dudu_heart.png",
      btnText: "Acha jiii... (aur sunna hai) 🥺"
    },
    {
      title: "Main apke liye best hu",
      message: "Main aapke liye sab kuch karunga. Apke liye lays crispz launga, apko huggie karunga, kissi bhi karunga or vo sab bhi (ahm ahm) 😉",
      img: "/assets/bubu_shy.png",
      btnText: "Sachi na? 👉👈"
    },
    {
      title: "Toh, Gajar... ❤️",
      message: "kya aap mere valentine banoge?? Motuuuuu bataoooo",
      img: "/assets/dudu_heart.png",
      isProposal: true
    },
    {
      title: "YAYYYYY! Mere Motu ne HAAN keh di! ❤️",
      message: "Mujhe pata tha tum haan hi karogi, mere mai kuch baat to hai. Charismatic hi boht hu, haina meri shawty?",
      img: "/assets/bubu_dudu_hug.png",
      isSuccess: true
    }
  ];

  const handleNext = () => {
    if (scene === 0 && !isMusicPlaying) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play deferred", e));
        setIsMusicPlaying(true);
      }
    }
    setScene((prev) => prev + 1);
  };

  const handleNoHover = () => {
    const newX = Math.random() * 400 - 200;
    const newY = Math.random() * 400 - 200;
    setNoButtonPos({ x: newX, y: newY });
    setYesButtonScale(prev => Math.min(prev + 0.1, 2.5));
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    setScene(4);
  };

  const FloatingHearts = () => {
    const heartsCount = 12; // Reduced count for performance
    return (
      <div className="hearts-container" style={{ position: 'fixed', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: heartsCount }).map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{
              bottom: '-10%',
              left: `${(i / heartsCount) * 100}%`,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              bottom: '110%',
              opacity: [0, 0.8, 0.8, 0],
              x: [0, Math.sin(i) * 30, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "linear"
            }}
            style={{ fontSize: '24px' }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    );
  };

  const currentScene = scenes[scene];

  return (
    <div className="app-main">
      <FloatingHearts />
      {/*<audio ref={audioRef} src="/assets/romantic_music.mp3" loop />*/}

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="container"
        >
          <motion.img
            src={currentScene.img}
            alt="cute"
            className="character-img"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '3rem', marginBottom: '1rem' }}
          >
            {currentScene.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}
          >
            {currentScene.message}
          </motion.p>

          {!currentScene.isProposal && !currentScene.isSuccess && (
            <motion.div className="button-group">
              <motion.button
                className="btn-yes"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentScene.btnText}
              </motion.button>
            </motion.div>
          )}

          {currentScene.isProposal && (
            <div className="button-group">
              <motion.button
                className="btn-yes"
                onClick={handleYes}
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.1 }}
                whileTap={{ scale: yesButtonScale * 0.9 }}
              >
                Yes!
              </motion.button>

              <motion.button
                className="btn-no"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
              >
                {noCount === 0 ? "Nahi" : noCount < 3 ? "Pakka?" : noCount < 5 ? "Soch lo?" : "Maan jao na?"}
              </motion.button>
            </div>
          )}

          {currentScene.isSuccess && (
            <motion.div
              style={{ marginTop: '2rem' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <h2 style={{ fontSize: '2rem', color: '#ff4d6d' }}>I love youuuu bhalu mere... ❤️</h2>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
