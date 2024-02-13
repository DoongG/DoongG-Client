// 할인률 구하는 함수
export default function calculateDiscountRate(
    originalPrice: number,
    discountedPrice: number,
) {
    // 원래 가격과 할인된 가격을 이용하여 할인률을 계산합니다.
    const discountAmount = originalPrice - discountedPrice;
    const discountRate = (discountAmount / originalPrice) * 100;
    return discountRate;
}
