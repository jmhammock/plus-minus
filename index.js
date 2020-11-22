function PlusMinus(num) {
    let nums = num.toString().split('').map(x => parseInt(x));
    nums.unshift(0);
    let graph = new Map();
    let tests = new Set();

    const buildGraph = () => {
        for (let i = nums.length - 1; i >= 0; i--) {
            const node = {
                weight: nums[i],
                left: typeof nums[i+1] !== "undefined" ? -nums[i+1] : null, 
                right: typeof nums[i+1] !== "undefined" ? nums[i+1] : null,
                depth: i
            }
            graph.set(nums[i], node);
            if (nums[i] !== 0) {
                graph.set(-nums[i], {...node, weight: -node.weight});
            }
        }
    }

    const traverseGraph = () => {
        let stack = [];
        let visted = [];
        let i = 0;
        stack.push(graph.get(0));
        while (stack.length > 0) {
            const node = stack.pop();
            visted[node.depth] = node.weight;
            if (node.depth === nums.length - 1) {
                const sum = visted.reduce((acc, curr) => acc + curr, 0);
                if (sum === 0) {
                    tests.add(visted.slice(1).join(''));
                }
            }
            if (node.left) {
                stack.push(graph.get(node.right));
                stack.push(graph.get(node.left));
            }
            i++;
        }
        console.log(i);
    }
    
    buildGraph();
    traverseGraph();
    console.log(tests);
}

PlusMinus(123456789);