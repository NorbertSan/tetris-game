import React from "react";
import styles from "./Panel.module.scss";

const Panel = () => {
  return (
    <>
      <div className={styles.wrapperInfo}>
        <div className={styles.info}>Level : 2</div>
        <div className={styles.info}>Score : 2</div>
        <div className={styles.info}>Lines : 2</div>
        <div className={styles.info}>
          Next
          <div className={styles.image}></div>
        </div>
      </div>
      <div className={styles.pause}>Pause</div>
    </>
  );
};

export default Panel;
