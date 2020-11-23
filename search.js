import Table from './table.js';

const idToPoint = id => {
    const parsed = parseInt(id);
    const x = Math.floor(parsed / 10);
    const y = parsed % 10;
    return [x, y];
}

const setValidNumber = (currentTable, x, y) => {
    const entries = currentTable.entries();
    let lastId = 11;

    for (const [id, number] of entries) {
        if (number === -1 && id > x * 10 + y) {
            lastId = id;
            break; /* 最後に参照した地点まで移動した */
        }
        if (id == 99) {
            console.log(currentTable);
            if (currentTable.isNotIllegal()) return currentTable;
        }
    }
    console.log(currentTable);
    console.log(currentTable.getValidNumbers(...idToPoint(lastId)));

    for (const number of currentTable.getValidNumbers(...idToPoint(lastId))) {
        const clone = new Table(currentTable);
        clone.set(lastId, number); /* 試しに何か数字を入れる */
        const resolve = setValidNumber(clone, x, y);
        if (resolve) return resolve;
    }
}

self.addEventListener("message", e => {
    self.postMessage(setValidNumber(...e.data));
});
