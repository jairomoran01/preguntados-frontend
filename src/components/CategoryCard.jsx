import React from 'react';

const CategoryCard = ({ category, icon, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category)}
      className="card-base group flex flex-col items-center justify-between p-6 text-center cursor-pointer min-h-[220px] dark:bg-opacity-70 light:bg-opacity-90 hover:shadow-lg dark:hover:bg-opacity-80 light:hover:bg-opacity-100"
      // Aplicando .card-base y clases de Tailwind para el diseño y hover
    >
      <div className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3 dark:text-white light:text-gray-800">
        {category}
      </h3>
      <button
        className="btn mt-auto py-2 px-6 text-sm" // Usando la clase .btn de index.css
      >
        Jugar
      </button>
    </div>
  );
};

export default CategoryCard;