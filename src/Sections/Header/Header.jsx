import { Link } from "react-router-dom";
import { headerDefaults } from "../defaults";
import { Field, Input } from "../../Components/UI/UI";
import styles from "./Header.module.css";

export function HeaderSection({ data }) {
  const props = { ...headerDefaults, ...data };

  return (
    <header className={styles.headerRoot}>
      <div className={styles.row}>
        <Link to="/" className={styles.brand}>
          <img src={props.logoUrl} alt="" />
          <span>{props.brandName}</span>
        </Link>
        <nav className={styles.nav}>
          {[...props.links].reverse().map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`${styles.navLink} ${link.href === props.activeHref ? styles.navLinkActive : ""}`.trim()}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.mobileMenu}>
        {props.links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`${styles.navLink} ${link.href === props.activeHref ? styles.navLinkActive : ""}`.trim()}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export function HeaderSettings({ data, onChange }) {
  const props = { ...headerDefaults, ...data };
  return (
    <>
      <Field>
        نام برند
        <Input
          value={props.brandName}
          onChange={(e) => onChange({ ...props, brandName: e.target.value })}
        />
      </Field>
      <Field>
        آدرس لوگو
        <Input
          value={props.logoUrl}
          onChange={(e) => onChange({ ...props, logoUrl: e.target.value })}
        />
      </Field>
      <Field>
        لینک فعال
        <Input
          value={props.activeHref}
          onChange={(e) => onChange({ ...props, activeHref: e.target.value })}
        />
      </Field>
    </>
  );
}
