import Hls from 'hls.js';

export class CustomLoader extends Hls.DefaultConfig.loader {
  override load(context: any, config: any, callbacks: any): void {
    // Prüfe, ob die URL fälschlicherweise das Manifest als Basis enthält
    // z. B. wenn sie "index.m3u8/" enthält
    if (context.url.includes("index.m3u8/")) {
      // Entferne den "index.m3u8/" Teil, damit nur der Verzeichnis-Pfad übrig bleibt
      context.url = context.url.replace("index.m3u8/", "");
    }
    // Rufe den ursprünglichen Loader auf
    super.load(context, config, callbacks);
  }
}
