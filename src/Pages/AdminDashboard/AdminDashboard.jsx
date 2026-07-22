import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBuilderStore } from "../../Store/pageStore";
import { AdminButton, Field, Input } from "../../Components/UI/UI";
import styles from "./AdminDashboard.module.css";

export function AdminDashboard() {
  const navigate = useNavigate();
  const {
    pages,
    loading,
    error,
    fetchPages,
    createPage,
    deletePage,
    clearError,
  } = useBuilderStore();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setSubmitting(true);
    try {
      const page = await createPage({ title: title.trim(), slug: slug.trim() });
      setTitle("");
      setSlug("");
      navigate(`/admin/pages/${page.id}`);
    } catch {
      /* error already in store */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>پنل مدیریت صفحات</h1>
            <p className={styles.subtitle}>
              ساخت، ویرایش و مدیریت صفحات وبسایت
            </p>
          </div>
          <AdminButton as={Link} to="/site" $variant="ghost">
            مشاهده سایت
          </AdminButton>
        </div>

        {error ? (
          <div
            className={`${styles.banner} ${styles.error}`}
            onClick={clearError}
          >
            {error}
          </div>
        ) : null}

        <form className={styles.form} onSubmit={handleCreate}>
          <Field>
            نام صفحه
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً درباره ما"
              required
            />
          </Field>
          <Field>
            Slug
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="about"
              required
            />
          </Field>
          <AdminButton type="submit" $variant="primary" disabled={submitting}>
            {submitting ? "در حال ایجاد..." : "ایجاد صفحه"}
          </AdminButton>
        </form>

        {loading ? (
          <div className={styles.banner}>در حال بارگذاری...</div>
        ) : null}

        <div className={styles.table}>
          {pages.map((page) => (
            <div className={styles.row} key={page.id}>
              <strong>{page.title}</strong>
              <span className={styles.meta}>/{page.slug}</span>
              <div className={styles.actions}>
                <AdminButton
                  as={Link}
                  to={page.slug === "home" ? "/site" : `/site/${page.slug}`}
                >
                  مشاهده
                </AdminButton>
                <AdminButton
                  as={Link}
                  to={`/admin/pages/${page.id}`}
                  $variant="primary"
                >
                  ویرایش
                </AdminButton>
                <AdminButton
                  $variant="danger"
                  onClick={async () => {
                    if (window.confirm(`صفحه «${page.title}» حذف شود؟`)) {
                      try {
                        await deletePage(page.id);
                      } catch {}
                    }
                  }}
                >
                  حذف
                </AdminButton>
              </div>
            </div>
          ))}
          {!loading && pages.length === 0 ? (
            <div className={styles.banner}>هنوز صفحه‌ای ساخته نشده است.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
