// ========================================
// TEST HELPERS ===========================
// ========================================
module.exports.rejectPromise = (arg) => {
    return jest.fn(() => new Promise((resolve, reject) => {
        reject(arg);
    }));
};

module.exports.resolvePromise = (arg) => {
    return jest.fn(() => new Promise((resolve, reject) => {
        resolve(arg);
    }));
};
