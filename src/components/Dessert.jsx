'use client';
import React, { useState, useRef } from 'react';
import DessertCard from '@/components/DessertCard';
import Cart from './Cart';

function Dessert({ data }) {
  const cartRef = useRef({});
  const [cart, setCart] = useState({});

  const removeItem = (item) => {
    const newCart = { ...cartRef.current };
    const cartItem = newCart[item.name];
    if (cartItem && cartItem.quantity > 0) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        delete newCart[item.name];
      } else {
        newCart[item.name] = cartItem;
      }
    }
    cartRef.current = newCart;
    setCart(newCart);
  };

  const addItem = (item) => {
    const newCart = { ...cartRef.current }; // Create a shallow copy of cartRef.current
    if (newCart[item.name]) {
      // If item already exists, increase its quantity
      newCart[item.name].quantity += 1;
    } else {
      // Otherwise, add the new item with quantity 1
      newCart[item.name] = { ...item, quantity: 1 };
    }
    cartRef.current = newCart; // Update the ref
    setCart(newCart); // Update the state to trigger re-render
  };

  const deleteItems = (item) => {
    const newCart = { ...cartRef.current };
    delete newCart[item.name];
    cartRef.current = newCart;
    setCart(newCart);
  };

  // Calculate total price of items in the cart
  //   const totalUniqueItems = Object.keys(cart).length;

  // Calculate total number of items in the cart
  const totalItems = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price of items in the cart
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="basis-2/3">
        <h1 className="font-bold text-3xl pb-10">Desserts</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <DessertCard
              key={index}
              img={item.image.desktop}
              name={item.name}
              type={item.category}
              price={item.price}
              addItem={() => addItem(item)}
              cart={cart}
              removeItem={() => removeItem(item)}
            />
          ))}
        </div>
      </div>
      <div className="basis-1/3">
        <Cart
          cart={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          deleteItems={deleteItems}
          setCart={setCart}
          cartRef={cartRef}
        />
      </div>
    </div>
  );
}

export default Dessert;
