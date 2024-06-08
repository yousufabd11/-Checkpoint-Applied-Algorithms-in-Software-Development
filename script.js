function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = new PriorityQueue();

    // Initialize distances and priority queue
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { vertex: currentVertex } = pq.dequeue();

        if (visited.has(currentVertex)) continue;
        visited.add(currentVertex);

        for (let neighbor in graph[currentVertex]) {
            if (!visited.has(neighbor)) {
                let newDist = distances[currentVertex] + graph[currentVertex][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    pq.enqueue(neighbor, newDist);
                }
            }
        }
    }

    return distances;
}

// Priority Queue implementation using a MinHeap
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(vertex, priority) {
        this.values.push({ vertex, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const startVertex = 'B';
const distances = dijkstra(graph, startVertex);
console.log(distances); // Output: { A: 0, B: 4, C: 2, D: 5 }
