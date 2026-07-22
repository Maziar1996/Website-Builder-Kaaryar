import { request } from "./client";

export const pagesApi = {
  getAll: () => request("/pages"),

  getById: (id) => request(`/pages/${id}`),

  getBySlug: async (slug) => {
    const pages = await request("/pages", { params: { slug } });
    if (!pages.length) {
      throw new Error("صفحه یافت نشد");
    }
    return pages[0];
  },

  create: (page) => request("/pages", { method: "POST", data: page }),

  update: (id, page) => request(`/pages/${id}`, { method: "PUT", data: page }),

  remove: (id) => request(`/pages/${id}`, { method: "DELETE" }),
};
