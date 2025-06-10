import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  // Produkte mit Bildern, Namen und Preisen
  const products = [
    {
      id: 1,
      name: "Rundes Kuschelbett für Katzen",
      price: 24.99,
      image: "https://placehold.co/300x200?text=Kuschelbett"
    },
    {
      id: 2,
      name: "Handyhülle kompatibel für iPhone 16 Pro Max, 15, 14, 13, 12, 11",
      price: 7.99,
      image: "https://placehold.co/300x200?text=Handyhülle"
    },
    {
      id: 3,
      name: "Süßer Mini-Tischstaubsauger",
      price: 11.99,
      image: "https://placehold.co/300x200?text=Mini-Staubsauger"
    },
    {
      id: 4,
      name: "Herren-Armband aus Edelstahl mit Goldton Schlangenmuster",
      price: 10.99,
      originalPrice: 15.99,
      image: "https://placehold.co/300x200?text=Armband"
    },
    {
      id: 5,
      name: "Unisex Uhrband – einfach und bequem",
      price: 9.99,
      image: "https://placehold.co/300x200?text=Uhrband"
    },
    {
      id: 6,
      name: "Widerstandsbänder Push-Up-Bars faltbar & tragbar",
      price: 27.99,
      image: "https://placehold.co/300x200?text=Push-Up-Bar"
    }
  ];

  // Warenkorb-Funktionen
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitOrder = (e) => {
    e.preventDefault();
    setOrderStatus('loading');

    setTimeout(() => {
      if (Math.random() > 0.2) {
        setOrderStatus('success');
        setCart([]);
        setFormData({
          name: '',
          email: '',
          address: '',
          city: '',
          zip: ''
        });
      } else {
        setOrderStatus('error');
      }
    }, 2000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Tringl</h1>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Warenkorb ({cart.length})
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Willkommen bei Tringl</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dein Online-Shop für Gadgets & Accessoires.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Unsere Produkte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  {product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  >
                    In den Warenkorb
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Warenkorb</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center py-8 text-gray-600">Dein Warenkorb ist leer.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-indigo-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                        <p className="ml-4 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Gesamt:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <form onSubmit={submitOrder}>
                    <h3 className="text-xl font-semibold mb-4">Versandadresse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postleitzahl</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={orderStatus === 'loading'}
                      className={`w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${
                        orderStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {orderStatus === 'loading' ? 'Bestellung wird bearbeitet...' : 'Jetzt bestellen'}
                    </button>
                  </form>

                  {orderStatus === 'success' && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
                      <p>Vielen Dank! Deine Bestellung wurde erfolgreich aufgegeben.</p>
                    </div>
                  )}

                  {orderStatus === 'error' && (
                    <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
                      <p>Leider gab es einen Fehler bei der Bestellung. Bitte versuche es erneut.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-indigo-600">Tringl</h3>
            </div>
            <div className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Tringl. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}