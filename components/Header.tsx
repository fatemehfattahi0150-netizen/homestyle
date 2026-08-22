export default function Header() {
    return (
      <header className="site-header">
        <div className="header-container">
  
          <div className="logo">
            <img
              src="/media/hom.png"
              alt="لوگوی فروشگاه"
              className="logo-img"
            />
          </div>
  
          <nav className="main-nav">
            <a href="#" className="nav-link active">خانه</a>
            <a href="#" className="nav-link">تیشرت</a>
            <a href="#" className="nav-link">شلوار</a>
            <a href="#" className="nav-link">کت</a>
            <a href="#" className="nav-link">درباره ما</a>
          </nav>
  
          <div className="header-icons">
  
            <button className="icon-btn" aria-label="جستجو">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
  
            <button className="icon-btn" aria-label="حساب کاربری">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
  
            <button className="icon-btn cart-btn" aria-label="سبد خرید">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
  
              <span className="cart-count">0</span>
            </button>
  
          </div>
  
        </div>
      </header>
    );
  }