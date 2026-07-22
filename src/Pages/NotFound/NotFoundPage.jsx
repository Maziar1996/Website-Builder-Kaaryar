import { Link } from "react-router-dom";
import { AdminButton } from "../../Components/UI/UI";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.stateBox}>
      <h2 className={styles.title}>صفحه‌ای یافت نشد</h2>
      <p className={styles.description}>
        آدرس درخواستی وجود ندارد یا به‌روزرسانی شده است.
      </p>
      <div className={styles.actions}>
        <AdminButton as={Link} to="/admin" $variant="primary">
          بازگشت به پنل
        </AdminButton>
        <AdminButton as={Link} to="/site">
          مشاهده سایت
        </AdminButton>
      </div>
    </div>
  );
}
