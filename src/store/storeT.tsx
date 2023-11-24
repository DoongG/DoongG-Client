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
    onePageData: any;
    setOnePageData: (text: any) => void;
    currentBoardName: any;
    setCurrentBoardName: (text: any) => void;
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
    onePageData: [],
    setOnePageData: (input: any) => set({ onePageData: input }),
    currentBoardName: '',
    setCurrentBoardName: (input: any) => set({ currentBoardName: input }),
}));

export { BoardStore };
