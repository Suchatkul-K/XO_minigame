import React, { useEffect } from "react";

function Row({ item, index, onClick }) {
  const itemInRow = item.length

  // responsive font for suitable Mark size
  useEffect(() => {
    const updateFontSizes = () => {
      const component = document.getElementById(`row-${index}`);
      const width = component.offsetWidth - ((itemInRow - 1) * 4);
      // min 1rem, max 10rem
      const fontSize = Math.max(1, Math.min(10, width / (itemInRow * 40))) + "rem";
      component.style.setProperty("--font-size", fontSize);
    };

    window.addEventListener("resize", updateFontSizes);
    window.addEventListener("DOMContentLoaded", updateFontSizes);
    updateFontSizes(); // Initial call

    return () => {
      window.removeEventListener("resize", updateFontSizes);
      window.removeEventListener("DOMContentLoaded", updateFontSizes);
    };
  }, []);


  return (
    // Row container
    <div
      className="flex justify-between flex-1 w-full items-center h-full gap-1"
      id={`row-${index}`}
    >
      {/* Block item */}
      {item.map((el, i) => (
        <div
          key={i}
          className="btn p-0 h-full aspect-square flex-grow"
          onClick={(e) => onClick(index, i)}
        >
          <p className="responsive-font max-w-full font-semibold">
          {el[2]}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Row;
