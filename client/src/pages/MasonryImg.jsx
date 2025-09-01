import React from 'react';
import Masonry,{ ResponsiveMasonry} from 'react-responsive-masonry';
import Gallary from './Gallary'

const MasonryImg = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {Gallary.map((image, index) => (
          <img
            src={image}
            key={index}
            alt={`Gallery image ${index + 1}`} // add descriptive alt text
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '10px',
              // add more specific styles for different screen sizes
              '@media (max-width: 768px)': {
                width: '50%',
              },
              '@media (max-width: 350px)': {
                width: '100%',
              },
            }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImg;