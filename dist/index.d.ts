import { type Plugin } from 'vite';
interface BaseOptions {
    devEnable?: boolean;
    css?: string;
    loadingText?: string;
    debounce?: number;
}
export interface TextLoading extends BaseOptions {
    type: 'text';
}
export interface ImageLoading extends BaseOptions {
    type: 'img';
    src: string;
}
interface _SvgLoading extends BaseOptions {
    type: 'svg';
    svgContent?: string;
    path?: string;
}
export declare type SvgLoading = _SvgLoading & ({
    svg: string;
} | {
    src: string;
});
export declare type Options = TextLoading | ImageLoading | SvgLoading;
export declare function viteAppLoading(options?: Options): Plugin;
export {};
