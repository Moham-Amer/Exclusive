import './style.css';

export function Footer() {
  return (
    <footer className="footer" style={{ background: "#000", color: "#fff", padding: "40px 0 0 0" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {/* Exclusive / Subscribe */}
          <div className="footer-col" style={{ flex: "1 1 200px", minWidth: "200px", marginBottom: "32px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "22px" }}>Exclusive</h4>
            <h5 style={{ margin: "24px 0 8px 0", fontWeight: 500, fontSize: "18px" }}>Subscribe</h5>
            <p style={{ margin: "0 0 16px 0", color: "#fff" }}>Get 10% off your first order</p>
            <form style={{ display: "flex", alignItems: "center", border: "2px solid #fff", borderRadius: "6px", padding: "4px 12px" }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  outline: "none",
                  flex: 1,
                  fontSize: "16px",
                  padding: "8px 0"
                }}
              />
              <button type="submit" style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
                <svg height="24" width="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
          {/* Support */}
          <div className="footer-col" style={{ flex: "1 1 200px", minWidth: "200px", marginBottom: "32px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "22px" }}>Support</h4>
            <p style={{ margin: "24px 0 8px 0", color: "#fff" }}>
              111 Bijoy sarani, Dhaka,<br />
              DH 1515, Bangladesh.
            </p>
            <p style={{ margin: "0 0 8px 0", color: "#fff" }}>exclusive@gmail.com</p>
            <p style={{ margin: 0, color: "#fff" }}>+88015-88888-9999</p>
          </div>
          {/* Account */}
          <div className="footer-col" style={{ flex: "1 1 160px", minWidth: "160px", marginBottom: "32px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "22px" }}>Account</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0 0" }}>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>My Account</a></li>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Login / Register</a></li>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Cart</a></li>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Wishlist</a></li>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Shop</a></li>
            </ul>
          </div>
          {/* Quick Link */}
          <div className="footer-col" style={{ flex: "1 1 160px", minWidth: "160px", marginBottom: "32px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "22px" }}>Quick Link</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0 0" }}>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Privacy Policy</a></li>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Terms Of Use</a></li>
              <li style={{ marginBottom: "12px" }}><a href="#" style={{ color: "#fff", textDecoration: "none" }}>FAQ</a></li>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Contact</a></li>
            </ul>
          </div>
          {/* Download App */}
          <div className="footer-col" style={{ flex: "1 1 220px", minWidth: "220px", marginBottom: "32px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "22px" }}>Download App</h4>
            <p style={{ margin: "24px 0 8px 0", color: "#fff", fontSize: "14px" }}>Save $3 with App New User Only</p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://yourapp.com" alt="QR Code" style={{ background: "#fff", borderRadius: "6px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: "32px" }} /></a>
                <a href="#"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: "32px" }} /></a>
              </div>
            </div>
            {/* <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <a href="#" style={{ color: "#fff", fontSize: "20px" }}><i className="fab fa-facebook-f"></i></a>
              <a href="#" style={{ color: "#fff", fontSize: "20px" }}><i className="fab fa-twitter"></i></a>
              <a href="#" style={{ color: "#fff", fontSize: "20px" }}><i className="fab fa-instagram"></i></a>
              <a href="#" style={{ color: "#fff", fontSize: "20px" }}><i className="fab fa-linkedin-in"></i></a>
            </div> */}
          </div>
        </div>
        {/* Copyright */}
        <div style={{
          borderTop: "1px solid #222",
          marginTop: "32px",
          padding: "18px 0 12px 0",
          textAlign: "center",
          color: "#aaa",
          fontSize: "16px"
        }}>
          <span style={{ marginRight: "8px", fontSize: "18px", verticalAlign: "middle" }}>
            <i className="far fa-copyright"></i>
          </span>
          Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}