import React, { useEffect, useRef, useState } from 'react';
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
import { Wallet } from './assets/Wallet';
import { ArrowUp } from './assets/ArrowUp';
import { ArrowDown } from './assets/ArrowDown';
import { Governance } from './assets/Governance';
import { Help } from './assets/Help';
import { Feedback } from './assets/Feedback';
import './index.scss';
import {Check} from './assets/Check';

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ address = '', logout }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
    return null;
  };

  return (
    <div className='address-block'>
      <div className='address-block__metamask-icon'>
        <Metamask />
      </div>
      <span>{`${address.slice(0, 4)}...${address.slice(
        address.length - 4,
        address.length
      )}`}</span>
      <button onClick={logout} type='button' style={{ marginLeft: 'auto' }}>
        <Logout />
      </button>
      <button
        onClick={copyToClipboard}
        type='button'
        className='address-block__copy'
      >
        {isCopied ? <Check /> : <Copy />}
      </button>
    </div>
  );
};

const Header = ({ address, login, logout, initHidden, customLogo }) => {
  const [isResourcesShow, setIsResourcesShow] = useState(true);
  const [isAboutShow, setIsAboutShow] = useState(true);

  const [isOpen, setIsOpen] = useState(
    initHidden ? false : window.innerWidth > 1050
  );

  const [overlayVisible, setOverlayVisible] = useState(false);

  // const prevOverflow = useRef(document.querySelector('html').style.overflowY);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(initHidden ? false : window.innerWidth > 1050);
      setOverlayVisible(false)
    };
    window.addEventListener('resize', handleResize, true);
  }, []);

  const handleOpen = () => {
    setOverlayVisible(!isOpen && window.innerWidth < 1050);
    setIsOpen((state) => !state);
  };

  // useEffect(() => {
  //   const html = document.querySelector('html');
  //   isOpen
  //     ? (html.style.overflowY = 'hidden')
  //     : (html.style.overflowY = prevOverflow.current);
  // }, [isOpen]);

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
      {overlayVisible && <div onClick={handleOpen} className='menu-overlay' />}
      <div className='side-menu-container'>
        <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
          <div className='side-menu__mobile-wrapper'>
            <div className='side-menu__logo'>
              <a href='https://airdao.io/'>{customLogo || <Logo />}</a>
            </div>
            <button
              type='button'
              onClick={handleOpen}
              className='side-menu__hamburger'
            >
              {isOpen ? <Close /> : <Menu />}
            </button>
          </div>
          {isOpen && (
            <>
              <div className='side-menu__content'>
                {address ? (
                  <AddressBlock address={address} logout={logout} />
                ) : (
                  <button
                    type='button'
                    className='side-menu__connect-wallet'
                    onClick={login}
                  >
                    <Wallet />
                    Connect wallet
                  </button>
                )}
                <div className='side-menu__content-list'>
                  <ul className='side-menu__list'>
                    <li>
                      <a
                        className='side-menu__list-link'
                        style={
                          currentApp === 'swap' ? { color: '#457EFF' } : {}
                        }
                        href='/firepot/swap'
                      >
                        FirepotSwap
                        <a href="https://medium.com/@firepotfinance/firepot-guide-how-to-use-firepotswap-for-the-first-time-c6a95f350e1f" target="_blank">
                          <Question />
                        </a>
                      </a>
                    </li>
                    <li>
                      <a
                        className='side-menu__list-link'
                        href='/staking'
                        style={
                          currentApp === 'staking' ? { color: '#457EFF' } : {}
                        }
                      >
                        Staking
                        {/*<Question />*/}
                      </a>
                    </li>
                    <li>
                      <a
                        className='side-menu__list-link'
                        href='/bridge'
                        style={
                          currentApp === 'bridge' ? { color: '#457EFF' } : {}
                        }
                      >
                        Bridge
                        {/*<a href="https://blog.ambrosus.io/ambrosus-guide-connecting-and-transacting-via-the-amb-bridge-89f27a60b8d2" target="_blank">*/}
                        {/*  <Question />*/}
                        {/*</a>*/}
                      </a>
                    </li>
                    <li>
                      <a
                        className='side-menu__list-link'
                        href='/explorer'
                        style={
                          currentApp === 'explorer' ? { color: '#457EFF' } : {}
                        }
                      >
                        Network Explorer
                      </a>
                    </li>
                    <li className='side-menu__list-vote'>
                      <span>DAO Tools</span>
                      <span>Coming Soon</span>
                    </li>
                    <li className='side-menu__list-vote'>
                      <span>Stablecoin</span>
                      <span>Coming Soon</span>
                    </li>
                  </ul>
                </div>
                <div className='side-menu__listmenu'>
                  <button
                    className='side-menu__listmenu-wrapper '
                    onClick={() => setIsResourcesShow((prev) => !prev)}
                  >
                    <div className='side-menu__listmenu-text'>Resources</div>
                    <div className='side-menu__listmenu-btn'>
                      {isResourcesShow ? <ArrowUp /> : <ArrowDown />}
                    </div>
                  </button>

                  <ul
                    className='side-menu__list side-menu__list_small'
                    style={{ display: isResourcesShow ? '' : 'none' }}
                  >
                    <li>
                      <Docs />
                      <a href='https://github.com/ambrosus/' target='_blank'>
                        Github
                      </a>
                    </li>
                    <li>
                      <Feedback />
                      <a
                        href='https://docs.google.com/forms/d/e/1FAIpQLSfiCP9jjnhc5LsNiSribluQWoqEI7cVOdgomTVyNas8-yXezw/formrestricted'
                        target='_blank'
                      >
                        Feedback & Bug Reports
                      </a>
                    </li>
                    <li>
                      <Governance />
                      <a href='https://community.airdao.io/' target='_blank'>
                        Governance
                      </a>
                    </li>
                    <li>
                      <Help />
                      <a
                        href='https://air-dao.notion.site/AirDAO-Help-82424c667aee4dac96ac73598423c7f8'
                        target='_blank'
                      >
                        Help
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='side-menu__listmenu'>
                  <button
                    className='side-menu__listmenu-wrapper '
                    onClick={() => setIsAboutShow((prev) => !prev)}
                  >
                    <div className='side-menu__listmenu-text'>About</div>
                    <div className='side-menu__listmenu-btn'>
                      {isAboutShow ? <ArrowUp /> : <ArrowDown />}
                    </div>
                  </button>
                  <ul
                    className='side-menu__list side-menu__list_small'
                    style={{ display: isAboutShow ? '' : 'none' }}
                  >
                    <li className='side-menu__list-item'>
                      <House />
                      <a
                        href='/'
                        style={
                          currentApp === '' ? { color: '#457EFF' } : {}
                        }
                      >
                        AirDAO Home
                      </a>
                    </li>

                    <li>
                      <Smile />
                      <a
                        href='https://air-dao.notion.site/AirDAO-Academy-2c253d49da1e4717a5e5bbab696afd45'
                        target='_blank'
                      >
                        AirDAO Academy
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className=' side-menu__list_socials'>
                    <li>
                      <a
                        href='https://twitter.com/airdao_io'
                        target='_blank'
                        className='side-menu__list_socials-item'
                      >
                        <Twitter className='side-menu__list_socials-icon' />
                      </a>
                    </li>
                    <li>
                      <a href='https://t.me/airDAO_official' className='side-menu__list_socials-item'>
                        <Telegram className='side-menu__list_socials-icon' />
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.reddit.com/r/AirDAO/'
                        target='_blank'
                        className='side-menu__list_socials-item side-menu__list_socials-item--reddit'
                      >
                        <Reddit className='side-menu__list_socials-icon' />
                      </a>
                    </li>
                    <li>
                      <a href='https://blog.airdao.io/' className='side-menu__list_socials-item side-menu__list_socials-item--last'>
                        <Circles className='side-menu__list_socials-icon--last' />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
