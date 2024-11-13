import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../helpers';

const Order = ({ fishes, order, removeEntireItemFromOrder }) => {
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
    const transitionOptions = {
      classNames: 'order',
      timeout: { enter: 500, exit: 500 },
    };

    if (!fish || count === 0) return null;
    if (!fish.status)
      return (
        <CSSTransition key={key} {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );

    return (
      <CSSTransition key={key} {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}&nbsp;</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <span>&nbsp;{formatPrice(count * fish.price)}</span>
          </span>
          <button
            className="x-button"
            type="submit"
            onClick={() => removeEntireItemFromOrder(key)}
          >
            &times;
          </button>
        </li>
      </CSSTransition>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
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
