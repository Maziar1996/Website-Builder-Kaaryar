import { processDefaults } from "../defaults";
import {
  Field,
  Heading,
  Input,
  SettingsItem,
  Text,
  TextArea,
  PrimaryButton,
  ArrowLeftIcon,
} from "../../Components/UI/UI";
import styles from "./Process.module.css";

export function ProcessSection({ data }) {
  const props = { ...processDefaults, ...data };

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <Heading $align="center">{props.title}</Heading>
          {props.subtitle ? (
            <Text $muted $align="center" className={styles.subtitle}>
              {props.subtitle}
            </Text>
          ) : null}
          {props.ctaLabel ? (
            <PrimaryButton href={props.ctaHref} $color={props.buttonColor}>
              <ArrowLeftIcon />
              {props.ctaLabel}
            </PrimaryButton>
          ) : null}
        </div>
        <div className={styles.steps}>
          {props.steps.map((step, index) => (
            <article key={step.id || `step-${index}`} className={styles.step}>
              <span className={styles.numberMark}>{step.number}</span>

              <div className={styles.stepHead}>
                <div className={styles.badge}>
                  <img
                    className={styles.icon}
                    src={step.iconUrl}
                    alt={step.title}
                  />
                </div>
                <Heading $size="22px" as="h3">
                  {step.title}
                </Heading>
              </div>

              <Text $muted $align="center">
                {step.description}
              </Text>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSettings({ data, onChange }) {
  const props = { ...processDefaults, ...data };

  const updateStep = (index, key, value) => {
    const steps = props.steps.map((step, i) =>
      i === index ? { ...step, [key]: value } : step,
    );
    onChange({ ...props, steps });
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
          value={props.subtitle || ""}
          onChange={(e) => onChange({ ...props, subtitle: e.target.value })}
        />
      </Field>
      <Field>
        متن دکمه (خالی = بدون دکمه)
        <Input
          value={props.ctaLabel || ""}
          onChange={(e) => onChange({ ...props, ctaLabel: e.target.value })}
        />
      </Field>
      <Field>
        لینک دکمه
        <Input
          value={props.ctaHref || ""}
          onChange={(e) => onChange({ ...props, ctaHref: e.target.value })}
        />
      </Field>
      <Field>
        رنگ دکمه
        <Input
          value={props.buttonColor || ""}
          onChange={(e) => onChange({ ...props, buttonColor: e.target.value })}
        />
      </Field>
      {props.steps.map((step, index) => (
        <SettingsItem key={index}>
          <Field>
            عنوان مرحله {index + 1}
            <Input
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
            />
          </Field>
          <Field>
            توضیحات
            <TextArea
              value={step.description}
              onChange={(e) => updateStep(index, "description", e.target.value)}
            />
          </Field>
          <Field>
            شماره / آیکون متنی
            <Input
              value={step.number}
              onChange={(e) => updateStep(index, "number", e.target.value)}
            />
          </Field>
          <Field>
            تصویر آیکون
            <Input
              value={step.iconUrl || ""}
              onChange={(e) => updateStep(index, "iconUrl", e.target.value)}
            />
          </Field>
        </SettingsItem>
      ))}
    </>
  );
}
