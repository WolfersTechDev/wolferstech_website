import React from 'react';

function Logo({ imagePath }) {
  return (
    <div className="text-xl font-bold flex items-center">
      <img src={imagePath} alt="Logo" className="h-20 w-auto" />
      <span className="text-xl font-bold ml-2">Wolferstech</span>
    </div>
  );
}

export default Logo;
