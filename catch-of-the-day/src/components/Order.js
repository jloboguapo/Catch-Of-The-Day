import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Order = ({ fishes, order, removeEntireItemFromOrder }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';

    if (isAvailable) {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);

  const renderOrder = key => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    }
    if (count > 0)
      return (
        <li key={key}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
          <button type="submit" onClick={() => removeEntireItemFromOrder(key)}>
            &times;
          </button>
        </li>
      );
  };
  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">{order && orderIds.map(renderOrder)}</ul>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeEntireItemFromOrder: PropTypes.func.isRequired,
};

export default Order;
