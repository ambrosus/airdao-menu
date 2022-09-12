import React, { useEffect, useState } from 'react';
import { Logo } from './assets/Logo';
import { Twitter } from './assets/Twitter';
import { Telegram } from './assets/Telegram';
import { Reddit } from './assets/Reddit';
import { Circles } from './assets/Circles';
import { Menu } from './assets/Menu';
import { Close } from './assets/Close';
import { Question } from './assets/Question';
import { Metamask } from './assets/Metamask';
import { Copy } from './assets/Copy';
import { Logout } from './assets/Logout';
import { House } from './assets/House';
import { Docs } from './assets/Docs';
import { Message } from './assets/Message';
import { Book } from './assets/Book';
import { Smile } from './assets/Smile';
import "./index.scss";

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ address = '', logout }) => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
    return null;
  };

  return (
    <div className="address-block">
      <div className="address-block__metamask-icon">
        <Metamask />
      </div>
      <span>{`${address.slice(0, 4)}...${address.slice(
        address.length - 4,
        address.length,
      )}`}</span>
      <button onClick={logout} type="button" style={{ marginLeft: 'auto' }}>
        <Logout />
      </button>
      <button
        onClick={copyToClipboard}
        type="button"
        className="address-block__copy"
      >
        <Copy />
      </button>
    </div>
  );
};

const Header = ({ address, login, logout, initHidden, customLogo }) => {
  const [isOpen, setIsOpen] = useState(initHidden ? false : window.innerWidth > 1050);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(initHidden ? false : window.innerWidth > 1050);
    };
    window.addEventListener('resize', handleResize, true);
  }, []);

  const handleOpen = () => {
    setOverlayVisible(!isOpen && window.innerWidth < 1050);
    setIsOpen((state) => !state);
  }

  const { pathname } = window.location;
  let currentApp = '';

  if (pathname.includes('staking')) {
    currentApp = 'staking';
  } else if (pathname.includes('explorer')) {
    currentApp = 'explorer';
  } else if (pathname.includes('firepot')) {
    currentApp = 'swap';
  } else if (pathname.includes('bridge')) {
    currentApp = 'bridge';
  }

  return (
    <>
      {overlayVisible && <div onClick={handleOpen} className="menu-overlay" />}
      <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
        <div className="side-menu__mobile-wrapper">
          <div className="side-menu__logo">
            <a href="https://airdao.io/">
              {customLogo || <Logo />}
            </a>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="side-menu__hamburger"
          >
            {isOpen ? <Close /> : <Menu/>}
          </button>
        </div>
        {isOpen && (
          <>
            <div className="side-menu__content">
              {address ? (
                <AddressBlock address={address} logout={logout} />
              ) : (
                <button
                  type="button"
                  className="side-menu__connect-wallet"
                  onClick={login}
                >
                  Connect wallet
                </button>
              )}
              <ul className="side-menu__list">
                <li>
                  <a
                    className="side-menu__list-link"
                    style={currentApp === 'swap' ? { color: '#457EFF' } : {}}
                    href="/firepot/swap"
                  >
                    FirepotSwap
                    <Question />
                  </a>
                </li>
                <li>
                  <a
                    className="side-menu__list-link"
                    href="/staking"
                    style={currentApp === 'staking' ? { color: '#457EFF' } : {}}
                  >

                    Staking
                    <Question />
                  </a>
                </li>
                <li>
                  <a
                    className="side-menu__list-link"
                    href="/bridge"
                    style={currentApp === 'bridge' ? { color: '#457EFF' } : {}}
                  >
                    Bridge
                    <Question />
                  </a>
                </li>
                <li>
                  <a
                    className="side-menu__list-link"
                    href="/explorer"
                    style={currentApp === 'explorer' ? { color: '#457EFF' } : {}}
                  >
                    Network Explorer
                    <Question />
                  </a>
                </li>
                <li className="side-menu__list-vote">
                  <span>DAO Tools</span>
                  <span>Coming Soon</span>
                </li>
                <li className="side-menu__list-vote">
                  <span>Stablecoin</span>
                  <span>Coming Soon</span>
                </li>
              </ul>
              <ul className="side-menu__list side-menu__list_small">
                <li>
                  <House />
                  <a href="/">AIRDAO Main</a>
                </li>
                <li>
                  <Docs />
                  <a href="https://github.com/ambrosus/" target="_blank">Docs</a>
                </li>
                <li>
                  <Message />
                  <a href="mailto:support@airdao.io ">Feedback</a>
                </li>
                <li>
                  <Book />
                  <a href="https://drive.google.com/drive/folders/1oaihzknRMGLKlmTe-7HU5Vx6I_-sQay1?usp=sharing" target="_blank">Brand materials</a>
                </li>
                <li>
                  <Smile />
                  <a href="mailto:support@airdao.io ">Team</a>
                </li>
              </ul>
              <ul className="side-menu__list side-menu__list_socials">
                <li>
                  <a href="https://twitter.com/airdao_io" target="_blank">
                    <Twitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Telegram />
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/AirDAO/" target="_blank">
                    <Reddit />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Circles />
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
