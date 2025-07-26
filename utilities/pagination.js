"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    limit;
    offset;
    page;
    constructor(page, size = 10) {
        this.page = page;
        this.limit = size;
        this.offset = this.calculateOffset(page, size);
    }
    calculateOffset(page, size) {
        return page > 0 ? page * size : 0;
    }
    formatData(data) {
        const { count, rows } = data;
        const totalPages = Math.ceil(count / this.limit);
        return {
            totalItems: count,
            items: rows,
            totalPages,
            currentPage: this.page > 0 ? this.page : 0
        };
    }
}
exports.Pagination = Pagination;
