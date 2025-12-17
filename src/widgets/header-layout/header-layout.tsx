import { FC } from 'react';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';

import ChevronDownIcon from '../../shared/assets/icons/chevron-down';

import styles from './header-layout.module.css';
import { THeaderLayoutAuthProps, THeaderLayoutFullProps, THeaderLayoutProps } from './type';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6L18 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SparkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 1.5C12.1 6.2 15.8 9.9 20.5 11C15.8 12.1 12.1 15.8 11 20.5C9.9 15.8 6.2 12.1 1.5 11C6.2 9.9 9.9 6.2 11 1.5Z"
      fill="currentColor"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width="24" height="24" fill="none">
    <path
      fill="#253017"
      d="M12.425 22c-.158 0-.316 0-.474-.01-5.209-.232-9.562-4.427-9.925-9.543C1.71 8.057 4.25 3.955 8.342 2.234c1.163-.483 1.777-.111 2.037.159.26.26.623.865.14 1.971a7.623 7.623 0 0 0-.633 3.116c.019 4.121 3.442 7.618 7.618 7.786.605.028 1.2-.019 1.777-.121 1.227-.223 1.739.27 1.934.586.196.316.419.995-.325 2C18.918 20.428 15.783 22 12.425 22Zm-9.013-9.655c.317 4.428 4.093 8.055 8.595 8.25a9.052 9.052 0 0 0 7.748-3.683 1.86 1.86 0 0 0 .233-.41 1.464 1.464 0 0 0-.465.029 9.737 9.737 0 0 1-2.084.14c-4.911-.196-8.93-4.317-8.957-9.172 0-1.284.25-2.52.762-3.683.093-.205.112-.344.121-.419-.083 0-.232.019-.474.121-3.544 1.488-5.739 5.041-5.479 8.827Z"
    />
  </svg>
);

// Временные заглушки для отсутствующих UI-компонентов (LogoUI / IconButtonUI / UserAuthUI / UserUnAuthUI)
const LogoStub: FC = () => (
  <div className={styles.logoStub} aria-label="SkillSwap">
    <span className={styles.logoIcon} aria-hidden="true">
      <SparkIcon />
    </span>
    SkillSwap
  </div>
);

const ThemeButtonStub: FC = () => (
  <div className={styles.themeButtonStub} aria-label="Переключить тему">
    <MoonIcon />
  </div>
);

const UserUnAuthStub: FC = () => (
  <div className={styles.userUnAuthStub}>
    <div className={styles.btnOutline}>Войти</div>
    <div className={styles.btnFilled}>Зарегистрироваться</div>
  </div>
);

const UserAuthStub: FC = () => (
  <div className={styles.userAuthStub}>
    <span className={styles.userIcons} aria-hidden="true">
      <span className={styles.userIcon}>
        {/* колокольчик */}
        <svg width="24" height="24" fill="none">
          <path d="M12 22a2.5 2.5 0 0 0 2.45-2H9.55A2.5 2.5 0 0 0 12 22Z" fill="#253017" />
          <path d="M20 17h-1V10a7 7 0 1 0-14 0v7H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" fill="#253017" />
        </svg>
      </span>
      <span className={styles.userIcon}>
        {/* сердце */}
        <svg width="24" height="24" fill="none">
          <path
            d="M12 21s-7-4.6-9.5-9.1C.8 8.6 2.4 5.5 5.7 4.6c2-.6 3.9.1 5.2 1.5 1.3-1.4 3.2-2.1 5.2-1.5 3.3.9 4.9 4 3.2 7.3C19 16.4 12 21 12 21Z"
            stroke="#253017"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </span>
    </span>

    <span className={styles.userName}>Мария</span>
    <span className={styles.avatar} aria-hidden="true" />
  </div>
);

