declare type typeArg = 'value' | 'text' | 'html' | 'src' | 'href';

declare interface ArgStatic {
    dom: string | HTMLElement;
    type?: typeArg;
}

declare interface CopyStatic {
    (arg: string | number | boolean | ArgStatic): boolean;
    version: string;
    init: Function;
}

declare const Copy: CopyStatic;

export default Copy;
