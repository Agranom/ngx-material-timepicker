export namespace Time {
    export const HOURS = Array(24).fill(1).map((v, i) => {
        const angleStep = 30;
        const time = v + i;
        const angle = angleStep * time;
        return {time: time === 24 ? '00' : time, angle};
    });
}
