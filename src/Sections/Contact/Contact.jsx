import { Field, Heading, Input, Text, TextArea } from "../../Components/UI/UI";
import { contactDefaults } from "../defaults";
import styles from "./Contact.module.css";

export function ContactSection({ data }) {
  const props = { ...contactDefaults, ...data };

  return (
    <section className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.info}>
          <Heading>{props.title}</Heading>
          <div className={styles.contactList}>
            <div className={styles.contactRow}>
              <Text className={`${styles.value} ${styles.valueStrong}`}>
                {props.phone}
              </Text>
              <span className={styles.icon}>📞</span>
            </div>
            <div className={styles.contactRow}>
              <Text className={styles.value}>{props.email}</Text>
              <span className={styles.icon}>✉️</span>
            </div>
            <div className={styles.contactRow}>
              <Text
                className={`${styles.value} ${styles.valueStrong} ${styles.address}`}
              >
                {props.address}
              </Text>
              <span className={styles.icon}>📍</span>
            </div>
          </div>
        </div>
        <img className={styles.map} src={props.mapImage} alt="map" />
      </div>
    </section>
  );
}

export function ContactSettings({ data, onChange }) {
  const props = { ...contactDefaults, ...data };
  const update = (key, value) => onChange({ ...props, [key]: value });

  return (
    <>
      <Field>
        عنوان
        <TextArea
          value={props.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </Field>
      <Field>
        تلفن
        <Input
          value={props.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </Field>
      <Field>
        ایمیل
        <Input
          value={props.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>
      <Field>
        آدرس
        <TextArea
          value={props.address}
          onChange={(e) => update("address", e.target.value)}
        />
      </Field>
      <Field>
        تصویر نقشه
        <Input
          value={props.mapImage}
          onChange={(e) => update("mapImage", e.target.value)}
        />
      </Field>
    </>
  );
}
