import './App.css';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <CatcoProvider>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </div>
        </CatcoProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
