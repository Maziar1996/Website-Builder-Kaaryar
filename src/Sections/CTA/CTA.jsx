import { ctaDefaults } from "../defaults";
import {
  ArrowLeftIcon,
  Field,
  Heading,
  Input,
  PrimaryButton,
  TextArea,
} from "../../Components/UI/UI";
import styles from "./CTA.module.css";

export function CtaSection({ data }) {
  const props = { ...ctaDefaults, ...data };

  return (
    <section
      className={styles.wrap}
      style={{
        backgroundImage: `linear-gradient(rgba(253, 253, 253, 0.8), rgba(253, 253, 253, 0.8)), url(${props.backgroundImage})`,
      }}
    >
      <div className={styles.inner}>
        <Heading $align="center">{props.title}</Heading>
        <PrimaryButton href={props.ctaHref} $color={props.buttonColor}>
          <ArrowLeftIcon />
          {props.ctaLabel}
        </PrimaryButton>
      </div>
    </section>
  );
}

export function CtaSettings({ data, onChange }) {
  const props = { ...ctaDefaults, ...data };
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
        متن دکمه
        <Input
          value={props.ctaLabel}
          onChange={(e) => update("ctaLabel", e.target.value)}
        />
      </Field>
      <Field>
        لینک دکمه
        <Input
          value={props.ctaHref}
          onChange={(e) => update("ctaHref", e.target.value)}
        />
      </Field>
      <Field>
        تصویر پس‌زمینه
        <Input
          value={props.backgroundImage}
          onChange={(e) => update("backgroundImage", e.target.value)}
        />
      </Field>
    </>
  );
}
