import { featuresDefaults } from "../defaults";
import {
  ArrowLeftIcon,
  Field,
  Heading,
  Input,
  PrimaryButton,
  Select,
  SettingsItem,
  Text,
  TextArea,
} from "../../Components/UI/UI";
import styles from "./Features.module.css";

export function FeaturesSection({ data }) {
  const props = { ...featuresDefaults, ...data };
  const isServices = props.variant === "services";

  return (
    <section
      className={`${styles.wrap} ${isServices ? styles.wrapServices : ""}`}
    >
      <div className={styles.inner}>
        {props.title ? (
          <Heading $align={isServices ? "right" : "center"}>
            {props.title}
          </Heading>
        ) : null}

        {isServices && props.description ? (
          <Text $muted>{props.description}</Text>
        ) : null}

        <div
          className={`${styles.cards} ${isServices ? styles.cardsServices : ""}`}
        >
          {props.items.map((item) => (
            <article
              key={item.title}
              className={`${styles.card} ${
                isServices ? styles.cardServices : ""
              } ${item.accent === "green" ? styles.cardGreen : ""}`}
            >
              <div
                className={`${styles.iconBubble} ${isServices ? styles.iconBubbleServices : ""}`}
              >
                <img src={item.iconUrl} alt={item.title} />
              </div>
              <div
                className={`${styles.cardBody} ${
                  isServices ? styles.cardBodyServices : ""
                }`}
              >
                <Heading $size="22px" as="h3">
                  {item.title}
                </Heading>
                <Text $muted>{item.description}</Text>

                {isServices && item.features?.length ? (
                  <ul className={styles.featureList}>
                    {item.features.map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureDot} />
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {props.ctaLabel ? (
          <PrimaryButton href={props.ctaHref} $color={props.buttonColor}>
            <ArrowLeftIcon />
            {props.ctaLabel}
          </PrimaryButton>
        ) : null}
      </div>
    </section>
  );
}

export function FeaturesSettings({ data, onChange }) {
  const props = { ...featuresDefaults, ...data };
  const isServices = props.variant === "services";

  const updateItem = (index, key, value) => {
    const items = props.items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange({ ...props, items });
  };

  return (
    <>
      <Field>
        variant
        <Select
          value={props.variant || ""}
          onChange={(e) => onChange({ ...props, variant: e.target.value })}
        >
          <option value="">پیش‌فرض (صفحه اصلی)</option>
          <option value="services">خدمات (services)</option>
        </Select>
      </Field>

      <Field>
        عنوان سکشن
        <Input
          value={props.title}
          onChange={(e) => onChange({ ...props, title: e.target.value })}
        />
      </Field>

      {isServices && (
        <Field>
          توضیحات کلی
          <TextArea
            value={props.description || ""}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
          />
        </Field>
      )}

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
          value={props.ctaHref}
          onChange={(e) => onChange({ ...props, ctaHref: e.target.value })}
        />
      </Field>

      <Field>
        رنگ دکمه
        <Input
          value={props.buttonColor}
          onChange={(e) => onChange({ ...props, buttonColor: e.target.value })}
        />
      </Field>

      {props.items.map((item, index) => (
        <SettingsItem key={index}>
          <Field>
            عنوان آیتم {index + 1}
            <Input
              value={item.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
            />
          </Field>
          <Field>
            توضیحات
            <TextArea
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
            />
          </Field>
          <Field>
            آیکون / تصویر
            <Input
              value={item.iconUrl || ""}
              onChange={(e) => updateItem(index, "iconUrl", e.target.value)}
            />
          </Field>
        </SettingsItem>
      ))}
    </>
  );
}
