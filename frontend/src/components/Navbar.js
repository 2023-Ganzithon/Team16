import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [activeLink, setActiveLink] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태
    const [userName, setUserName] = useState(''); // 사용자 이름
    
    const navigate = useNavigate(); // useHistory 훅 사용

    const token = localStorage.getItem('token');
    const handleClick = () => setClick(!click) ;
    const closeMobileMenu = () => setClick(false);

    console.log('insertedToken', token)

    // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정
    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    const switchMyPage = () => {
      navigate("/mypage");
    }

    const getUserNickname = async () => {
      try {
          const response = await axios.get(`https://f8ee-1-224-68-15.ngrok-free.app/api/member`,{
              headers: {
                  'Content-Type': 'application/json',
                  "X-AUTH-TOKEN": token
              },
              withCredentials: true,
              'ngrok-skip-browser-warning': true,
          });
          console.log("성공");
          console.log(response.data);
          setUserName(response.data.nickname);
      } catch (error) {
          console.log('유저 정보 가져오기 실패');
          console.error(error);
      }
  };

    // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 함
    useEffect(() => {
        showButton();

        // 로그인 상태를 관찰하고 사용자 이름을 가져옴
        if (token) {
          setLoggedIn(true);

          // try {
          //   const headers = {
          //     'Content-Type': 'application/json',
          //     // 'Access-Control-Allow-Credentials': true,
          //     // 'ngrok-skip-browser-warning': true,
          //     'X-AUTH-TOKEN': insertedToken
          //   }
          
          //   const response = axios.get('https://983d-39-125-96-44.ngrok-free.app/api/members/list', '', headers);
          
          //   if (response.status !== 200) {
          //     console.error('회원 정보 반환 실패', response.status);
          //   } else {
          //     console.log('회원 정보 반환 성공', response.data);
          //   }
          // } catch (error) {
          //   console.error('회원 정보 반환 실패:', error);
          // }


          //회원 정보 반환 테스트
          // getUser();

          //닉네임 정보 반환
          getUserNickname();
          
        } else {
          setLoggedIn(false);
        }
    }, []);

    // 링크 클릭 시 activeLink 업데이트
    const handleLinkClick = (link) => {
        setActiveLink(link);
        closeMobileMenu();
    };

    window.addEventListener('resize', showButton);

    // 로그인 버튼 클릭 시 이벤트 핸들러
    const handleLoginButtonClick = () => {
      if (loggedIn) {
        // 로그아웃 처리
        localStorage.removeItem('token');
        setLoggedIn(false);
      } else {
        // 로그인 처리
        navigate("/sign-up");
      }
    };


    return (
        <>
        <div className='main-font'>
          <nav className="navbar">
            <div className="navbar-container">
              {/* 모바일버전에서 클릭하면 메뉴 보이도록 설정하는 것도 한다. (close Mobile Menu)는 다시 버튼 누르면 없어지고 생기고 하도록 한다. */}
              <Link to="/" className={`navbar-logo ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleLinkClick('home')}>
                <img
                  className="mr-1 h-6 sm:h-7"
                  alt='logo'
                  src="/image/logo.png"
                />
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                  <Link
                    to="/community-list"
                    className={`nav-links ${activeLink === 'community' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('community')}
                  >
                    커뮤니티
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/challenge"
                    className={`nav-links ${activeLink === 'challenge' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('challenge')}
                  >
                    도전과제
                  </Link>
                </li>
                <li className="nav-item">
                  <button className={`nav-links-mobile ${activeLink === 'sign-up' ? 'active' : ''}`} onClick={handleLoginButtonClick}>
                    {loggedIn ? '로그아웃' : '로그인'}
                  </button>
                </li>
              </ul>
              {loggedIn && (
                <div className="nav-username" onClick={switchMyPage} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        className="mr-2 h-6 sm:h-7"
                        alt='profile'
                        src="/image/profile_1.png"
                    />
                    {/* <div style={{width: '70px'}}> */}
                    <div className='flex w-full'>
                    {userName}
                    </div>
                    {/* {userName} */}
                    {/* </div> */}
                    <span className='nav-welcome'>님</span>&nbsp;&nbsp;
                </div>
              )}
              {button && (
                <button className="nav-login ml-5" onClick={handleLoginButtonClick}>
                  {loggedIn ? '로그아웃' : '로그인'}
                </button>
              )}
            </div>
          </nav>
        </div>
        </>
    );
}

export default Navbar;