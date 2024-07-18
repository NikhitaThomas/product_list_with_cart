'use client';
import Image from 'next/image';
import React from 'react';

function DessertCard({ img, type, name, price, addItem, cart, removeItem }) {
  const itemInCart = cart[name] || { quantity: 0 };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <Image
          className={`rounded-lg ${
            itemInCart.quantity > 0 ? 'border-2 border-orange-700' : ''
          }`}
          src={img}
          width={300}
          height={400}
          style={{ width: '100%' }}
          alt="dessert"
        />
        {/* <div className="absolute bottom-0 left-[20%] rounded-xl transform translate-y-1/2"> */}
        <div className="absolute w-full absolute bottom-0 flex justify-center transform translate-y-1/2">
          {itemInCart.quantity > 0 ? (
            <div className="flex gap-6 rounded-full bg-orange-700 py-5 w-9/12 px-auto text-white justify-around">
              <button
                onClick={removeItem}
                className="border-2 border-white rounded-full p-1"
              >
                <Image
                  src={'/assets/images/icon-decrement-quantity.svg'}
                  height={15}
                  width={15}
                  alt=""
                />
              </button>
              {itemInCart.quantity}
              <button
                onClick={addItem}
                className="border-2 border-white rounded-full p-1"
              >
                <Image
                  src={'/assets/images/icon-increment-quantity.svg'}
                  height={15}
                  width={15}
                  alt=""
                />
              </button>
            </div>
          ) : (
            <button
              className="py-5 w-9/12 px-auto bg-white rounded-full border border-gray-400 flex justify-center gap-3"
              onClick={addItem}
            >
              <Image
                src={'/assets/images/icon-add-to-cart.svg'}
                height={25}
                width={25}
                alt=""
              />
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-orange-950 font-extralight">{type}</p>
        <p>{name}</p>
        <p className="text-orange-700">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default DessertCard;
