import PropTypes from 'prop-types';
import React from 'react';

import { formatPrice } from '../helpers';

const Order = ({ fishes, order }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const { price, status } = fish;
    const count = order[key];
    const available = fish && status;

    if (available) {
      return prevTotal + count * price;
    }
    return prevTotal;
  }, 0);

  const renderOrder = key => {
    const fish = fishes[key];
    const { name, price, status } = fish;
    const count = order[key];

    if (!status)
      return (
        <li key={key}>Sorry {fish ? name : 'fish'} is no longer available</li>
      );

    return (
      <li key={key}>
        {count} lbs {name}
        <span>&nbsp;{formatPrice(count * price)}</span>
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
