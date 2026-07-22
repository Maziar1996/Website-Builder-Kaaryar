import { create } from "zustand";
import { pagesApi } from "../Shared/API/pages.api";
import { createSection } from "../Sections/registry";
import { moveItem } from "../Shared/Utils/array";
import { normalizeSlug } from "../Shared/Utils/slug";

export const usePageStore = create((set, get) => ({
  pages: [],
  currentPage: null,
  selectedSectionId: null,
  loading: false,
  saving: false,
  error: null,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  selectSection: (id) => set({ selectedSectionId: id }),

  fetchPages: async () => {
    set({ loading: true, error: null });
    try {
      const pages = await pagesApi.getAll();
      set({ pages, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  fetchPageById: async (id) => {
    set({ loading: true, error: null, selectedSectionId: null });
    try {
      const page = await pagesApi.getById(id);
      set({ currentPage: page, loading: false });
      return page;
    } catch (error) {
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  createPage: async ({ title, slug }) => {
    set({ saving: true, error: null });
    try {
      const normalizedSlug = normalizePageSlug(slug);
      const page = await pagesApi.create({
        title,
        slug: normalizedSlug,
        sections: [
          createSection("header", {
            activeHref: normalizedSlug ? `/${normalizedSlug}` : "/",
          }),
          createSection("hero"),
          createSection("footer"),
        ],
      });

      set((state) => ({
        pages: [...state.pages, page],
        currentPage: page,
        saving: false,
      }));
      return page;
    } catch (error) {
      set({ saving: false, error: error.message });
      throw error;
    }
  },

  deletePage: async (id) => {
    set({ saving: true, error: null });
    try {
      await pagesApi.remove(id);
      set((state) => ({
        pages: state.pages.filter((page) => page.id !== id),
        currentPage: state.currentPage?.id === id ? null : state.currentPage,
        saving: false,
      }));
    } catch (error) {
      set({ saving: false, error: error.message });
      throw error;
    }
  },

  saveCurrentPage: async () => {
    const { currentPage } = get();
    if (!currentPage) return null;

    set({ saving: true, error: null });
    try {
      const updated = await pagesApi.update(currentPage.id, currentPage);
      set((state) => ({
        currentPage: updated,
        pages: state.pages.map((page) =>
          page.id === updated.id ? updated : page,
        ),
        saving: false,
      }));
      return updated;
    } catch (error) {
      set({ saving: false, error: error.message });
      throw error;
    }
  },

  updatePageMeta: (partial) => {
    set((state) => ({
      currentPage: state.currentPage
        ? { ...state.currentPage, ...partial }
        : null,
    }));
  },

  addSection: (type) => {
    const section = createSection(type);
    set((state) => {
      if (!state.currentPage) return state;
      return {
        currentPage: {
          ...state.currentPage,
          sections: [...state.currentPage.sections, section],
        },
        selectedSectionId: section.id,
      };
    });
  },

  removeSection: (sectionId) => {
    set((state) => {
      if (!state.currentPage) return state;
      return {
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.filter(
            (section) => section.id !== sectionId,
          ),
        },
        selectedSectionId:
          state.selectedSectionId === sectionId
            ? null
            : state.selectedSectionId,
      };
    });
  },

  moveSection: (sectionId, direction) => {
    set((state) => {
      if (!state.currentPage) return state;
      const index = state.currentPage.sections.findIndex(
        (section) => section.id === sectionId,
      );
      if (index < 0) return state;
      const toIndex = direction === "up" ? index - 1 : index + 1;
      return {
        currentPage: {
          ...state.currentPage,
          sections: moveItem(state.currentPage.sections, index, toIndex),
        },
      };
    });
  },

  updateSectionData: (sectionId, data) => {
    set((state) => {
      if (!state.currentPage) return state;
      return {
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.map((section) =>
            section.id === sectionId ? { ...section, data } : section,
          ),
        },
      };
    });
  },
}));

export const useBuilderStore = usePageStore;
