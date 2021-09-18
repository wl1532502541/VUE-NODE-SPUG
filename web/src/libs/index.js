export const throttle = function(func, delay) {
    let prev = Date.now();
    // console.log('1')
    // console.log(prev)
    // console.log(Date.now())
    return (...args) =>{
        // let context = this;
        // let args = arguments;
        let now = Date.now();
        // console.log('4')
        if (now - prev >= delay) {
            // console.log('6')
            func.apply(this, ...args);
            prev = Date.now();
        }
    }
}
