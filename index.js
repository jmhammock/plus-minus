function PlusMinus(num) {
    let nums = num.toString().split('').map(x => parseInt(x));
    nums.unshift(0);
    let graph = new Map();
    let passedTests = new Set();
    let src;

    const buildGraph = () => {
        let lastLeft = null;
        let lastRight = null;
        for (let i = nums.length - 1; i >= 0; i--) {
            const node = {
                weight: nums[i],
                left: lastLeft,
                right: lastRight,
                depth: i
            }
            const rightSymbol = Symbol();
            lastRight = rightSymbol;
            graph.set(rightSymbol, node);
            if (nums[i] !== 0) {
                const leftSymbol = Symbol();
                lastLeft = leftSymbol;
                graph.set(leftSymbol, {...node, weight: -node.weight});
            }
        }
        src = lastRight;
        console.log(graph);
    }

    const traverseGraph = () => {
        let stack = [];
        let visted = [];
        stack.push(graph.get(src));
        while (stack.length > 0) {
            const node = stack.pop();
            visted[node.depth] = node.weight;
            if (node.depth === nums.length - 1) {
                const sum = visted.reduce((acc, curr) => acc + curr, 0);
                if (sum === 0) {
                    passedTests.add(visted.slice(1).map(x => x < 0 ? '-' : '+').join(''));
                }
            }
            if (node.left) {
                stack.push(graph.get(node.right));
                stack.push(graph.get(node.left));
            }
        }
    }
    
    buildGraph();
    traverseGraph();
    console.log(passedTests);
}

PlusMinus(35132);