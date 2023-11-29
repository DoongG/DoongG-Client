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

//_______________________________________________________________________________________________
// 방 리뷰 페이지 리뷰달기, 전체 리뷰 보기 버튼 상태
interface buttonStroe {
    button: boolean;
    setButton: (isButton: boolean) => void;
}

const useButtonStore = create<buttonStroe>((set) => ({
    button: true,
    setButton: (isButton) => set({ button: isButton }),
}));

export { useButtonStore };

//____________________________________________________________________________________________________-
// DB로 보낼 주소, 위도, 경도
interface ReviewDateStore {
    address: string;
    mylat: number;
    mylng: number;
    setAddress: (state: string) => void;
    setMylat: (state: number) => void;
    setMylng: (state: number) => void;
}
const useReviewDateStore = create<ReviewDateStore>((set) => ({
    address: '',
    mylat: 0,
    mylng: 0,
    setAddress: (state) => set({ address: state }),
    setMylat: (state) => set({ mylat: state }),
    setMylng: (state) => set({ mylng: state }),
}));

export { useReviewDateStore };
