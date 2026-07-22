import { footerDefaults } from "../defaults";
import { Field, Input } from "../../Components/UI/UI";
import styles from "./Footer.module.css";

export function FooterSection({ data }) {
  const props = { ...footerDefaults, ...data };

  return (
    <footer className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.socials}>
          {props.socials.map((item, index) => (
            <span key={`${item}-${index}`}>
              {<img src={item} alt={`Social ${index + 1}`} />}
            </span>
          ))}
        </div>
        <div className={styles.brand}>
          <img src={props.logoUrl} alt="" />
          <span>{props.brandName}</span>
        </div>
      </div>
      <div className={styles.bottom}>{props.copyright}</div>
    </footer>
  );
}

export function FooterSettings({ data, onChange }) {
  const props = { ...footerDefaults, ...data };

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
        لوگو
        <Input
          value={props.logoUrl}
          onChange={(e) => onChange({ ...props, logoUrl: e.target.value })}
        />
      </Field>
      <Field>
        متن کپی‌رایت
        <Input
          value={props.copyright}
          onChange={(e) => onChange({ ...props, copyright: e.target.value })}
        />
      </Field>
    </>
  );
}
