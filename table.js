class Table extends Map {
    getBlockNumbers(x, y) {
        const xBlockNumber = Math.floor((x - 1) / 3);
        const yBlockNumber = Math.floor((y - 1) / 3);
        const numbers = [];

        for (let x_ = xBlockNumber * 3 + 1; x_ < xBlockNumber * 3 + 4; x_++) {
            for (let y_ = yBlockNumber * 3 + 1; y_ < yBlockNumber * 3 + 4; y_++) {
                numbers.push(this.get(x_ * 10 + y_));
            }
        }
        return numbers;
    }

    getValidNumbers(x, y){
        const invalidNumbers = [...this.getBlockNumbers(x, y)];

        for (let y_ = 1; y_ <= 9; y_++) {
            const number = this.get(x * 10 + y_);
            if (number !== -1) invalidNumbers.push(number);
        }

        for (let x_ = 1; x_ <= 9; x_++) {
            const number = this.get(x_ * 10 + y);
            if (number !== -1) invalidNumbers.push(number);
        }

        return [1,2,3,4,5,6,7,8,9].filter(item => !(invalidNumbers.includes(item)));
    }

    isNotIllegal() {
        /* 非合法な表でないかチェックする */
        for (let x = 1; x <= 9; x++) {
            let n = 0;
            for (let y = 1; y <= 9; y++) {
                const number = this.get(x * 10 + y);
                if (number === -1) return false; /* -1 が含まれてるので失敗した表と判定 */
                n += number;
            }
            if (n !== 45) return false; /* 探索中の列に 1 ~ 9 すべてが含まれていないため */
        }

        for (let y = 1; y <= 9; y++) {
            let n = 0;
            for (let x = 1; x <= 9; x++) {
                const number = this.get(x * 10 + y);
                n += number;
            }
            if (n != 45) return false;
        }

        for (let xBlockNumber = 1; xBlockNumber <= 3; xBlockNumber++) {
            for (let yBlockNumber = 1; yBlockNumber <= 3; yBlockNumber++) {
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                const sum = this.getBlockNumbers(xBlockNumber, yBlockNumber).reduce(reducer);

                if (sum !== 45) return false;
            }
        }

        return true;
    }
}

export default Table;