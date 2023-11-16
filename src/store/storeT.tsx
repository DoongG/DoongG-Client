import create from "zustand";

interface BoardStore {
  carousel: any;
  setCarousel: (text: any) => void;
  galleryData: any;
  setGalleryData: (text: any) => void;
  listData: any;
  setListData: (text: any) => void;
}

// Zustand 스토어 생성 및 초기 상태 정의
const BoardStore = create<BoardStore>((set) => ({
  carousel: [],
  setCarousel: (input: any) => set({ carousel: input }),
  galleryData: [],
  setGalleryData: (input: any) => set({ galleryData: input }),
  listData: [],
  setListData: (input: any) => set({ listData: input }),
}));

export { BoardStore };
