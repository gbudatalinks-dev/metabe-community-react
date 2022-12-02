export function calGridCol(windowWidth, landscape, gutter) {
    const margin = (landscape ? 122 : 48);
    const cols = (windowWidth > 1200 ? 5 : (windowWidth > 900 ? 4 : (windowWidth > 640 ? 3 : (windowWidth > 480 ? 2 : 1))));
    return (windowWidth - margin - gutter * cols) / cols;
}
