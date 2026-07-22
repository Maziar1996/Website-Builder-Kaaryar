import { heroDefaults } from "../defaults";
import {
  ArrowLeftIcon,
  Field,
  Heading,
  Input,
  PrimaryButton,
  Text,
  TextArea,
} from "../../Components/UI/UI";
import styles from "./Hero.module.css";

export function HeroSection({ data }) {
  const props = { ...heroDefaults, ...data };
  const isServices = props.variant === "services";

  return (
    <section
      className={`${styles.wrap} ${isServices ? styles.wrapServices : ""}`}
    >
      <div
        className={`${styles.inner} ${isServices ? styles.innerServices : ""}`}
      >
        <div className={styles.media}>
          <img src={props.imageUrl} alt="" />
        </div>
        <div
          className={`${styles.content} ${isServices ? styles.contentServices : ""}`}
        >
          <div className={styles.textBlock}>
            <Heading className={styles.title}>{props.title}</Heading>
            <Text $muted>{props.subtitle}</Text>
          </div>

          {isServices && props.items?.length > 0 && (
            <div className={styles.servicesList}>
              {props.items.map((item) => (
                <div key={item.title} className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>
                    <img src={item.iconUrl} alt={item.title} />
                  </div>
                  <div className={styles.serviceBody}>
                    <Heading $size="20px" as="h4">
                      {item.title}
                    </Heading>
                    <Text $muted $size="14px">
                      {item.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}

          {props.ctaLabel ? (
            <PrimaryButton href={props.ctaHref} $color={props.buttonColor}>
              <ArrowLeftIcon />
              {props.ctaLabel}
            </PrimaryButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function HeroSettings({ data, onChange }) {
  const props = { ...heroDefaults, ...data };
  const update = (key, value) => onChange({ ...props, [key]: value });
  const isServices = props.variant === "services";

  const updateItem = (index, key, value) => {
    const items = (props.items || []).map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    update("items", items);
  };

  const addItem = () => {
    update("items", [
      ...(props.items || []),
      { title: "", description: "", iconUrl: "" },
    ]);
  };

  const removeItem = (index) => {
    update(
      "items",
      (props.items || []).filter((_, i) => i !== index),
    );
  };

  return (
    <>
      <Field>
        variant
        <select
          className="input"
          value={props.variant || ""}
          onChange={(e) => update("variant", e.target.value)}
        >
          <option value="">پیش‌فرض (صفحه اصلی)</option>
          <option value="services">خدمات (services)</option>
        </select>
      </Field>
      <Field>
        عنوان
        <TextArea
          value={props.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </Field>
      <Field>
        توضیحات
        <TextArea
          value={props.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
        />
      </Field>
      <Field>
        متن دکمه (خالی = بدون دکمه)
        <Input
          value={props.ctaLabel || ""}
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
        تصویر
        <Input
          value={props.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
        />
      </Field>
      <Field>
        رنگ دکمه
        <Input
          value={props.buttonColor}
          onChange={(e) => update("buttonColor", e.target.value)}
        />
      </Field>

      {isServices && (
        <>
          <h4 style={{ marginTop: 16 }}>آیتم‌های خدمت</h4>
          {(props.items || []).map((item, index) => (
            <div
              key={index}
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: 12,
                marginTop: 8,
              }}
            >
              <Field>
                عنوان آیتم
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                />
              </Field>
              <Field>
                توضیحات
                <TextArea
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                />
              </Field>
              <Field>
                آیکون
                <Input
                  value={item.iconUrl || ""}
                  onChange={(e) => updateItem(index, "iconUrl", e.target.value)}
                />
              </Field>
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{
                  color: "var(--color-danger)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                حذف آیتم
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            style={{
              marginTop: 8,
              color: "var(--color-green)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            + افزودن آیتم خدمت
          </button>
        </>
      )}
    </>
  );
}
