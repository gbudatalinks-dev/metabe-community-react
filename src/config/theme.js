import { FormTrash } from "grommet-icons";

export const DEFAULT_THEME = {
    global: {
        "colors": {
            "brand": {
                "dark": "#ff5a01",
                "light": "#85cf81"
            },
            "background": {
                "dark": "#0a0a0a",
                "light": "#FFFFFF"
            },
            "background-back": {
                "dark": "#0a0a0a",
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
            "focus": "brand"
        },
        "font": {
            "family": "Poppins"
        },
        "active": {
            "background": "active-background",
            "color": "active-text"
        },
        "hover": {
            "background": "active-background",
            "color": "active-text"
        },
        "selected": {
            "background": "selected-background",
            "color": "selected-text"
        },
        "control": {
            "border": {
                "radius": "24px",
            },
        },
    },
    "chart": {},
    "diagram": {
        "line": {}
    },
    "meter": {},
    "layer": {
        "background": {
            "dark": "#0a0a0a",
            "light": "#FFFFFF"
        }
    },
    "formField": {
        "border": {
            "color": "active-background",
            "error": {
                "color": {
                    "dark": "white",
                    "light": "status-critical"
                }
            },
            "position": "inner",
            "side": "bottom"
        },
        "content": {
            "pad": "small"
        },
        "disabled": {
            "background": {
                "color": "status-disabled",
                "opacity": "medium"
            }
        },
        "error": {
            "color": "status-critical",
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "help": {
            "color": "dark-3",
            "margin": {
                "start": "small"
            }
        },
        "info": {
            "color": "text-xweak",
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "label": {
            "margin": {
                "vertical": "xsmall",
                "horizontal": "none"
            },
        },
        "margin": {
            "bottom": "small"
        }
    },
    "tab": {
        "margin": "xsmall",
        "border": {
            "side": "bottom",
            "size": "small",
            "color": {
                "dark": "accent-1",
                "light": "brand"
            },
            "active": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            },
            "disabled": {},
            "hover": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            }
        }
    },
    "fileInput": {
        "pad": {
            "horizontal": "medium",
            "vertical": "xsmall"
        },
        "round": "large",
        "border": {
            "size": "xsmall",
        },
        "icons": {
            "remove": FormTrash,
        }
    },
    "select": {
        "control": {
            "extend": "padding: 0 12px;",
        },
        // "container": {
        //     "extend": {
        //         "text": {
        //             "size": "small",
        //         },
        //     },
        // },
        "options": {
            "text": {
                "size": "16px",
                "margin": {
                    "horizontal" : "12px",
                }
            }
        },
    },
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
    }
};
