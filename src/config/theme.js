import { FormTrash } from "grommet-icons";
import { TbCaretDown, TbCaretUp } from "react-icons/tb";
import { css } from "styled-components";

const checkboxCheckStyle = css`
  background-color: #ff5a01;
  border-color: #ff5a01;
`;

export const DEFAULT_THEME = {
    global: {
        colors: {
            "brand": {
                "dark": "#ff5a01",
                "light": "#85cf81"
            },
            "background": {
                "dark": "#0a0a0a",
                "light": "#FFFFFF"
            },
            "background-back": {
                "dark": "#101116",
                "light": "#EEEEEE"
            },
            "background-front": {
                "dark": "#1c1d24",
                "light": "#FFFFFF"
            },
            "background-contrast": {
                "dark": "#FFFFFF11",
                "light": "#0a0a0a11"
            },
            "text": {
                "dark": "#EEEEEE",
                "light": "#333333"
            },
            "text-strong": {
                "dark": "#FFFFFF",
                "light": "#000000"
            },
            "text-weak": {
                "dark": "#CCCCCC",
                "light": "#444444"
            },
            "text-xweak": {
                "dark": "#999999",
                "light": "#666666"
            },
            "border": {
                "dark": "#1c1d24",
                "light": "#CCCCCC"
            },
            "control": "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning",
            "focus": "brand",
        },
        font: {
            family: "Poppins"
        },
        active: {
            background: "active-background",
            color: "active-text"
        },
        hover: {
            background: "active-background",
            color: "active-text"
        },
        selected: {
            background: "selected-background",
            color: "selected-text"
        },
        control: {
            border: {
                radius: "24px",
            },
        },
    },
    chart: {},
    diagram: {
        line: {}
    },
    meter: {},
    layer: {
        background: {
            dark: "#0a0a0a",
            light: "#FFFFFF"
        }
    },
    formField: {
        border: {
            color: "active-background",
            error: {
                color: {
                    dark: "white",
                    light: "status-critical"
                }
            },
            position: "inner",
            side: "bottom"
        },
        content: {
            pad: "small"
        },
        disabled: {
            background: {
                color: "status-disabled",
                opacity: "medium"
            }
        },
        error: {
            color: "status-critical",
            margin: {
                vertical: "xsmall",
                horizontal: "small"
            }
        },
        help: {
            color: "dark-3",
            margin: {
                start: "small"
            }
        },
        info: {
            color: "text-xweak",
            margin: {
                vertical: "xsmall",
                horizontal: "small"
            }
        },
        label: {
            margin: {
                vertical: "xsmall",
                horizontal: "none"
            },
        },
        margin: {
            bottom: "small"
        }
    },
    tab: {
        margin: "xsmall",
        pad: {
            horizontal: "large",
        },
        active: {
            color: "brand",
        },
        color: {
            "dark": "white",
            "light": "dark-1"
        },
        hover: {
            color: "brand"

        },
        border: {
            side: "bottom",
            size: "small",
            color: {
                dark: "white",
                light: "dark-1"
            },
            active: {
                color: {
                    dark: "brand",
                    light: "brand"
                }
            },
            disabled: {},
            hover: {
                color: {
                    dark: "white",
                    light: "dark-1"
                }
            }
        }
    },
    fileInput: {
        background: "background-front",
        pad: {
            horizontal: "medium",
            vertical: "xsmall"
        },
        round: "medium",
        border: {
            size: "xsmall",
        },
        icons: {
            remove: FormTrash,
        },
        label: {
            text: {
                size: "small",
            },
        },
        message: {
            size: "small",
        },
        button: {
            color: "brand",
            extend: () => `
                font-size: 14px;
            `,
        },
        extend: () => `
            height: 100%;
        `,
    },
    select: {
        control: {
            extend: "padding: 0 6px; background-color: #1c1d24; border-radius: 24px;",
            open: {
                background: "background-front",
                border: "1px solid #ff5a01",
            },
        },
        container: {
            text: {
                size: "small",
            },
        },
        options: {
            container: {
                background: "background-front",
            },
            text: {
                size: "small",
            }
        },
        icons: {
            down: <TbCaretDown />,
            up: <TbCaretUp />,
        },
    },
    // select: {
    //     background: "background-front",
    //     control: {
    //         // extend: "padding: 0 12px;",
    //     },
    //     // "container": {
    //     //     "extend": {
    //     //         "text": {
    //     //             "size": "small",
    //     //         },
    //     //     },
    //     // },
    //     options: {
    //         text: {
    //             size: "14px",
    //             margin: {
    //                 horizontal : "12px",
    //             }
    //         }
    //     },
    // },
    textInput: {
        container: {
            extend: () => `
                background: #1c1d24;
                border-radius: 24px;
            `
        },
        placeholder: {
            extend: () => `
                color: #cccccc;
            `,
        },
    },
    checkBox: {
        border: {
            color: {
                dark: "brand",
            },
        },
        color: {
            dark: "#eeeeee",
        },
        check: {
            radius: "2px",
        },
        hover: {
            border: {
                color: undefined,
            },
        },
        toggle: {
            background: "background",
            color: {
                dark: "#eeeeee"
            },
            size: "36px",
            knob: {
                extend: `
                    top: -3px;
                    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);
                `,
            },
            extend: ({ checked }) => `
                height: 16px;
                box-shadow: none !important;
                ${checked && checkboxCheckStyle}
            `,
        },
        gap: "xsmall",
        size: "18px",
    },
};
