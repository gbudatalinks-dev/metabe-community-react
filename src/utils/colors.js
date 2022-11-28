export function getRankColor(rank) {
    return rank > 10000 ? "#FF5A01" : (rank > 1000 ? "#18E086" : (rank > 100 ? "#00C1F2" : "#EFE81A"));
}
