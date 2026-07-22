import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pagesApi } from "../../Shared/API/pages.api";
import { PageRenderer } from "../../Components/PageRenderer/PageRenderer";
import { AdminButton } from "../../Components/UI/UI";
import styles from "./PublicPage.module.css";

export function PublicPage() {
  const params = useParams();
  const slug = params.slug || "home";
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    pagesApi
      .getBySlug(slug)
      .then((data) => {
        if (active) setPage(data);
      })
      .catch((error) => {
        if (active) setError(error.message || "خطا در دریافت صفحه");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <div className={styles.stateBox}>در حال بارگذاری صفحه...</div>;
  }

  if (error || !page) {
    return (
      <div className={styles.stateBox}>
        <h2 className={styles.title}>صفحه پیدا نشد</h2>
        <p className={styles.description}>{error || `slug: ${slug}`}</p>
        <div className={styles.actions}>
          <AdminButton as={Link} to="/site" $variant="primary">
            صفحه اصلی
          </AdminButton>
          <AdminButton as={Link} to="/admin">
            پنل ادمین
          </AdminButton>
        </div>
      </div>
    );
  }

  return <PageRenderer sections={page.sections} />;
}
