// import { useNavigate } from 'react-router';
// import { appRoutes } from '../../../routes';
import { AppLogo } from '../../components/app-logo';
import { SearchInput } from '../../../features/search/components/search-input';
// import { useGetMeQuery } from '../../../features/auth/services/queries';
import './style.css';
import { PrimarySearchAppBar } from '../navbar/PrimarySearchAppBar'
import { LanguageSelector } from '../../components/langauge';

export function Navbar() {
  // const navigate = useNavigate();
  // const { data: response } = useGetMeQuery()
  // const user = response?.[0];

  return (
    <header id="top-nav">
      <nav style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '0.5rem', fontWeight: 'bold', justifyContent: 'center', display: 'flex' }}>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        ShopNow
        <LanguageSelector />
      </nav>
      <nav style={{ backgroundColor: '#fff'}}>
    <PrimarySearchAppBar/>
       {/* auth */}
        {
          //  <p style={{ fontSize: '1.5rem' }}>{user.name}</p>
          //   :
          // <div className='auth-actions'>
          // <button className="login-button">Login</button>
          // {/* <button className="register-button" onClick={() => navigate(appRoutes.auth.signUp)}>Sign up</button> */}
          // </div>
        }
      </nav>
    </header>
  );
}