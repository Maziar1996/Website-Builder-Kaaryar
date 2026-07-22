import { contentDefaults } from "../defaults";
import { Field, Heading, Input, Text, TextArea } from "../../Components/UI/UI";
import { joinParagraphs, splitParagraphs } from "../../Shared/Utils/text";
import styles from "./Content.module.css";

export function ContentSection({ data }) {
  const props = { ...contentDefaults, ...data };

  return (
    <section className={styles.wrap}>
      <div
        className={`${styles.inner} ${props.align === "center" ? styles.center : styles.right}`}
      >
        {props.title ? (
          <Heading $align={props.align}>{props.title}</Heading>
        ) : null}
        {(props.paragraphs || []).map((p, index) => (
          <Text key={index} $muted $align={props.align}>
            {p}
          </Text>
        ))}
      </div>
    </section>
  );
}

export function ContentSettings({ data, onChange }) {
  const props = { ...contentDefaults, ...data };

  return (
    <>
      <Field>
        عنوان
        <Input
          value={props.title || ""}
          onChange={(e) => onChange({ ...props, title: e.target.value })}
        />
      </Field>
      <Field>
        تراز (right / center)
        <Input
          value={props.align || "right"}
          onChange={(e) => onChange({ ...props, align: e.target.value })}
        />
      </Field>
      <Field>
        پاراگراف‌ها (هر خط یک پاراگراف)
        <TextArea
          value={joinParagraphs(props.paragraphs || [])}
          onChange={(e) =>
            onChange({
              ...props,
              paragraphs: splitParagraphs(e.target.value),
            })
          }
        />
      </Field>
    </>
  );
}
