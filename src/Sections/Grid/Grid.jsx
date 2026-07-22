import { gridDefaults } from "../defaults";
import useSlideshow from "../../Hooks/useSlideshow";
import {
  Field,
  Heading,
  Input,
  SettingsItem,
  Text,
  TextArea,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdminButton,
  Select,
} from "../../Components/UI/UI";
import { createId } from "../../Shared/Utils/id";
import styles from "./Grid.module.css";

export function GridSection({ data }) {
  const props = { ...gridDefaults, ...data };

  if (props.variant === "logos") {
    return (
      <section className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.logos}>
            {(props.items || []).map((item, index) => (
              <img
                key={item.id || item.imageUrl || index}
                src={item.imageUrl || item.title}
                alt={item.title || `logo ${index + 1}`}
                className={styles.logoImage}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (props.variant === "team") {
    return <TeamSlideshow {...props} />;
  }

  if (props.variant === "projects") {
    return <ProjectsSlideshow title={props.title} items={props.items} />;
  }

  if (props.variant === "showcase") {
    return <ShowcaseGrid title={props.title} items={props.items} />;
  }

  if (props.variant === "services") {
    return (
      <section className={styles.wrap}>
        <div className={styles.inner}>
          {props.title ? (
            <Heading $align="center">{props.title}</Heading>
          ) : null}
          <div className={styles.servicesGrid}>
            {(props.items || []).map((item, idx) => (
              <article key={item.id || idx} className={styles.serviceCard}>
                {item.iconUrl && (
                  <div className={styles.serviceIcon}>
                    <img src={item.iconUrl} alt={item.title} />
                  </div>
                )}
                <Heading $size="20px" as="h3">
                  {item.title}
                </Heading>
                <Text $muted>{item.description}</Text>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        {props.title ? <Heading $align="center">{props.title}</Heading> : null}
        <div
          className={styles.grid}
          style={{ "--grid-columns": props.columns || 1 }}
        >
          {props.items.map((item, index) => (
            <article key={item.id || index} className={styles.card}>
              {item.imageUrl ? (
                <img className={styles.cardMedia} src={item.imageUrl} alt="" />
              ) : null}
              <Heading $size="22px" as="h3">
                {item.title}
              </Heading>
              <Text $muted>{item.description}</Text>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseGrid({ title, items = [] }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        {title && <Heading $align="center">{title}</Heading>}

        <div className={styles.showcaseGrid}>
          {items.map((item, idx) => (
            <article key={item.id || idx} className={styles.showcaseCard}>
              {item.logoUrl && (
                <div className={styles.showcaseBrand}>
                  <img src={item.logoUrl} alt={item.brand || ""} />
                </div>
              )}
              {item.imageUrl ? (
                <img
                  className={styles.showcaseImage}
                  src={item.imageUrl}
                  alt={item.title || ""}
                />
              ) : (
                <div className={styles.showcaseImagePlaceholder} />
              )}
              <div className={styles.showcaseContent}>
                <Heading $size="20px" as="h3">
                  {item.title}
                </Heading>
                <Text $muted $size="14px">
                  {item.description}
                </Text>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSlideshow({ title, items = [] }) {
  const { currentIndex, next, prev, goTo } = useSlideshow(items.length, {
    initialIndex: 0,
    direction: "forward",
    intervalMs: 3000,
  });

  if (items.length === 0) {
    return (
      <section className={styles.wrap}>
        <div className={styles.inner}>
          {title && <Heading $align="center">{title}</Heading>}
          <Text $muted $align="center">
            هنوز آیتمی اضافه نشده است.
          </Text>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        {title && <Heading $align="center">{title}</Heading>}

        <div className={styles.projectsSlideshowWrapper}>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="اسلاید قبلی"
          >
            <ChevronRightIcon />
          </button>

          <div className={styles.slideTrackOuter}>
            <div
              className={styles.slideTrack}
              style={{ transform: `translateX(+${currentIndex * 100}%)` }}
            >
              {items.map((item, idx) => (
                <div key={item.id || idx} className={styles.slide}>
                  <article className={styles.slideCard}>
                    {item.imageUrl ? (
                      <img
                        className={styles.slideImage}
                        src={item.imageUrl}
                        alt={item.title || ""}
                      />
                    ) : (
                      <div className={styles.slideImagePlaceholder} />
                    )}
                    <div className={styles.slideContent}>
                      {item.logoUrl && (
                        <div className={styles.slideBrandRow}>
                          <img
                            src={item.logoUrl}
                            alt={item.brand || ""}
                            className={styles.slideBrandLogo}
                          />
                        </div>
                      )}
                      <Heading $size="22px" as="h3">
                        {item.title}
                      </Heading>
                      <Text $muted>{item.description}</Text>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="اسلاید بعدی"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        <div className={`${styles.dots} ${styles.projectsDots}`}>
          {items.map((item, idx) => (
            <button
              type="button"
              key={item.id || idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                goTo(idx);
              }}
              aria-label={`اسلاید ${idx + 1}`}
              aria-current={idx === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSlideshow({ title, subtitle, items = [] }) {
  const { currentIndex, goTo } = useSlideshow(items.length, {
    initialIndex: 0,
    direction: "backward",
    intervalMs: 3000,
  });

  if (items.length === 0) {
    return (
      <section className={styles.wrap}>
        <div className={styles.inner}>
          {title && <Heading $align="center">{title}</Heading>}
          {subtitle && (
            <Text $muted $align="center">
              {subtitle}
            </Text>
          )}
          <Text $muted $align="center">
            هنوز آیتمی اضافه نشده است.
          </Text>
        </div>
      </section>
    );
  }

  const current = items[currentIndex];
  if (!current) return null;

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        {title && <Heading $align="center">{title}</Heading>}
        {subtitle && (
          <Text $muted $align="center">
            {subtitle}
          </Text>
        )}
        <div className={styles.slideshowContainer}>
          <article className={styles.teamCard}>
            <div
              className={styles.avatarFrame}
              style={{ background: current.bg || "var(--color-cream)" }}
            >
              <img src={current.imageUrl} alt={current.title} />
            </div>
            <div>
              <Heading $size="24px" $align="center" as="h3">
                {current.title}
              </Heading>
              <Text $muted $align="center">
                {current.role}
              </Text>
            </div>
          </article>
          <div className={styles.dots}>
            {items.map((item, index) => (
              <button
                type="button"
                key={item.id || index}
                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index);
                }}
                aria-label={`اسلاید ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GridSettings({ data, onChange }) {
  const props = { ...gridDefaults, ...data };
  const isServices = props.variant === "services";

  const updateItem = (index, key, value) => {
    const items = props.items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange({ ...props, items });
  };

  const addItem = () => {
    let newItem;
    if (props.variant === "team") {
      newItem = {
        id: createId("team"),
        title: "عضو جدید",
        role: "سمت",
        imageUrl: "",
        bg: "#FCEDDE",
      };
    } else if (props.variant === "services") {
      newItem = {
        id: createId("service"),
        title: "خدمت جدید",
        description: "توضیحات خدمت را اینجا وارد کنید...",
        iconUrl: "",
      };
    } else {
      newItem = {
        id: createId("item"),
        title: "پروژه جدید",
        description: "توضیحات پروژه را اینجا وارد کنید...",
        imageUrl: "",
        logoUrl: "",
      };
    }
    onChange({ ...props, items: [...(props.items || []), newItem] });
  };

  const removeItem = (index) => {
    const items = (props.items || []).filter((_, i) => i !== index);
    onChange({ ...props, items });
  };

  const handleVariantChange = (e) => {
    const newVariant = e.target.value;
    onChange({ ...props, variant: newVariant });
  };

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
        نوع گرید
        <Select value={props.variant} onChange={handleVariantChange}>
          <option value="projects">پروژه‌ها (اسلایدشو)</option>
          <option value="showcase">نمایشگاه (گرید ۳ ستونه)</option>
          <option value="team">تیم (کاروسل)</option>
          <option value="logos">لوگوها (گرید)</option>
          <option value="services">خدمات (services)</option>
        </Select>
      </Field>
      {props.variant === "logos" && (
        <Field>
          تعداد ستون
          <Input
            type="number"
            min={1}
            value={String(props.columns || 1)}
            onChange={(e) =>
              onChange({ ...props, columns: Number(e.target.value) })
            }
          />
        </Field>
      )}

      {props.items.map((item, index) => (
        <SettingsItem key={item.id || index}>
          <div className={styles.itemHeader}>
            <strong>آیتم {index + 1}</strong>
            <AdminButton $variant="danger" onClick={() => removeItem(index)}>
              حذف
            </AdminButton>
          </div>
          <Field>
            عنوان
            <Input
              value={item.title || ""}
              onChange={(e) => updateItem(index, "title", e.target.value)}
            />
          </Field>
          <Field>
            توضیحات / نقش
            <TextArea
              value={item.description || item.role || ""}
              onChange={(e) =>
                updateItem(
                  index,
                  props.variant === "team" ? "role" : "description",
                  e.target.value,
                )
              }
            />
          </Field>
          <Field>
            تصویر
            <Input
              value={item.imageUrl || ""}
              onChange={(e) => updateItem(index, "imageUrl", e.target.value)}
            />
          </Field>
          {props.variant !== "team" && props.variant !== "services" && (
            <Field>
              لوگو برند
              <Input
                value={item.logoUrl || ""}
                onChange={(e) => updateItem(index, "logoUrl", e.target.value)}
              />
            </Field>
          )}
        </SettingsItem>
      ))}

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

      <AdminButton
        $variant="primary"
        onClick={addItem}
        className={styles.addButton}
      >
        + افزودن آیتم
      </AdminButton>
    </>
  );
}
