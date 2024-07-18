import Image from 'next/image';
import React, { useState } from 'react';

function Cart({ cart, totalItems, totalPrice, deleteItems, setCart, cartRef }) {
  const cartItems = Object.entries(cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    const newCart = {};
    setCart(newCart);
    cartRef.current = newCart;
    setIsModalOpen(false);
  };

  return (
    <div className="mt-8 p-10 rounded-lg bg-white">
      <h2 className="font-bold text-2xl text-orange-700">
        Your Cart ({totalItems})
      </h2>

      <ul>
        {cartItems.map(([name, item], index) => (
          <div key={index}>
            {item.quantity > 0 ? (
              <li className="flex justify-between border-b py-6 items-center">
                <div className="flex flex-col">
                  <div className="font-semibold text-orange-950">{name}</div>
                  <div className="flex gap-8">
                    <div className="text-orange-950">{item.quantity}x</div>
                    <div className="font-thin text-orange-950">
                      @ ${item.price.toFixed(2)}{' '}
                    </div>
                    <div className="font-thin">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => deleteItems(item)}
                    className="border border-gray-500 rounded-full p-1"
                  >
                    <Image
                      className=""
                      alt="remove-icon"
                      src="/assets/images/icon-remove-item.svg"
                      height={10}
                      width={10}
                    />
                  </button>
                </div>
              </li>
            ) : (
              ''
            )}
          </div>
        ))}
      </ul>

      {totalItems ? (
        <div>
          <div className="flex justify-between py-6">
            <div className="items-center text-orange-950 font-light">
              Order Total
            </div>
            <div className="font-bold text-3xl">${totalPrice.toFixed(2)}</div>
          </div>
          <div className="text-center w-full bg-red-50 p-6 rounded-lg my-6 flex justify-center gap-1">
            <Image
              src="/assets/images/icon-carbon-neutral.svg"
              height={20}
              width={20}
              alt="icon-carbon-neutral"
            />
            <p className="text-xs text-orange-950">
              This is a <span className="font-semibold">carbon-neutral</span>{' '}
              delivery
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-orange-700 px-8 py-4 text-white rounded-full"
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <div className="p-10 flex flex-col gap-6">
          <Image
            className="mx-auto"
            src="/assets/images/illustration-empty-cart.svg"
            height={200}
            width={200}
            alt="empty cart"
          />
          <p className="text-center text-orange-950">
            Your added items will appear here
          </p>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-x-0 bottom-0 md:inset-0 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-8/12 lg:w-5/12">
              <Image
                className="pb-8"
                src="/assets/images/icon-order-confirmed.svg"
                height={40}
                width={40}
              />
              <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
              <h2 className="text-sm font-extralight mb-4">
                We hope you enjoy your food!
              </h2>
              <ul className="bg-red-50 p-5">
                {cartItems.map(([name, item], index) => (
                  <li className="py-6 border-b">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            className="mx-auto"
                            src={item.image.desktop}
                            height={60}
                            width={60}
                            alt=""
                          />
                        </div>
                        <div className="font-semibold text-orange-950">
                          {name}
                          <div className="flex gap-8">
                            <div className="text-orange-950">
                              {item.quantity}x
                            </div>
                            <div className="font-thin text-orange-950">
                              @ ${item.price.toFixed(2)}{' '}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="font-light">
                        ${(item.price * item.quantity).toFixed(2)}
                        {console.log(item)}
                      </div>
                    </div>
                    <div></div>
                  </li>
                ))}
                <div className="flex justify-between py-6">
                  <div className="items-center text-orange-950 font-light">
                    Order Total
                  </div>
                  <div className="font-bold text-2xl">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
              </ul>

              <button
                onClick={closeModal}
                className="mt-4 bg-orange-700 p-3 text-white rounded-full w-full"
              >
                Start New Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
