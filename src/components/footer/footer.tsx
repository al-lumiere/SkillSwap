import { LogoUI } from '@ui/logo';
import { NavElementUI } from '@ui/nav-element-ui';
import styles from './footer.module.css';

export const FooterLayout = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoUI />
      </div>

      <nav className={styles.navBlock} aria-label="Навигация по сайту">
        <div className={styles.navColumn}>
          <NavElementUI text="О проекте" onClick={() => {}} />
          <NavElementUI text="Все навыки" onClick={() => {}} />
        </div>

        <div className={styles.navColumn}>
          <NavElementUI text="Контакты" onClick={() => {}} />
          <NavElementUI text="Блог" onClick={() => {}} />
        </div>

        <div className={styles.navColumn}>
          <NavElementUI text="Политика конфиденциальности" onClick={() => {}} />
          <NavElementUI text="Пользовательское соглашение" onClick={() => {}} />
        </div>
      </nav>

      <p className={styles.copyright}>SkillSwap - 2025</p>
    </div>
  </footer>
);
