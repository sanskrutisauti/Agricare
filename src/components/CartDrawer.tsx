import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    t,
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotalINR,
    addOrder,
    profile,
    setActiveSection,
  } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  // Form fields
  const [farmerName, setFarmerName] = useState(profile.name);
  const [farmerPhone, setFarmerPhone] = useState(profile.phone);
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Farm Plot No. 84, Post Haveli, District Pune, Maharashtra'
  );
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');

  const deliveryFee = cartSubtotalINR > 999 || cartSubtotalINR === 0 ? 0 : 70;
  const totalAmount = cartSubtotalINR + deliveryFee;

  if (!isCartOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const demoId = `ORD-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;

    addOrder({
      id: demoId,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        quantity: c.quantity,
        unitPrice: c.product.priceINR,
      })),
      totalAmount: totalAmount,
      orderDate: new Date().toISOString().split('T')[0],
      paymentStatus:
        paymentMethod === 'cod'
          ? 'Demo Paid (Cash on Delivery / KVK Verification)'
          : 'Demo Paid (UPI / Kisan Credit Card Simulation)',
      dispatchStatus: 'Processing',
      deliveryAddress: deliveryAddress,
      contactNumber: farmerPhone,
      isDemonstration: true,
    });

    setOrderPlacedId(demoId);
    clearCart();
    setIsCheckingOut(false);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setOrderPlacedId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-800" />
            <h2 className="font-bold text-base text-stone-900">{t.cartTitle}</h2>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success confirmation */}
        {orderPlacedId ? (
          <div className="p-6 sm:p-8 space-y-4 text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {t.orderSuccessTitle}
            </h3>
            <p className="text-xs text-stone-600">
              {t.orderIdLabel}: <strong className="font-mono text-emerald-900">{orderPlacedId}</strong>
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
              {t.orderTrackNotice}
            </div>
            <button
              onClick={() => {
                handleClose();
                setActiveSection('dashboard');
              }}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs"
            >
              View Order in Dashboard
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-[11px] leading-relaxed">
              {t.checkoutNotice}
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{t.farmerNameLabel}</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{t.farmerPhoneLabel}</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{t.deliveryAddressLabel}</label>
              <textarea
                rows={2}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">{t.paymentMethodLabel}</label>
              <div className="space-y-2">
                <label className="p-3 rounded-xl border border-stone-200 flex items-center gap-2 cursor-pointer hover:bg-stone-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-emerald-700"
                  />
                  <span>{t.payCod}</span>
                </label>
                <label className="p-3 rounded-xl border border-stone-200 flex items-center gap-2 cursor-pointer hover:bg-stone-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="text-emerald-700"
                  />
                  <span>{t.payUpiDemo}</span>
                </label>
              </div>
            </div>

            {/* Price review */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1 pt-2">
              <div className="flex justify-between">
                <span>{t.subtotal}:</span>
                <span className="font-bold">₹{cartSubtotalINR}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>{t.deliveryFee}:</span>
                <span>{deliveryFee === 0 ? t.deliveryFree : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-950 text-sm pt-1 border-t border-stone-200">
                <span>{t.totalAmount}:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-1/3 py-2.5 border border-stone-200 font-semibold text-stone-600 rounded-xl"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs"
              >
                {t.placeOrderBtn}
              </button>
            </div>
          </form>
        ) : cart.length === 0 ? (
          /* Empty Cart */
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-stone-800">{t.cartEmpty}</h3>
            <p className="text-xs text-stone-500">{t.cartEmptySub}</p>
            <button
              onClick={() => {
                handleClose();
                setActiveSection('marketplace');
              }}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              {t.continueShopping}
            </button>
          </div>
        ) : (
          /* Cart Items List */
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
            {cart.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">{item.product.packSize}</p>
                  <span className="text-xs font-bold text-emerald-800">
                    ₹{item.product.priceINR}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-stone-400 hover:text-red-600 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Subtotal & Checkout Button */}
        {!orderPlacedId && !isCheckingOut && cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>{t.subtotal}:</span>
                <span className="font-bold text-stone-900">₹{cartSubtotalINR}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>{t.deliveryFee}:</span>
                <span>{deliveryFee === 0 ? t.deliveryFree : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-black text-emerald-950 text-base pt-1 border-t border-stone-200">
                <span>{t.totalAmount}:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>{t.proceedCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
