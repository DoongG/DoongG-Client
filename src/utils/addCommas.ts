// 천 단위 쉼표 추가 함수
export default function addCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
