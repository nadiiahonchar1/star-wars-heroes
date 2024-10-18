import React from 'react';
import styles from './HeroItem.module.css';

const HeroItem: React.FC<HeroItemProps> = ({ id, name }) => {
  return (
    <li className={styles.characterCard}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt={name}
        className={styles.characterImage}
      />
      <div className={styles.characterName}>{name}</div>
    </li>
  );
};

export default HeroItem;