export const HeaderLayout: FC<THeaderLayoutProps> = (props) => {
  // ✅ по правилу react/destructuring-assignment
  const { variant = 'full' } = props;

  if (variant === 'auth') {
    const { logo, onClose } = props as THeaderLayoutAuthProps;

    return (
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.containerAuth}`}>
          <div className={styles.left}>{logo ?? <LogoStub />}</div>

          <div className={styles.right}>
            {onClose ? (
              <button type="button" className={styles.closeButton} onClick={onClose}>
                <span>Закрыть</span>
                <span className={styles.closeIcon}>
                  <CloseIcon />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </header>
    );
  }

  const {
    onAboutClick,
    onAllSkillsClick,
    isAuthenticated,
    searchValue,
    onSearchChange,
    onSearchClear,
    isAboutActive = false,
    isAllSkillsActive = false,
    logo,
    themeButton,
    userAuth,
    userUnAuth,
  } = props as THeaderLayoutFullProps;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {logo ?? <LogoStub />}

          <nav className={styles.navBlock} aria-label="Навигация">
            <NavElementUI text="О проекте" onClick={onAboutClick} isActive={isAboutActive} />
            <NavElementUI
              text="Все навыки"
              icon={<ChevronDownIcon />}
              onClick={onAllSkillsClick}
              isActive={isAllSkillsActive}
            />
          </nav>
        </div>

        <div className={styles.search}>
          <SearchUI value={searchValue} onChange={onSearchChange} onClear={onSearchClear} />
        </div>

        <div className={styles.right}>
          {themeButton ?? <ThemeButtonStub />}
          {isAuthenticated ? (userAuth ?? <UserAuthStub />) : (userUnAuth ?? <UserUnAuthStub />)}
        </div>
      </div>
    </header>
  );
};

// import { FC } from 'react';
// import { Chevron, NavElementUI } from '@ui/nav-element-ui';
// import { SearchUI } from '@ui/search';
// import styles from './header-layout.module.css';
// import { THeaderLayoutAuthProps, THeaderLayoutFullProps, THeaderLayoutProps } from './type';

// const CloseIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//     <path d="M18 6L6 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
//     <path d="M6 6L18 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
//   </svg>
// );

// const SparkIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
//     <path
//       d="M11 1.5C12.1 6.2 15.8 9.9 20.5 11C15.8 12.1 12.1 15.8 11 20.5C9.9 15.8 6.2 12.1 1.5 11C6.2 9.9 9.9 6.2 11 1.5Z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const MoonIcon = () => (
//   <svg width="24" height="24" fill="none">
//     <path
//       fill="#253017"
//       d="M12.425 22c-.158 0-.316 0-.474-.01-5.209-.232-9.562-4.427-9.925-9.543C1.71 8.057 4.25 3.955 8.342 2.234c1.163-.483 1.777-.111 2.037.159.26.26.623.865.14 1.971a7.623 7.623 0 0 0-.633 3.116c.019 4.121 3.442 7.618 7.618 7.786.605.028 1.2-.019 1.777-.121 1.227-.223 1.739.27 1.934.586.196.316.419.995-.325 2C18.918 20.428 15.783 22 12.425 22Zm-9.013-9.655c.317 4.428 4.093 8.055 8.595 8.25a9.052 9.052 0 0 0 7.748-3.683 1.86 1.86 0 0 0 .233-.41 1.464 1.464 0 0 0-.465.029 9.737 9.737 0 0 1-2.084.14c-4.911-.196-8.93-4.317-8.957-9.172 0-1.284.25-2.52.762-3.683.093-.205.112-.344.121-.419-.083 0-.232.019-.474.121-3.544 1.488-5.739 5.041-5.479 8.827Z"
//     />
//   </svg>
// );

// // Временные заглушки для отсутствующих UI-компонентов (LogoUI / IconButtonUI / UserAuthUI / UserUnAuthUI)
// const LogoStub: FC = () => (
//   <div className={styles.logoStub} aria-label="SkillSwap">
//     <span className={styles.logoIcon} aria-hidden="true">
//       <SparkIcon />
//     </span>
//     SkillSwap
//   </div>
// );

// const ThemeButtonStub: FC = () => (
//   <div className={styles.themeButtonStub} aria-label="Переключить тему">
//     <MoonIcon />
//   </div>
// );

// const UserUnAuthStub: FC = () => (
//   <div className={styles.userUnAuthStub}>
//     <div className={styles.btnOutline}>Войти</div>
//     <div className={styles.btnFilled}>Зарегистрироваться</div>
//   </div>
// );

// const UserAuthStub: FC = () => (
//   <div className={styles.userAuthStub}>
//     <span className={styles.userIcons} aria-hidden="true">
//       <span className={styles.userIcon}>
//         {/* колокольчик */}
//         <svg width="24" height="24" fill="none">
//           <path d="M12 22a2.5 2.5 0 0 0 2.45-2H9.55A2.5 2.5 0 0 0 12 22Z" fill="#253017" />
//           <path d="M20 17h-1V10a7 7 0 1 0-14 0v7H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" fill="#253017" />
//         </svg>
//       </span>
//       <span className={styles.userIcon}>
//         {/* сердце */}
//         <svg width="24" height="24" fill="none">
//           <path
//             d="M12 21s-7-4.6-9.5-9.1C.8 8.6 2.4 5.5 5.7 4.6c2-.6 3.9.1 5.2 1.5 1.3-1.4 3.2-2.1 5.2-1.5 3.3.9 4.9 4 3.2 7.3C19 16.4 12 21 12 21Z"
//             stroke="#253017"
//             strokeWidth="1.5"
//             fill="none"
//           />
//         </svg>
//       </span>
//     </span>

//     <span className={styles.userName}>Мария</span>
//     <span className={styles.avatar} aria-hidden="true" />
//   </div>
// );

// export const HeaderLayout: FC<THeaderLayoutProps> = (props) => {
//   const variant = props.variant ?? 'full';

//   if (variant === 'auth') {
//     const { logo, onClose } = props as THeaderLayoutAuthProps;

//     return (
//       <header className={styles.header}>
//         <div className={`${styles.container} ${styles.containerAuth}`}>
//           <div className={styles.left}>{logo ?? <LogoStub />}</div>

//           <div className={styles.right}>
//             {onClose ? (
//               <button type="button" className={styles.closeButton} onClick={onClose}>
//                 <span>Закрыть</span>
//                 <span className={styles.closeIcon}>
//                   <CloseIcon />
//                 </span>
//               </button>
//             ) : null}
//           </div>
//         </div>
//       </header>
//     );
//   }

//   const {
//     onAboutClick,
//     onAllSkillsClick,
//     isAuthenticated,
//     searchValue,
//     onSearchChange,
//     onSearchClear,
//     isAboutActive = false,
//     isAllSkillsActive = false,
//     logo,
//     themeButton,
//     userAuth,
//     userUnAuth,
//   } = props as THeaderLayoutFullProps;

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <div className={styles.left}>
//           {logo ?? <LogoStub />}

//           <nav className={styles.navBlock} aria-label="Навигация">
//             <NavElementUI text="О проекте" onClick={onAboutClick} isActive={isAboutActive} />
//             <NavElementUI
//               text="Все навыки"
//               icon={<Chevron />}
//               onClick={onAllSkillsClick}
//               isActive={isAllSkillsActive}
//             />
//           </nav>
//         </div>

//         <div className={styles.search}>
//           <SearchUI value={searchValue} onChange={onSearchChange} onClear={onSearchClear} />
//         </div>

//         <div className={styles.right}>
//           {themeButton ?? <ThemeButtonStub />}
//           {isAuthenticated ? (userAuth ?? <UserAuthStub />) : (userUnAuth ?? <UserUnAuthStub />)}
//         </div>
//       </div>
//     </header>
//   );
// };
