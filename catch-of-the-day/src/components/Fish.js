import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({ details, addToOrder, index, removeFromOrder, order }) => {
  const found = Object.entries(order).find(
    ([key, value]) => key === index && value > 0
  );
  const { image, name, price, desc, status } = details;
  const isAvailable = status === 'available';

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">{name}</h3>
      <span className="price">{formatPrice(price)}</span>
      <p>{desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}
        type="submit"
      >
        {isAvailable ? `Add to Order` : `Sold Out`}
      </button>
      {found && (
        <button type="submit" onClick={() => removeFromOrder(index)}>
          Remove from Order
        </button>
      )}
    </li>
  );
};

Fish.propTypes = {
  details: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default Fish;
