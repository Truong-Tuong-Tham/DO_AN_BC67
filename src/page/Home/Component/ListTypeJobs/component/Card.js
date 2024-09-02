import React from "react";

// Array of image URLs
const imageUrls = [
  "https://images.pexels.com/photos/1381679/pexels-photo-1381679.jpeg?auto=compress&cs=tinysrgb&w=600",
];

// Function to get a random image URL
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

const Card = ({ title, description, onClick }) => {
  return (
    <div
      className="relative group bg-cover bg-center border border-gray-300 transition hover:shadow-lg cursor-pointer rounded-xl overflow-hidden w-80 h-96 m-4"
      onClick={onClick}
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 transition group-hover:bg-opacity-50"></div>

      {/* Image at the top corner */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src={getRandomImage()} // Use the random image URL
          className="w-12 h-12 bg-white p-2 rounded-full shadow-md"
          alt="icon"
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <a
            href="#"
            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
