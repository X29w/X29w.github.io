/**
 * @description [zh-CN] 检测当前浏览器是否支持 WebGL 渲染。在任何错误或非浏览器环境中返回 false。
 * @description [en] Detects whether the current browser supports WebGL rendering. Returns false on any error or when running in a non-browser environment.
 * @description [ja] 現在のブラウザが WebGL レンダリングをサポートしているかを検出する。エラー発生時や非ブラウザ環境では false を返す。
 * @description [zh-TW] 檢測當前瀏覽器是否支援 WebGL 渲染。在任何錯誤或非瀏覽器環境中返回 false。
 */
export const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};
