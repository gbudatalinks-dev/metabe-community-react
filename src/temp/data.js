import { Text } from "grommet";

import { utcDateTime } from "../utils/datetime";

function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const USERS = [
    {
        uid: 0,
        photoURL: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA5MjhfNTkg%2FMDAxNTM4MTE0NDE4OTQz.2uDNIV4nZWhT3zLSx5ITI3XTM50nB2rGH562yTUGe68g.eAgvknHkx7u_-ojf3kr-DCnDQQy5qAKFFOwF3eTvxpEg.JPEG.chcir77%2FPSX_20180829_164913.jpg&type=sc960_832",
        name: "Amanda Seyfried",
        tags: ["Actress", "MammaMia!", "LesMisérables", "TheDropout"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 1,
        photoURL: "https://img.seoul.co.kr/img/upload/2017/08/17/SSI_20170817084646_O2.jpg",
        name: "Thomas Cruise",
        tags: ["Actor", "Scientology", "TopGun", "Mission:Impossible", "톰아저씨", "ILoveKorea"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 2,
        photoURL: "https://www.fortressofsolitude.co.za/wp-content/uploads/2022/10/It-Looks-Like-Robert-Downey-Jr.s-Iron-Man-Might-Return-Afterall.jpg",
        name: "Robert Downey Jr.",
        tags: ["IronMan", "SherlockHolmes", "TheAvengers"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 3,
        photoURL: "https://assets.rebelmouse.io/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yOTA1NTMzOC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTcyNjc4MzAzNn0.hcC3c-3UX8vsSNwzScRXbej_BhOAX11mhrrGrumCbKc/img.jpg?width=1200&height=800&quality=85&coordinates=106%2C0%2C148%2C0",
        name: "Dwayne Johnson",
        tags: ["TheRock", "WWE", "Actor", "TheFast"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 4,
        photoURL: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1357391978.jpg?crop=1xw:0.6666666666666666xh;center,top&resize=640:*",
        name: "Jennifer Lawrence",
        tags: ["Actress", "TheHungerGames", "X-MEN"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 5,
        photoURL: "https://variety.com/wp-content/uploads/2021/10/Daniel-Craig.jpg",
        name: "Daniel Craig",
        tags: ["Actor", "JamesBond", "007"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 6,
        photoURL: "https://d.newsweek.com/en/full/1964096/margot-robbie-lookalike-anastasyia-prichinina.jpg",
        name: "Margot Robbie",
        tags: ["Actress", "HarleyQuinn", "Tonya", "Luckychap"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
    {
        uid: 7,
        photoURL: "https://movieplayer.net-cdn.it/t/images/2022/10/20/anne-hathaway_jpg_1280x720_crop_q85.jpg",
        name: "Anne Hathaway",
        tags: ["Actress", "ThePrincessDiaries", "TheDevil", "Prada", "Intern"],
        rank: randomNumberInRange(0, 12000),
        appCount: randomNumberInRange(5, 20),
        subscriberCount: randomNumberInRange(10, 2000),
        playCount: randomNumberInRange(10, 10000),
        likeCount: randomNumberInRange(10, 1000),
        datetime: "20221205130537979",
        isMe: false,
    },
];

export const CURRENT_USER = {
    uid: 8,
    photoURL: "https://lh3.googleusercontent.com/a/AItbvml-LQvxDrF5PrgyKULh9UDPhJZmQxeouyDitXRe=s96-c",
    name: "Myeongkoo KANG",
    tags: ["GBUDatalinks", "AI", "APPS"],
    rank: randomNumberInRange(0, 12000),
    appCount: randomNumberInRange(5, 20),
    subscriberCount: randomNumberInRange(10, 2000),
    playCount: randomNumberInRange(10, 10000),
    likeCount: randomNumberInRange(10, 1000),
    datetime: "20221205130537979",
    isMe: true,
};

export function getItems(nextGroupKey, count, mine) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        const datetime = utcDateTime();
        nextItems.push({
            groupKey: nextGroupKey,
            uid: nextKey + i,
            type: "이미지",
            cover: `https://naver.github.io/egjs-infinitegrid/assets/image/${(nextKey + i % 33) + 1}.jpg`,
            name: `App Name ${nextKey + i}`,
            tags: ["이미지", "테스트", "앱", "태그", "준비중"],
            description: <Text size={"small"}>설명을 위한 공간...</Text>,
            playCount: randomNumberInRange(0, 3000),
            commentCount: 0,
            likeCount: randomNumberInRange(0, 1200),
            user: mine ? CURRENT_USER : USERS[randomNumberInRange(0, 7)],
            created: datetime,
            updated: datetime,
        });
    }

    return nextItems;
}
