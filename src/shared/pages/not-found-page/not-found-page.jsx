import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routes";
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 24px 80px 24px',
};
const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
  width: '100%',
};

const titleStyle = {
  fontSize: '5rem',
  color: '#000',
  fontWeight: 600,
  letterSpacing: '2px',
  margin: 0,
};

const descStyle = {
  color: '#000',
  fontSize: '1.25rem',
  margin: 0,
};

const buttonStyle = {
  padding: '14px 32px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#DB4444',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 500,
  marginTop: '24px',
};

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={containerStyle}>
      {/* Main Content */}
      <div style={mainStyle}>
        <h1 style={titleStyle}>404 Not Found</h1>
        <h2 style={descStyle}>Your visited page not found. You may go home page.</h2>
        <button style={buttonStyle} onClick={() => navigate(appRoutes.Home)}>
          Back to home page
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
