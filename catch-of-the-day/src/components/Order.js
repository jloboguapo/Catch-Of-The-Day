import PropTypes from 'prop-types';
import React from 'react';

import { formatPrice } from '../helpers';

const Order = ({ fishes, order }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const available = fish && fish.status;

    if (available) {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);

  const renderOrder = key => {
    const fish = fishes[key];
    const count = order[key];

    if (!fish || count === 0) return null;
    if (!fish.status)
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      );

    return (
      <li key={key}>
        {count} lbs {fish.name}
        <span>&nbsp;{formatPrice(count * fish.price)}</span>
      </li>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">{orderIds.map(renderOrder)}</ul>
      <div className="total">
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

export default Order;
