export const userResponseDto = (user) => {
    return {
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        cart: user.cart,
    };
};