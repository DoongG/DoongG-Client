import create from 'zustand';

// 스토어의 상태를 나타내는 인터페이스 정의
interface ShoppingHeaderSelectBarStore {
    // 상품 케러셀의 유형 state
    selectButton: string;
    setSelectButton: (text: string) => void;
    // 상품 상세 페이지의 모달 state
}

// Zustand 스토어 생성 및 초기 상태 정의
const useShoppingHeaderSelectBarStore = create<ShoppingHeaderSelectBarStore>(
    (set) => ({
        selectButton: '최근',
        setSelectButton: (text) => set({ selectButton: text }),
    }),
);

//_______________________________________________________________________________________________

// 제품 상세 모달 상태
interface ModalStore {
    isOpenModal: boolean;
    setOpenModal: (isOpen: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
    isOpenModal: false,
    setOpenModal: (isOpen) => set({ isOpenModal: isOpen }),
}));

export { useShoppingHeaderSelectBarStore, useModalStore };

//_______________________________________________________________________________________________-

// 제품 상세 모달 설명,리뷰 상태
interface ShoppingDetailSelectBarStore {
    isSelect: string;
    setIsSelect: (select: string) => void;
}

const useShoppingDetailSelectBarStore = create<ShoppingDetailSelectBarStore>(
    (set) => ({
        isSelect: '설명',
        setIsSelect: (select) => set({ isSelect: select }),
    }),
);

export { useShoppingDetailSelectBarStore };

//_________________________________________________________________________________________________
// 제품 결제 페이지 모달
interface ModalBuyStore {
    isOpenBuyModal: boolean;
    setIsOpenBuyModal: (isOpen: boolean) => void;
}

const useBuyModalStore = create<ModalBuyStore>((set) => ({
    isOpenBuyModal: false,
    setIsOpenBuyModal: (isOpen) => set({ isOpenBuyModal: isOpen }),
}));

export { useBuyModalStore };
