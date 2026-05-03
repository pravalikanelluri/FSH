import { useMemo, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { products } from './data/products.js';

const categories = ['All', 'Men', 'Women', 'Kids'];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Navbar({ isAuthenticated, cartCount, onLogout }) {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-leaf-700 text-white' : 'text-leaf-900 hover:bg-leaf-100'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-leaf-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-leaf-900">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-700 text-white">
            <Leaf size={21} />
          </span>
          <span className="text-lg font-black sm:text-xl">Fashion Sustainability Hub</span>
        </Link>

        <button
          className="rounded-full p-2 text-leaf-900 hover:bg-leaf-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          {isAuthenticated && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/cart" className={linkClass}>
                Cart {cartCount > 0 && <span className="ml-1 rounded-full bg-leaf-100 px-2 text-leaf-800">{cartCount}</span>}
              </NavLink>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          )}
        </div>
      </nav>

      {open && (
        <div className="border-t border-leaf-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            {isAuthenticated && <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>}
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>Cart ({cartCount})</NavLink>
                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Home() {
  return (
    <main>
      <section className="eco-pattern">
        <div className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf-700 shadow-sm">
              Conscious clothing, curated simply
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-leaf-950 sm:text-5xl lg:text-6xl">
              Fashion Sustainability Hub
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              Discover better-made essentials from organic, recycled, upcycled, and low-impact materials. Shop by category, build a cart, and choose pieces designed to last longer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="rounded-full bg-leaf-700 px-6 py-3 text-center font-bold text-white shadow-soft transition hover:bg-leaf-800">
                Browse Products
              </Link>
              <Link to="/contact" className="rounded-full border border-leaf-300 bg-white px-6 py-3 text-center font-bold text-leaf-800 transition hover:bg-leaf-50">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80"
              alt="Sustainable fashion model"
              className="h-[420px] w-full object-cover sm:h-[560px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Login({ onLogin, isAuthenticated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onLogin(form.email);
      navigate('/dashboard');
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="hidden pr-12 lg:block">
        <h1 className="text-5xl font-black leading-tight text-leaf-950">Welcome back to cleaner fashion choices.</h1>
        <p className="mt-5 text-lg leading-8 text-stone-700">Log in with any valid email and a six-character password to explore the dashboard.</p>
      </section>
      <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-2xl border border-leaf-100 bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-3xl font-black text-leaf-950">Login</h2>
        <label className="mt-6 block text-sm font-bold text-stone-700" htmlFor="email">Email</label>
        <input
          id="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="mt-2 w-full rounded-xl border border-leaf-200 px-4 py-3 outline-none transition focus:border-leaf-600 focus:ring-4 focus:ring-leaf-100"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>}

        <label className="mt-5 block text-sm font-bold text-stone-700" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          className="mt-2 w-full rounded-xl border border-leaf-200 px-4 py-3 outline-none transition focus:border-leaf-600 focus:ring-4 focus:ring-leaf-100"
          placeholder="Minimum 6 characters"
        />
        {errors.password && <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>}

        <button className="mt-7 w-full rounded-full bg-leaf-700 px-5 py-3 font-bold text-white transition hover:bg-leaf-800">
          Login
        </button>
      </form>
    </main>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-black text-leaf-950">{product.name}</h3>
          <span className="rounded-full bg-leaf-100 px-3 py-1 text-sm font-black text-leaf-800">{formatPrice(product.price)}</span>
        </div>
        <p className="text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="rounded-full border border-leaf-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-leaf-700">{product.category}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 rounded-full bg-leaf-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-800"
          >
            <ShoppingBag size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

function Dashboard({ onAddToCart }) {
  const [category, setCategory] = useState('All');
  const filteredProducts = category === 'All' ? products : products.filter((product) => product.category === category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-3xl bg-leaf-900 px-5 py-8 text-white shadow-soft sm:px-8">
        <p className="font-bold text-leaf-200">Dashboard</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Shop sustainable clothing</h1>
        <p className="mt-3 max-w-2xl text-leaf-100">Browse dummy products across Men, Women, and Kids categories, then add your favorites to the cart.</p>
      </section>

      <div className="mb-7 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-5 py-2 text-sm font-black transition ${
              category === item ? 'bg-leaf-700 text-white' : 'bg-white text-leaf-800 hover:bg-leaf-100'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </section>
    </main>
  );
}

function Cart({ cart, onRemove, onIncrement, onDecrement }) {
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-leaf-950 sm:text-4xl">Your Cart</h1>
      {cart.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-leaf-100 bg-white p-8 text-center shadow-sm">
          <p className="text-stone-700">Your cart is empty.</p>
          <Link to="/dashboard" className="mt-5 inline-flex rounded-full bg-leaf-700 px-5 py-3 font-bold text-white">Browse products</Link>
        </section>
      ) : (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {cart.map((item) => (
              <article key={item.id} className="grid gap-4 rounded-2xl border border-leaf-100 bg-white p-4 shadow-sm sm:grid-cols-[130px_1fr_auto]">
                <img src={item.image} alt={item.name} className="h-32 w-full rounded-xl object-cover sm:w-32" />
                <div>
                  <h2 className="text-lg font-black text-leaf-950">{item.name}</h2>
                  <p className="mt-1 text-sm text-stone-600">{item.description}</p>
                  <p className="mt-2 font-black text-leaf-800">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full border border-leaf-200 bg-leaf-50">
                    <button onClick={() => onDecrement(item.id)} className="p-2 text-leaf-800" aria-label="Decrease quantity"><Minus size={16} /></button>
                    <span className="w-8 text-center font-black text-leaf-950">{item.quantity}</span>
                    <button onClick={() => onIncrement(item.id)} className="p-2 text-leaf-800" aria-label="Increase quantity"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-100">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-leaf-100 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-black text-leaf-950">Order Summary</h2>
            <div className="mt-5 flex justify-between border-b border-leaf-100 pb-4 text-stone-700">
              <span>Items</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="mt-4 flex justify-between text-xl font-black text-leaf-950">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="mt-6 w-full rounded-full bg-leaf-700 px-5 py-3 font-bold text-white transition hover:bg-leaf-800">
              Checkout
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <section>
        <p className="font-bold text-leaf-700">Contact</p>
        <h1 className="mt-2 text-4xl font-black text-leaf-950">Questions about sustainable style?</h1>
        <p className="mt-4 max-w-xl leading-7 text-stone-700">Send a message about products, sourcing, or partnerships. This demo form confirms submission locally.</p>
      </section>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
          event.currentTarget.reset();
        }}
        className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-bold text-stone-700">
            Name
            <input required className="mt-2 w-full rounded-xl border border-leaf-200 px-4 py-3 outline-none focus:border-leaf-600 focus:ring-4 focus:ring-leaf-100" placeholder="Your name" />
          </label>
          <label className="block text-sm font-bold text-stone-700">
            Email
            <input required type="email" className="mt-2 w-full rounded-xl border border-leaf-200 px-4 py-3 outline-none focus:border-leaf-600 focus:ring-4 focus:ring-leaf-100" placeholder="you@example.com" />
          </label>
        </div>
        <label className="mt-5 block text-sm font-bold text-stone-700">
          Message
          <textarea required rows="6" className="mt-2 w-full resize-none rounded-xl border border-leaf-200 px-4 py-3 outline-none focus:border-leaf-600 focus:ring-4 focus:ring-leaf-100" placeholder="How can we help?" />
        </label>
        {sent && <p className="mt-4 rounded-xl bg-leaf-100 px-4 py-3 font-bold text-leaf-800">Thanks, your message has been received.</p>}
        <button className="mt-6 rounded-full bg-leaf-700 px-6 py-3 font-bold text-white transition hover:bg-leaf-800">Send Message</button>
      </form>
    </main>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function logout() {
    setUser(null);
    setCart([]);
    navigate('/');
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar isAuthenticated={Boolean(user)} cartCount={cartCount} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login isAuthenticated={Boolean(user)} onLogin={setUser} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={Boolean(user)}>
              <Dashboard onAddToCart={addToCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={Boolean(user)}>
              <Cart
                cart={cart}
                onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))}
                onIncrement={(id) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))}
                onDecrement={(id) => setCart((current) => current.flatMap((item) => {
                  if (item.id !== id) return [item];
                  return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
                }))}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
