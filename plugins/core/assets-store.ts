export type Image = HTMLImageElement;

const loadImage = async (url: string) => new Promise<Image>((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);

    img.src = url;
});

export default class AssetsStore {
    private store = new Map<string, Image>();
    private status = { loaded: 0, all: 0 };

    public add = async (name: string, url: string) => {
        this.status.all++;
        const img = await loadImage(url);
        
        this.store.set(name, img);
        this.status.loaded++;
    };

    public get = (name: string) => {
        return this.store.get(name) || null;
    };
};
