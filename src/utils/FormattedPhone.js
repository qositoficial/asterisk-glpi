export function formattedPhone(userPhone) {
    if (userPhone.startsWith("0")) {
        userPhone = userPhone.slice(1);
    }

    if (userPhone.length > 11 && userPhone.startsWith("55")) {
        userPhone = userPhone.slice(2);
    }

    const areaCode = userPhone.slice(0, 2);

    userPhone = userPhone.slice(2);

    const firstDigit = userPhone.charAt(0);

    const isMobile = ["7", "8", "9"].includes(firstDigit);

    if (isMobile && userPhone.length < 9) {
        userPhone = `9${userPhone}`;
    }

    return areaCode + userPhone;
}
