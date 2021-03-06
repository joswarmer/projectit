export interface PiStyle {
    ":empty:before"?: PiStyle;
    ":empty"?: PiStyle;
    ":before"?: PiStyle;

    color?: string;
    opacity?: string;

    "font-weight"?: string;
    "font-size"?: string;

    border?: string;
    "border-style"?: string;
    "border-color"?: string;
    "border-radius"?: string;
    "border-width"?: string;

    "border-left"?: string;
    "border-right"?: string;
    "border-top"?: string;
    "border-bottom"?: string;
    "border-left-style"?: string;
    "border-right-style"?: string;
    "border-top-style"?: string;
    "border-bottom-style"?: string;
    "border-left-width"?: string;
    "border-right-width"?: string;
    "border-top-width"?: string;
    "border-bottom-width"?: string;

    "background"?: string;
    "background-color"?: string;

    "padding"?: string;
    "white-space"?: string;

    "margin"?: string;
    "margin-left"?: string;
    "margin-right"?: string;
    "margin-top"?: string;
    "margin-bottom"?: string;

    "grid-gap"?: string;
    content?: string;

    display?: string;
}

export function styleToCSS(style: PiStyle): string {
    let declarations = ''
    for (const property of Object.keys(style)) {
        if (property.startsWith(":")) {
            declarations += `/* ${property} */`
        } else {
            declarations += `${property}: ${style[property]};\n`;
        }
    }
    return declarations;
}
