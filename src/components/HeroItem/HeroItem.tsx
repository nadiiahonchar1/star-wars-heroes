import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroItem.module.css';

const HeroItem: React.FC<HeroItemProps> = ({ id, name }) => {
  return (
    <li className={styles.characterCard}>
      <Link to={`/hero/${id}`}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt={name}
          className={styles.characterImage}
        />
        <div className={styles.characterName}>{name}</div>
      </Link>
    </li>
  );
};

export default HeroItem;
