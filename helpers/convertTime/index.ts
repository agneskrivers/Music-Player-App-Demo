// Interface
interface ConvertTime {
    (time: number): string;
}

const Index: ConvertTime = time => {
    const timeSeconds = Math.floor(time / 1000);

    const seconds = timeSeconds % 60;
    const minutes = (timeSeconds - seconds) / 60;

    const secondString = seconds < 10 ? `0${seconds}` : seconds.toString();
    const minuteString = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${minuteString}:${secondString}`;
};

export default Index;
