import { getSectionDefinition } from "../../Sections/registry";
import styles from "./PageRenderer.module.css";

export function PageRenderer({
  sections = [],
  editable = false,
  selectedSectionId = null,
  onSelectSection,
}) {
  return (
    <div className={styles.pageRoot}>
      {sections.map((section) => {
        const definition = getSectionDefinition(section.type);
        if (!definition) {
          return (
            <div key={section.id} className={styles.unknownSection}>
              سکشن ناشناخته: {section.type}
            </div>
          );
        }

        const { Component } = definition;
        const selected = selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            className={`${styles.shell} ${editable ? styles.editableShell : ""} ${selected ? styles.selectedShell : ""}`}
            onClick={
              editable
                ? (event) => {
                    event.stopPropagation();
                    onSelectSection?.(section.id);
                  }
                : undefined
            }
          >
            {editable ? (
              <div className={styles.sectionLabel}>{definition.label}</div>
            ) : null}
            <Component data={section.data} />
          </div>
        );
      })}
    </div>
  );
}
