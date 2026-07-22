import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useBuilderStore } from "../../Store/pageStore";
import { PageRenderer } from "../../Components/PageRenderer/PageRenderer";
import {
  getSectionDefinition,
  listSectionTypes,
} from "../../Sections/registry";
import { AdminButton, Field, Input } from "../../Components/UI/UI";
import styles from "./PageEditor.module.css";

export function PageEditor() {
  const { id } = useParams();
  const {
    currentPage,
    selectedSectionId,
    loading,
    saving,
    error,
    fetchPageById,
    saveCurrentPage,
    updatePageMeta,
    addSection,
    removeSection,
    moveSection,
    updateSectionData,
    selectSection,
    clearError,
  } = useBuilderStore();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPageById(id).catch(() => {});
  }, [id, fetchPageById]);

  const selectedSection = useMemo(
    () => currentPage?.sections.find((s) => s.id === selectedSectionId),
    [currentPage?.sections, selectedSectionId],
  );

  const selectedDefinition = useMemo(
    () => (selectedSection ? getSectionDefinition(selectedSection.type) : null),
    [selectedSection],
  );
  const SettingsForm = selectedDefinition?.Settings;

  const handleSave = async () => {
    try {
      await saveCurrentPage();
      setMessage("تغییرات با موفقیت ذخیره شد.");
      setTimeout(() => setMessage(""), 2500);
    } catch {
      /* error already in store */
    }
  };

  if (loading && !currentPage) {
    return <div className={styles.banner}>در حال بارگذاری صفحه...</div>;
  }

  if (!currentPage) {
    return (
      <div className={styles.notFoundWrap}>
        <div className={`${styles.banner} ${styles.bannerError}`}>
          {error || "صفحه یافت نشد"}
        </div>
        <AdminButton as={Link} to="/admin">
          بازگشت
        </AdminButton>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.panel}>
        <div className={styles.toolbar}>
          <AdminButton as={Link} to="/admin">
            بازگشت
          </AdminButton>
          <AdminButton
            $variant="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "در حال ذخیره..." : "ذخیره"}
          </AdminButton>
        </div>

        <h2 className={styles.heading}>ویرایشگر بصری</h2>
        {error ? (
          <div
            className={`${styles.banner} ${styles.bannerError}`}
            onClick={clearError}
          >
            {error}
          </div>
        ) : null}
        {message ? <div className={styles.banner}>{message}</div> : null}

        <Field>
          عنوان صفحه
          <Input
            value={currentPage.title}
            onChange={(e) => updatePageMeta({ title: e.target.value })}
          />
        </Field>
        <Field>
          Slug
          <Input
            value={currentPage.slug}
            onChange={(e) => updatePageMeta({ slug: e.target.value })}
          />
        </Field>

        <h3 className={styles.sectionTitle}>سکشن‌ها</h3>
        {currentPage.sections.map((section, index) => {
          const definition = getSectionDefinition(section.type);
          return (
            <div
              key={section.id}
              className={`${styles.sectionItem} ${selectedSectionId === section.id ? styles.sectionItemActive : ""}`}
              onClick={() => selectSection(section.id)}
            >
              <strong>
                {index + 1}. {definition?.label || section.type}
              </strong>
              <div className={styles.row}>
                <AdminButton
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, "up");
                  }}
                  disabled={index === 0}
                >
                  ▲ بالا
                </AdminButton>
                <AdminButton
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, "down");
                  }}
                  disabled={index === currentPage.sections.length - 1}
                >
                  ▼ پایین
                </AdminButton>
                <AdminButton
                  $variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(section.id);
                  }}
                >
                  حذف
                </AdminButton>
              </div>
            </div>
          );
        })}

        <h3 className={styles.addSectionTitle}>افزودن سکشن</h3>
        <div className={styles.typeGrid}>
          {listSectionTypes().map((type) => (
            <button
              key={type.type}
              type="button"
              className={styles.typeCard}
              onClick={() => addSection(type.type)}
            >
              <strong>{type.label}</strong>
              <span>{type.description}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className={styles.preview} onClick={() => selectSection(null)}>
        <PageRenderer
          sections={currentPage.sections}
          editable
          selectedSectionId={selectedSectionId}
          onSelectSection={selectSection}
        />
      </main>

      <aside className={styles.panel}>
        <h3 className={styles.heading}>تنظیمات سکشن</h3>
        {!selectedSection || !SettingsForm ? (
          <div className={styles.banner}>
            یک سکشن را انتخاب کنید تا فرم تنظیمات باز شود.
          </div>
        ) : (
          <>
            <div className={styles.banner}>
              در حال ویرایش: <strong>{selectedDefinition.label}</strong>
            </div>
            <SettingsForm
              data={selectedSection.data}
              onChange={(data) => updateSectionData(selectedSection.id, data)}
            />
          </>
        )}
      </aside>
    </div>
  );
}
