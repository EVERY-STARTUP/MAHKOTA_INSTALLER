"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = generateUniqueId;
/* eslint-disable @typescript-eslint/space-before-function-paren */
function generateUniqueId() {
    // Kumpulan karakter untuk huruf besar dan angka
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = '';
    // Tambahkan dua huruf besar di awal
    for (let i = 0; i < 2; i++) {
        const randomLetterIndex = Math.floor(Math.random() * letters.length);
        id += letters.charAt(randomLetterIndex);
    }
    // Tambahkan tiga angka setelah huruf
    for (let i = 0; i < 3; i++) {
        const randomNumberIndex = Math.floor(Math.random() * numbers.length);
        id += numbers.charAt(randomNumberIndex);
    }
    return id;
}
