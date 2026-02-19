import React, { useRef, useState, useLayoutEffect } from "react";
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
  const wrapperRef = useRef(null);

  // Example: track container width to adjust card layout
  const [columns, setColumns] = useState(3);

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      const width = wrapperRef.current.offsetWidth;

      // Dynamically adjust columns based on container width
      if (width > 1000) setColumns(4);
      else if (width > 700) setColumns(3);
      else if (width > 500) setColumns(2);
      else setColumns(1);
    }
  }, [children]);
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

      <div
        ref={wrapperRef}
        className={styles.cardWrapper}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {children}
      </div>
    </>
  );
};

export default CardWrapper;