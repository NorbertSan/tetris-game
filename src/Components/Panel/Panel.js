import React from "react";
import styles from "./Panel.module.scss";

const Panel = ({ score, lines, level, figures, tooglePause, restartGame }) => {
  return (
    <>
      <div className={styles.wrapperInfo}>
        <div className={styles.info}>Level : {level}</div>
        <div className={styles.info}>Score : {score}</div>
        <div className={styles.info}>Lines : {lines}</div>
        <div className={styles.info}>Figures : {figures}</div>
        <button onClick={tooglePause} className={styles.pauseBtn}>
          Pause
        </button>
        <button onClick={restartGame} className={styles.pauseBtn}>
          Restart
        </button>
      </div>
    </>
  );
};

export default Panel;
