import create from 'zustand';

// 스토어의 상태를 나타내는 인터페이스 정의
interface ShoppingHeaderSelectBarStore {
    selectButton: string;
    setSelectButton: (text: string) => void;
}

// Zustand 스토어 생성 및 초기 상태 정의
const useShoppingHeaderSelectBarStore = create<ShoppingHeaderSelectBarStore>(
    (set) => ({
        selectButton: '최근',
        setSelectButton: (text) => set({ selectButton: text }),
    }),
);

export default useShoppingHeaderSelectBarStore;
