
export class SkiTimer {

    createTimeout(cb, intervalTime) {
        let _skiTimeOut = setTimeout(cb, intervalTime);
        return {
            skiTimeOut: _skiTimeOut,
            intervalTime: intervalTime,
            createdAt: new Date(),
            callBack: cb
        }
    }
}