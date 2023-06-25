const parseArgs = () => {
    const argsArr = [];
    for (let i = 2; i < process.argv.length; i += 2) {
        const propName = process.argv[i].slice(2);
        const value = process.argv[i + 1];
        argsArr.push(`${propName} is ${value}`);
    }
    console.log(argsArr.join(', '));
};

parseArgs();