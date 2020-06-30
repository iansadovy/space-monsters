export class Resources {

  private static instance: Resources = null;

  private resourceCache: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
  private readyCallbacks: Function[] = [];

  constructor() {
    if (Resources.instance != null) {
      throw "Singleton";
    }
  }

  public static getInstance() {
    if (Resources.instance == null) {
      Resources.instance = new Resources();
    }
    return Resources.instance;
  }

  public load(urls: string | string[]) {
    if (urls instanceof Array) {
      for (const url of urls) {
        this._load(url);
      }
    } else {
      this._load(urls);
    }
  }

  private _load(url: string) {
    if (this.resourceCache[url]) {
      return this.resourceCache[url];
    }
    console.log("[Resources] loading...", url);
    const img = new Image();
    img.onload = () => {
      this.resourceCache[url] = img;
      console.log("[Resources] loaded", url);
      if (this.isReady) {
        console.log("[Resources] ready");
        for (const func of this.readyCallbacks) {
          func();
        }
      }
    };
    this.resourceCache[url] = false;
    img.src = url;
  }

  public get(url: string) {
    return this.resourceCache[url];
  }

  public get isReady(): boolean {
    var ready = true;
    for (var k in this.resourceCache) {
      if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  public set onReady(func) {
    this.readyCallbacks.push(func);
  }
}