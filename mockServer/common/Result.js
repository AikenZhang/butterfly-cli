export class Result {
    constructor ({
        code = '203200',
        result = [],
        errMsg = ''
    }) {
        this.code = code 
        this.result = result
        this.errMsg = errMsg
    } 
}