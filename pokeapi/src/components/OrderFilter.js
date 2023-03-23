import React from 'react'
import { useEffect } from 'react';

const OrderFilter = ({ onOrder, order, orderingOptions}) => {

  useEffect(() => { 
    console.log(order)
    onOrder(order)
  }, [order, onOrder])

  return (
    <div className="filter order-filter">
        <select value={order} onChange={(e) => onOrder(e.target.value)}>
          {orderingOptions.map((option) => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
    </div>
  )
}

export default OrderFilter