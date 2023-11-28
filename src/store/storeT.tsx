import create from 'zustand';

interface BoardStore {
    carousel: any;
    setCarousel: (text: any) => void;
    galleryData: any;
    setGalleryData: (text: any) => void;
    listData: any;
    setListData: (text: any) => void;
    postModalOn: any;
    setPostModalOn: (text: any) => void;
    detailModalOn: any;
    setDetailModalOn: (text: any) => void;
    gameModalOn: any;
    setGameModalOn: (text: any) => void;
    game2ModalOn: any;
    setGame2ModalOn: (text: any) => void;
    onePageData: any;
    setOnePageData: (text: any) => void;
    currentBoardName: any;
    setCurrentBoardName: (text: any) => void;
    signal: boolean;
    setSignal: (text: any) => void;
    updateModal: boolean;
    setUpdateModal: (text: any) => void;
    updatePostId: string;
    setUpdatePostId: (text: any) => void;
    orderKind: boolean;
    setOrderKind: (text: any) => void;
}

// Zustand 스토어 생성 및 초기 상태 정의
const BoardStore: any = create<BoardStore>((set) => ({
    carousel: [],
    setCarousel: (input: any) => set({ carousel: input }),
    galleryData: [],
    setGalleryData: (input: any) => set({ galleryData: input }),
    listData: [],
    setListData: (input: any) => set({ listData: input }),
    postModalOn: false,
    setPostModalOn: (input: any) => set({ postModalOn: input }),
    detailModalOn: false,
    setDetailModalOn: (input: any) => set({ detailModalOn: input }),
    gameModalOn: false,
    setGameModalOn: (input: any) => set({ gameModalOn: input }),
    game2ModalOn: false,
    setGame2ModalOn: (input: any) => set({ game2ModalOn: input }),
    onePageData: [],
    setOnePageData: (input: any) => set({ onePageData: input }),
    currentBoardName: '',
    setCurrentBoardName: (input: any) => set({ currentBoardName: input }),
    signal: false,
    setSignal: (input: any) => set({ signal: input }),
    updateModal: false,
    setUpdateModal: (input: any) => set({ updateModal: input }),
    updatePostId: '',
    setUpdatePostId: (input: any) => set({ updatePostId: input }),
    orderKind: false,
    setOrderKind: (input: any) => set({ orderKind: input }),
}));

export { BoardStore };
