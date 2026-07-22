import { useState } from "react";
import { faqDefaults } from "../defaults";
import {
  Field,
  Heading,
  Input,
  SettingsItem,
  Text,
  TextArea,
} from "../../Components/UI/UI";
import styles from "./FAQ.module.css";

export function FaqSection({ data }) {
  const props = { ...faqDefaults, ...data };
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.wrap}>
      <div className={styles.list}>
        {props.items.map((item, index) => {
          const open = openIndex === index;
          return (
            <button
              key={item.question}
              type="button"
              className={styles.item}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`}>
                ▼
              </span>
              <div className={styles.body}>
                <Text className={styles.questionText}>{item.question}</Text>
                {open && item.answer ? <Text $muted>{item.answer}</Text> : null}
              </div>
            </button>
          );
        })}
      </div>
      <div className={styles.titleCol}>
        <Heading>{props.title}</Heading>
      </div>
    </section>
  );
}

export function FaqSettings({ data, onChange }) {
  const props = { ...faqDefaults, ...data };

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
      {props.items.map((item, index) => (
        <SettingsItem key={index}>
          <Field>
            سوال {index + 1}
            <Input
              value={item.question}
              onChange={(e) => updateItem(index, "question", e.target.value)}
            />
          </Field>
          <Field>
            پاسخ
            <TextArea
              value={item.answer || ""}
              onChange={(e) => updateItem(index, "answer", e.target.value)}
            />
          </Field>
        </SettingsItem>
      ))}
    </>
  );
}
