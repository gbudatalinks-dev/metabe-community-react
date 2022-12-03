import { Text } from "grommet";
import { randomNumberInRange } from "../utils/numbers";

export const USERS = [
    { uid: 0, avatar: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRjyV6aufEiVlt_Jpu7io7LcQpp-weqg-iFIn2GoR5X7jjzvHhck05_alsHCnGc4Qgt", name: "Amanda Seyfried", isMe: false, },
    { uid: 1, avatar: "https://img.seoul.co.kr/img/upload/2017/08/17/SSI_20170817084646_O2.jpg", name: "Thomas Cruise", isMe: false, },
    { uid: 2, avatar: "https://www.fortressofsolitude.co.za/wp-content/uploads/2022/10/It-Looks-Like-Robert-Downey-Jr.s-Iron-Man-Might-Return-Afterall.jpg", name: "Robert Downey Jr.", isMe: false, },
    { uid: 3, avatar: "https://m.media-amazon.com/images/I/61ErzMkRcXL._AC_SL1000_.jpg", name: "Dwayne Johnson", isMe: false, },
    { uid: 4, avatar: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1357391978.jpg", name: "Jennifer Lawrence", isMe: false, },
    { uid: 5, avatar: "https://variety.com/wp-content/uploads/2021/10/Daniel-Craig.jpg", name: "Daniel Craig", isMe: false, },
    { uid: 6, avatar: "https://movieplayer.net-cdn.it/t/images/2022/10/20/anne-hathaway_jpg_1280x720_crop_q85.jpg", name: "Anne Hathaway", isMe: false, },
];

export const CURRENT_USER = {
    uid: 7, avatar: "https://lh3.googleusercontent.com/a/AItbvml-LQvxDrF5PrgyKULh9UDPhJZmQxeouyDitXRe=s96-c", name: "Myeongkoo KANG", isMe: true,
};

export function getItems(nextGroupKey, count, deviation) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({
            groupKey: nextGroupKey,
            key: nextKey + i,
            uid: nextKey + i - deviation * count,
            type: "이미지",
            cover: `https://naver.github.io/egjs-infinitegrid/assets/image/${(nextKey + i % 33) + 1}.jpg`,
            name: `App Name ${nextKey + i}`,
            tags: ["이미지", "테스트", "앱", "태그", "준비중"],
            description: <Text size={"small"}>설명을 위한 공간...</Text>,
            playCount: randomNumberInRange(0, 3000),
            commentCount: 0,
            likeCount: randomNumberInRange(0, 1200),
            user: USERS[randomNumberInRange(0, 6)],
        });
    }
    return nextItems;
}
