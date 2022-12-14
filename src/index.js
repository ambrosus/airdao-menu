import React, { useEffect, useState } from 'react';
import { LogoNew } from './assets/LogoNew';
import { Logo } from './assets/Logo';
import { Menu } from './assets/Menu';
import { Close } from './assets/Close';
import { Question } from './assets/Question';
import { LearnMoreBtn } from './assets/LearnMoreBtn';
import { Metamask } from './assets/Metamask';
import { Copy } from './assets/Copy';
import { Logout } from './assets/Logout';
import { Wallet } from './assets/Wallet';
import { ArrowUp } from './assets/ArrowUp';
import { ArrowDown } from './assets/ArrowDown';
import './index.scss';
import { Check } from './assets/Check';
import { usePrismicPageData } from './usePrismicPageData';
import { PrismicProvider } from '@prismicio/react';
import { client } from './prismic';
import { PrismicText } from '@prismicio/react';

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

const Submenu = ({ submenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='side-menu__listmenu'>
      <button
        className='side-menu__listmenu-wrapper '
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className='side-menu__listmenu-text'>
          <PrismicText field={submenu?.primary.heading} />
        </div>
        <div className='side-menu__listmenu-btn'>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </button>

      <ul
        className='side-menu__list side-menu__list_small'
        style={{ display: isOpen ? '' : 'none' }}
      >
        {submenu?.items.map(({ icon, name, link }) => (
          <li key={name}>
            <a
              href={link.url}
              target={link.target}
              rel={(name === 'Home' || name === 'Team') ? '' : 'nofollow'}
            >
              <img src={icon.url} alt={icon.alt} />
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Header = ({ address, login, logout, initHidden, customLogo }) => {
  const [isOpen, setIsOpen] = useState(
    initHidden ? false : window.innerWidth > 1050
  );

  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 430) {
        setIsOpen(initHidden ? false : window.innerWidth > 1050);
        setOverlayVisible(false);
      }
    };
    window.addEventListener('resize', handleResize, true);
  }, []);

  const handleOpen = () => {
    setOverlayVisible(!isOpen && window.innerWidth < 1050);
    setIsOpen((state) => !state);
  };

  const { href } = window.location;
  let currentApp = '';

  if (href.includes('staking')) {
    currentApp = 'staking';
  } else if (href.includes('explorer')) {
    currentApp = 'explorer';
  } else if (href.includes('firepot')) {
    currentApp = 'firepot';
  } else if (href.includes('bridge')) {
    currentApp = 'bridge';
  }

  const data = usePrismicPageData('menu');
  console.log(data);
  return (
    <>
      {overlayVisible && <div onClick={handleOpen} className='menu-overlay' />}
      <div className='side-menu-container'>
        <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
          <div className='side-menu__mobile-wrapper'>
            <div className='side-menu__logo'>
              <a href='https://airdao.io/'>
                {customLogo || (
                  <>
                     <Logo />
                  </>
                )}
              </a>
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
                  <>
                    <button
                      type='button'
                      className='side-menu__connect-wallet'
                      onClick={login}
                    >
                      <Wallet />
                      Connect wallet
                    </button>

                    <div className='side-menu__connect-text'>
                      Your AirDAO experience will be limited without connecting
                    </div>
                  </>
                )}
                <div className='side-menu__nav-wrapper'>
                  <div className='side-menu__content-list'>
                    <ul className='side-menu__list'>
                      {data?.links.map(
                        ({ name, link, guide_link, isdisabled }) =>
                          !isdisabled ? (
                            <li key={name}>
                              <a
                                className={`side-menu__list-link${
                                  currentApp === link.type
                                    ? 'side-menu__list-link_active'
                                    : ''
                                }`}
                                href={link.url}
                              >
                                {name}
                                {guide_link.url && currentApp === link.type && (
                                  <a
                                    href={guide_link.url}
                                    target={guide_link.target}
                                  >
                                    <LearnMoreBtn />
                                  </a>
                                )}
                              </a>
                            </li>
                          ) : (
                            <li key={name} className='side-menu__list-vote'>
                              <span>{name}</span>
                              <span>Coming Soon</span>
                            </li>
                          )
                      )}
                    </ul>
                  </div>

                  {data?.body.map((submenu) => (
                    <Submenu key={submenu?.id} submenu={submenu} />
                  ))}

                  <div>
                    <ul className=' side-menu__list_socials filter-green'>
                      {data?.socials.map(({ icon, link }) => (
                        <li key={link.url}>
                          <a
                            rel="nofollow"
                            href={link.url}
                            target={link.target}
                            className='side-menu__list_socials-item'
                          >
                            <img
                              src={icon.url}
                              alt={icon.alt}
                              className='side-menu__list_socials-icon'
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default (props) => (
  <PrismicProvider client={client}>
    {' '}
    <Header {...props} />{' '}
  </PrismicProvider>
);
