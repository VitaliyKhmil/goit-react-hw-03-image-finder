import PropTypes from 'prop-types';
import { ImageGalleryCard } from './ImageGalleryCard/ImageGalleryCard';
import { ImageGalleryList, ImageGalleryListItem } from './ImageGallery.styled';

const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => {
        return (
          <ImageGalleryListItem key={item.id}>
            <ImageGalleryCard item={item} />
          </ImageGalleryListItem>
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
