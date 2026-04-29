type NumberOrString = number | string;
type ScoresMap = Map<string, number>;

function greet(name: NumberOrString): string {
    let value: number;
    const name2 = "Sara";

    value = 9;

    const map: ScoresMap = new Map()
    return `Hello, ${name}!`;
}

console.log(greet(5));