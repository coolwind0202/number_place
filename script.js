import Table from './table.js';

const root = document.querySelector(".root");

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const div = document.createElement("div");
        div.classList.add("inputWrapper");
        div.contentEditable = "true";
        div.id = `${j + 1}${i + 1}`;

        // div.innerHTML = test[i][j];

        div.addEventListener("input", () => {
            const parsed = parseInt(div.innerHTML);

            if (Number.isNaN(parsed)) {
                alert("入力できるのは数値のみです。");
                div.innerHTML = "";
                return;
            }
            if (parsed < 1 || 9 < parsed) {
                alert("入力できるのは 1 ~ 9 の数値のみです。");
                div.innerHTML = "";
                return;
            }
        });
        root.appendChild(div);
    }
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {

    console.log("探索中");
    const idToPoint = id => {
        const parsed = parseInt(id);
        const x = Math.floor(parsed / 10);
        const y = parsed % 10;
        return [x, y];
    }

    /* 入力値の受け取り */
    const table = new Table();

    for (const node of root.querySelectorAll(".inputWrapper")) {
        const [x, y] = idToPoint(node.id);

        table.set(x * 10 + y, node.innerHTML !== "" ? parseInt(node.innerHTML) : -1); /* (i,j) から (x, y)に変更 */
    }

    const worker = new Worker("./search.js", {type:"module"});
    worker.addEventListener("message", e => {
        const resolve = e.data;
        if (resolve) {
            const inputs = document.querySelectorAll(".inputWrapper");
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const [x, y] = [j + 1, i + 1];
                    inputs[i * 9 + j].innerHTML = resolve.get(x * 10 + y);
                }
            }
        }
    });
    worker.postMessage([new Table(table), 1, 1]);
    console.log(new Table(table));
});
