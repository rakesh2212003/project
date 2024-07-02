export const isEmpty = (str) => {
    const regex = /^$/;
    return regex.test(str);
};

export const isValidEmail = (str) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
};

export const isValidPassword = (str) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(str);
};

export const isValidUsername = (str) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(str);
};
