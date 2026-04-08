import React, { useState } from "react";

export default function App() {
  const images = [
    {
      name: "Mountain",
      url: "https://picsum.photos/id/1018/800/400",
    },
    {
      name: "Forest",
      url: "https://picsum.photos/id/1015/800/400",
    },
    {
      name: "Sea",
      url: "https://picsum.photos/id/1016/800/400",
    },
    {
      name: "Road",
      url: "https://picsum.photos/id/1020/800/400",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial", padding: "20px" }}>
      <h2>Image Slider</h2>

      <div>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].name}
          style={{ width: "800px", height: "400px", objectFit: "cover" }}
        />
      </div>

      <h3>{images[currentIndex].name}</h3>

      <div style={{ marginTop: "15px" }}>
        <button onClick={prevImage}>Prev</button>
        <button onClick={nextImage} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {images.map((img, index) => (
          <span
            key={index}
            onClick={() => selectImage(index)}
            style={{
              display: "inline-block",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              margin: "0 6px",
              backgroundColor: currentIndex === index ? "black" : "lightgray",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}