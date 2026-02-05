import React from "react";
import styles from "./CardWrapper.module.css";

const CardWrapper = ({
  children,
  searchTerm,
  setSearchTerm,
  titles,
  selectedTitle,
  setSelectedTitle,
  mode
}) => {
  return (
    <>
      <div className={`${styles.cardControls} ${styles[mode]}`}>
        <p className={styles.cardLabel}>Search by Title:</p>

        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.cardSearch}
        />

        <p className={styles.cardLabel}>Search by Name:</p>

        <select
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          className={styles.cardDropdown}
        >
          {titles.map(title => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedTitle('All');
          }}
          className={styles.cardClearButton}
        >
          Clear Filters
        </button>
      </div>

      <div className={styles.cardWrapper}>
        {children}
      </div>
    </>
  );
};

export default CardWrapper;