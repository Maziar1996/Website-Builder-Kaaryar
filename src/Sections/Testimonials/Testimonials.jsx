import { testimonialsDefaults } from "../defaults";
import {
  Field,
  Heading,
  Input,
  SettingsItem,
  Text,
  TextArea,
} from "../../Components/UI/UI";
import styles from "./Testimonials.module.css";

export function TestimonialsSection({ data }) {
  const props = { ...testimonialsDefaults, ...data };

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.cards}>
          {props.items.map((item) => (
            <article key={item.name} className={styles.card}>
              <div className={styles.person}>
                <div className={styles.personInfo}>
                  <Heading $size="20px" as="h3">
                    {item.name}
                  </Heading>
                  <Text $muted $size="16px">
                    {item.role}
                  </Text>
                </div>
                <img className={styles.avatar} src={item.avatarUrl} alt="" />
              </div>
              <Text $muted>{item.quote}</Text>
            </article>
          ))}
        </div>
        <div className={styles.intro}>
          <Heading $align="right">{props.title}</Heading>
          <Text $muted>{props.subtitle}</Text>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSettings({ data, onChange }) {
  const props = { ...testimonialsDefaults, ...data };

  const updateItem = (index, key, value) => {
    const items = props.items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange({ ...props, items });
  };

  return (
    <>
      <Field>
        عنوان
        <Input
          value={props.title}
          onChange={(e) => onChange({ ...props, title: e.target.value })}
        />
      </Field>
      <Field>
        زیرعنوان
        <TextArea
          value={props.subtitle}
          onChange={(e) => onChange({ ...props, subtitle: e.target.value })}
        />
      </Field>
      {props.items.map((item, index) => (
        <SettingsItem key={index}>
          <Field>
            نام
            <Input
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
            />
          </Field>
          <Field>
            نقش
            <Input
              value={item.role}
              onChange={(e) => updateItem(index, "role", e.target.value)}
            />
          </Field>
          <Field>
            نظر
            <TextArea
              value={item.quote}
              onChange={(e) => updateItem(index, "quote", e.target.value)}
            />
          </Field>
        </SettingsItem>
      ))}
    </>
  );
}
