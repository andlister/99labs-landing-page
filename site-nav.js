(() => {
  const NAV_SECTIONS = [
    {
      label: 'Landscape',
      pages: [
        { label: 'Vendors', path: 'p/landscape/vendors.html' },
        { label: 'Graph', path: 'p/landscape/graph.html' }
      ]
    },
    {
      label: 'MSP',
      pages: [
        { label: 'Pricing', path: 'p/msp/pricing.html' },
        { label: 'Tiers', path: 'p/msp/tiers.html' },
        { label: 'Stack', path: 'p/msp/stack.html' }
      ]
    }
  ];

  const STYLE_TAG_ID = 'site-nav-styles';
  const MENU_ID = 'site-nav-menu';
  const THEME_STORAGE_KEY = 'theme-preference';
  const HOVER_MEDIA = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(hover: hover) and (pointer: fine)')
    : null;

  let navElement = null;

  const injectStyles = () => {
    if (document.getElementById(STYLE_TAG_ID)) return;
    const styles = document.createElement('style');
    styles.id = STYLE_TAG_ID;
    styles.textContent = `
      .site-nav {
        position: relative;
        z-index: 100;
        width: 100%;
        background: var(--panel, rgba(255, 255, 255, 0.96));
        color: var(--ink, #0b1016);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--line, rgba(15, 23, 42, 0.12));
      }
      .site-nav__inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 12px 24px;
        display: flex;
        align-items: center;
        gap: 24px;
      }
      .site-nav__brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        font-weight: 700;
        font-size: 16px;
        color: inherit;
      }
      .site-nav__brand img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
      }
      .site-nav__toggle {
        margin-left: auto;
        background: transparent;
        border: 1px solid var(--line, rgba(15, 23, 42, 0.18));
        border-radius: 999px;
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 600;
        color: inherit;
        cursor: pointer;
        display: none;
      }
      .site-nav__toggle:focus-visible,
      .site-nav__item-toggle:focus-visible,
      .site-nav__submenu a:focus-visible,
      .site-nav__submenu button:focus-visible {
        outline: 2px solid var(--c1, #1e88e5);
        outline-offset: 2px;
      }
      .site-nav__menu {
        margin: 0 0 0 auto;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 28px;
      }
      .site-nav__item {
        position: relative;
        display: flex;
        align-items: center;
      }
      .site-nav__item--active > .site-nav__item-toggle {
        color: var(--c1, #1e88e5);
        font-weight: 700;
      }
      .site-nav__item-toggle {
        background: transparent;
        border: none;
        font: inherit;
        color: inherit;
        font-weight: 600;
        cursor: pointer;
        padding: 6px 0;
        display: inline-flex;
        align-items: center;
      }
      .site-nav__submenu {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        min-width: 220px;
        margin: 0;
        padding: 12px 0;
        list-style: none;
        background: var(--panel, #ffffff);
        border-radius: 12px;
        box-shadow: 0 18px 32px rgba(15, 23, 42, 0.14);
        border: 1px solid var(--line, rgba(15, 23, 42, 0.06));
        transform: translateX(0);
        transition: transform 0.2s ease;
      }
      .site-nav__submenu::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -12px;
        right: -12px;
        height: 20px;
        background: transparent;
      }
      .site-nav__item--open > .site-nav__submenu {
        display: block;
      }
      .site-nav__submenu li {
        width: 100%;
      }
      .site-nav__submenu a,
      .site-nav__submenu button {
        display: block;
        width: 100%;
        padding: 10px 18px;
        color: var(--ink, #0b1016);
        text-decoration: none;
        font-size: 14px;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        font: inherit;
      }
      .site-nav__submenu a:hover,
      .site-nav__submenu button:hover {
        background: rgba(30, 136, 229, 0.12);
        background: color-mix(in srgb, var(--c1, #1e88e5) 18%, transparent);
      }
      .site-nav__submenu a[aria-current="page"] {
        font-weight: 700;
        color: var(--c1, #1e88e5);
      }
      .site-nav__theme-toggle {
        font-weight: 600;
        color: inherit;
      }
      @media (hover: hover) and (pointer: fine) {
        .site-nav__item:hover > .site-nav__submenu {
          display: block;
        }
      }
      @media (max-width: 900px) {
        .site-nav__inner {
          flex-wrap: wrap;
          padding: 12px 20px;
        }
        .site-nav__toggle {
          display: inline-flex;
        }
        .site-nav__menu {
          flex-direction: column;
          width: 100%;
          margin: 8px 0 0;
          align-items: stretch;
          gap: 12px;
          display: none;
        }
        .site-nav--menu-open .site-nav__menu {
          display: flex;
        }
        .site-nav__item {
          flex-direction: column;
          align-items: stretch;
        }
        .site-nav__item-toggle {
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid var(--line, rgba(15, 23, 42, 0.12));
          background: rgba(248, 250, 252, 0.8);
          background: color-mix(in srgb, var(--panel, #ffffff) 80%, transparent);
        }
        .site-nav__submenu {
          position: static;
          display: none;
          top: auto;
          left: auto;
          min-width: unset;
          margin-top: 8px;
          padding: 0;
          box-shadow: none;
          border: none;
          background: transparent;
          transform: none;
        }
        .site-nav__submenu::before {
          display: none;
        }
        .site-nav__item--open > .site-nav__submenu {
          display: block;
        }
        .site-nav__submenu a,
        .site-nav__submenu button {
          border-radius: 8px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.7);
          background: color-mix(in srgb, var(--panel, #ffffff) 70%, transparent);
          margin-bottom: 6px;
          border: 1px solid var(--line, rgba(15, 23, 42, 0.08));
        }
        .site-nav__submenu a:last-child,
        .site-nav__submenu button:last-child {
          margin-bottom: 0;
        }
      }
    `;
    document.head.appendChild(styles);
  };

  const normalizePath = (path) => {
    if (!path) return 'index.html';
    let normalized = path;
    if (normalized.startsWith('/')) normalized = normalized.slice(1);
    if (normalized === '') return 'index.html';
    if (normalized.endsWith('/')) {
      // Directory path, append index.html
      return normalized + 'index.html';
    }
    // If path doesn't have an extension, assume it's a directory
    if (!normalized.includes('.')) {
      return normalized + '/index.html';
    }
    return normalized;
  };

  const splitParts = (path) => path.split('/').filter(Boolean);

  const relativePath = (from, to) => {
    const fromParts = splitParts(from);
    if (fromParts.length) fromParts.pop();
    const toParts = splitParts(to);
    let i = 0;
    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
      i += 1;
    }
    const upSegments = new Array(fromParts.length - i).fill('..');
    const downSegments = toParts.slice(i);
    const segments = [...upSegments, ...downSegments];
    return segments.join('/') || '.';
  };

  const getActiveTheme = () =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark';

  const fallbackToggleTheme = () => {
    const isLight = document.documentElement.classList.toggle('light');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
    } catch (error) {
      /* noop */
    }
    return isLight ? 'light' : 'dark';
  };

  const updateThemeToggleLabel = (button) => {
    if (!button) return;
    button.textContent = getActiveTheme() === 'light'
      ? 'Switch to Dark Mode'
      : 'Switch to Light Mode';
  };

  const ensureSubmenuInView = (submenu) => {
    if (!submenu) return;
    submenu.style.transform = '';
    requestAnimationFrame(() => {
      const rect = submenu.getBoundingClientRect();
      const padding = 16;
      let shift = 0;
      if (rect.right > window.innerWidth - padding) {
        shift = window.innerWidth - padding - rect.right;
      }
      if (rect.left + shift < padding) {
        shift += padding - (rect.left + shift);
      }
      if (Math.abs(shift) > 0.5) {
        submenu.style.transform = `translateX(${shift}px)`;
      }
    });
  };

  const buildNav = () => {
    if (!document.body) return;

    const currentPath = normalizePath(window.location.pathname);

    // Don't show nav on root index.html
    if (currentPath === 'index.html') return;
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    navElement = nav;

    const brandLink = relativePath(currentPath, 'index.html');
    const logoSrc = relativePath(currentPath, 'logo.png');
    const themeMenuId = `${MENU_ID}-theme`;

    const sectionsMarkup = NAV_SECTIONS.map((section, sectionIndex) => {
      const submenuId = `${MENU_ID}-section-${sectionIndex}`;
      const isActiveSection = section.pages.some(
        page => normalizePath(`/${page.path}`) === currentPath
      );
      const items = section.pages.map(page => {
        const href = relativePath(currentPath, page.path);
        const targetPath = normalizePath(`/${page.path}`);
        const isCurrent = targetPath === currentPath;
        const ariaCurrent = isCurrent ? ' aria-current="page"' : '';
        return `<li><a href="${href}"${ariaCurrent}>${page.label}</a></li>`;
      }).join('');
      return `
        <li class="site-nav__item${isActiveSection ? ' site-nav__item--active' : ''}">
          <button class="site-nav__item-toggle" type="button" aria-expanded="false" aria-controls="${submenuId}">
            ${section.label}
          </button>
          <ul class="site-nav__submenu" id="${submenuId}">
            ${items}
          </ul>
        </li>
      `;
    }).join('');

    nav.innerHTML = `
      <div class="site-nav__inner">
        <a class="site-nav__brand" href="${brandLink}">
          <img src="${logoSrc}" alt="99Labs logo">
          <span>99Labs</span>
        </a>
        <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="${MENU_ID}">
          Menu
        </button>
        <ul class="site-nav__menu" id="${MENU_ID}">
          ${sectionsMarkup}
          <li class="site-nav__item site-nav__item--theme">
            <button class="site-nav__item-toggle" type="button" aria-expanded="false" aria-controls="${themeMenuId}">
              Theme
            </button>
            <ul class="site-nav__submenu" id="${themeMenuId}">
              <li><button type="button" class="site-nav__theme-toggle">Switch theme</button></li>
            </ul>
          </li>
        </ul>
      </div>
    `;

    const firstChild = document.body.firstElementChild;
    if (firstChild) {
      document.body.insertBefore(nav, firstChild);
    } else {
      document.body.appendChild(nav);
    }
    document.body.style.paddingTop = '';

    const menuToggle = nav.querySelector('.site-nav__toggle');
    const menu = nav.querySelector('.site-nav__menu');
    const themeToggleButton = nav.querySelector('.site-nav__theme-toggle');
    let legacyThemeToggle = document.getElementById('themeToggle');

    const hideLegacyToggle = (toggleEl) => {
      if (!toggleEl) return;
      toggleEl.hidden = true;
      toggleEl.setAttribute('aria-hidden', 'true');
      toggleEl.tabIndex = -1;
      toggleEl.style.position = 'absolute';
      toggleEl.style.width = '1px';
      toggleEl.style.height = '1px';
      toggleEl.style.padding = '0';
      toggleEl.style.margin = '0';
      toggleEl.style.border = '0';
      toggleEl.style.clip = 'rect(0 0 0 0)';
      toggleEl.style.clipPath = 'inset(50%)';
      toggleEl.style.overflow = 'hidden';
    };

    if (legacyThemeToggle) {
      hideLegacyToggle(legacyThemeToggle);
    }

    const ensureLegacyToggle = () => {
      if (legacyThemeToggle && document.body.contains(legacyThemeToggle)) {
        return legacyThemeToggle;
      }
      const freshToggle = document.getElementById('themeToggle');
      if (freshToggle) {
        legacyThemeToggle = freshToggle;
        hideLegacyToggle(legacyThemeToggle);
        return legacyThemeToggle;
      }
      legacyThemeToggle = null;
      return null;
    };

    const closeAllSections = () => {
      nav.querySelectorAll('.site-nav__item').forEach(item => {
        item.classList.remove('site-nav__item--open');
        const btn = item.querySelector('.site-nav__item-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        const submenu = item.querySelector('.site-nav__submenu');
        if (submenu) submenu.style.transform = '';
      });
    };

    const closeMenu = () => {
      nav.classList.remove('site-nav--menu-open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    };

    if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('site-nav--menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) {
          closeAllSections();
        }
      });
    }

    nav.querySelectorAll('.site-nav__item-toggle').forEach(toggle => {
      toggle.addEventListener('click', (event) => {
        const item = event.currentTarget.closest('.site-nav__item');
        const submenu = item.querySelector('.site-nav__submenu');
        const isOpen = item.classList.toggle('site-nav__item--open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          nav.querySelectorAll('.site-nav__item').forEach(other => {
            if (other !== item) {
              other.classList.remove('site-nav__item--open');
              const otherToggle = other.querySelector('.site-nav__item-toggle');
              if (otherToggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
              }
              const otherMenu = other.querySelector('.site-nav__submenu');
              if (otherMenu) {
                otherMenu.style.transform = '';
              }
            }
          });
          ensureSubmenuInView(submenu);
        } else if (submenu) {
          submenu.style.transform = '';
        }
      });
    });

    nav.querySelectorAll('.site-nav__item').forEach(item => {
      const submenu = item.querySelector('.site-nav__submenu');
      if (!submenu) return;
      item.addEventListener('mouseenter', () => {
        if (HOVER_MEDIA && HOVER_MEDIA.matches) {
          ensureSubmenuInView(submenu);
        }
      });
    });

    nav.querySelectorAll('.site-nav__submenu a').forEach(link => {
      link.addEventListener('click', () => {
        closeAllSections();
        closeMenu();
      });
    });

    if (themeToggleButton) {
      updateThemeToggleLabel(themeToggleButton);
      themeToggleButton.addEventListener('click', () => {
        const legacyToggle = ensureLegacyToggle();
        if (legacyToggle) {
          legacyToggle.click();
        } else {
          fallbackToggleTheme();
        }
        updateThemeToggleLabel(themeToggleButton);
        closeAllSections();
        closeMenu();
      });
    }

    window.addEventListener('resize', () => {
      nav.querySelectorAll('.site-nav__item--open .site-nav__submenu').forEach(ensureSubmenuInView);
    });
  };

  const initializeTheme = () => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light') {
        document.documentElement.classList.add('light');
      } else if (stored === 'dark') {
        document.documentElement.classList.remove('light');
      }
    } catch (error) {
      /* noop */
    }
  };

  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    if (event.newValue === 'light') {
      document.documentElement.classList.add('light');
    } else if (event.newValue === 'dark') {
      document.documentElement.classList.remove('light');
    }
    if (navElement) {
      const themeButton = navElement.querySelector('.site-nav__theme-toggle');
      updateThemeToggleLabel(themeButton);
    }
  });

  // Initialize theme from localStorage before DOM is ready
  initializeTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      buildNav();
    });
  } else {
    injectStyles();
    buildNav();
  }
})();
