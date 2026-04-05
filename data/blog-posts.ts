import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-http-server-cpp",
    title: "Building an HTTP Server from Scratch in C++",
    date: "2026-03-15",
    tags: ["C++", "Systems", "Networking", "HTTP"],
    excerpt:
      "Diving deep into socket programming, HTTP request parsing, and protocol-level understanding — all without any framework.",
    content: `## Why Build an HTTP Server from Scratch?

Most backend developers use frameworks like Express, FastAPI, or Spring Boot — and that's fine. But understanding what happens *under the hood* separates good engineers from great ones.

I built a lightweight HTTP server in C++ that handles real HTTP/1.1 requests, parses headers, and serves static responses. Here's what I learned.

## The Core Architecture

\`\`\`cpp
// The three pillars of our server:
// 1. Socket creation and binding
// 2. Request parsing
// 3. Response formatting

int server_fd = socket(AF_INET, SOCK_STREAM, 0);
setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
bind(server_fd, (struct sockaddr *)&address, sizeof(address));
listen(server_fd, 3);
\`\`\`

## Parsing HTTP Requests

An HTTP request is just text — but structured text. The format is:

\`\`\`
GET /index.html HTTP/1.1
Host: localhost:8080
Accept: text/html
(blank line)
(optional body)
\`\`\`

My parser reads the socket stream byte-by-byte, identifies the request line, headers, and body delimiter.

## Key Challenges

**1. Handling Persistent Connections** — HTTP/1.1 defaults to keep-alive. This means you can't just close the socket after one response; you need to loop and wait for the next request.

**2. Partial Reads** — Network calls don't guarantee you'll get all the data in one \`recv()\`. You must loop until the full request is received.

**3. Concurrency** — A single-threaded server blocks on one connection. I experimented with \`fork()\` and later with a simple thread pool.

## What I Learned

- **TCP is a stream, not a packet protocol** — You receive bytes, not messages.
- **HTTP is beautifully simple** — Its text-based format is extremely readable.
- **Buffering matters** — Naive I/O is slow. Smart buffering makes a 10x difference.

**GitHub**: [animesh-94/HTTP-server-in-C-](https://github.com/animesh-94/HTTP-server-in-C-)
`,
  },
  {
    slug: "openmp-parallel-algorithms",
    title: "OpenMP Parallel Algorithms: BFS, Merge Sort, Matrix Multiply",
    date: "2026-02-28",
    tags: ["C++", "Parallel Computing", "OpenMP", "Algorithms"],
    excerpt:
      "Implementing and benchmarking sequential vs parallel algorithms using OpenMP — measuring real speedup on multi-core hardware.",
    content: `## The Problem with Single-Core Thinking

Most DSA courses teach algorithms assuming sequential execution. But modern CPUs have 8, 16, even 32+ cores — and we're barely using them.

OpenMP is a pragma-based API that lets you parallelize C++ loops with a single line of code. Let me show you what I built.

## Parallel BFS

Standard BFS uses a queue and processes nodes level by level. The challenge: how do you parallelize a queue-based algorithm?

**Key insight**: All nodes at the same BFS level are independent of each other.

\`\`\`cpp
// Parallel frontier expansion
#pragma omp parallel for schedule(dynamic, 16)
for (int i = 0; i < frontier.size(); i++) {
    int u = frontier[i];
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            #pragma omp critical
            { next_frontier.push_back(v); dist[v] = dist[u] + 1; }
        }
    }
}
\`\`\`

**Result**: 3.2x speedup on a 4-core machine for a graph with 1M nodes.

## Parallel Merge Sort

The divide step of merge sort is embarrassingly parallel — left and right halves are completely independent.

\`\`\`cpp
void parallel_merge_sort(vector<int>& arr, int l, int r) {
    if (r - l < THRESHOLD) { sequential_sort(arr, l, r); return; }
    int mid = (l + r) / 2;
    #pragma omp parallel sections
    {
        #pragma omp section
        parallel_merge_sort(arr, l, mid);
        #pragma omp section
        parallel_merge_sort(arr, mid+1, r);
    }
    merge(arr, l, mid, r);
}
\`\`\`

**Result**: 2.8x speedup for 10M elements.

## Benchmarks

| Algorithm | Sequential | Parallel (4 cores) | Speedup |
|---|---|---|---|
| BFS (1M nodes) | 840ms | 263ms | 3.2x |
| Merge Sort (10M) | 3200ms | 1143ms | 2.8x |
| Matrix Mult (1024x1024) | 9200ms | 2400ms | 3.8x |

## Lessons

- **Amdahl's Law is real** — Synchronization overhead limits your speedup.
- **Cache locality matters more in parallel code** — False sharing destroys performance.
- **Task granularity is everything** — Too fine = sync overhead. Too coarse = load imbalance.

**GitHub**: [animesh-94/parallel_algorithm](https://github.com/animesh-94/parallel_algorithm)
`,
  },
  {
    slug: "lld-patterns-java",
    title: "Low-Level Design Patterns in Java: A Visual Guide",
    date: "2026-01-20",
    tags: ["Java", "LLD", "Design Patterns", "OOP"],
    excerpt:
      "A practical walkthrough of LLD patterns — Strategy, Observer, Factory, and more — with clean Java implementations and UML diagrams.",
    content: `## Why LLD Matters for SDE Interviews

System design interviews split into HLD (High-Level Design: databases, services, APIs) and LLD (Low-Level Design: class hierarchies, design patterns, SOLID principles). LLD is where most candidates stumble.

I built a comprehensive Java repository covering the most important patterns. Here's a summary.

## Strategy Pattern

**Problem**: You have multiple algorithms for the same task and want to swap them at runtime.

\`\`\`java
interface SortStrategy {
    void sort(int[] arr);
}

class QuickSort implements SortStrategy {
    public void sort(int[] arr) { /* ... */ }
}

class MergeSort implements SortStrategy {
    public void sort(int[] arr) { /* ... */ }
}

class Sorter {
    private SortStrategy strategy;
    public Sorter(SortStrategy s) { this.strategy = s; }
    public void performSort(int[] arr) { strategy.sort(arr); }
}
\`\`\`

**Classic use case**: Payment processing — PayPal, Card, UPI all implement a \`PaymentStrategy\`.

## Observer Pattern

**Problem**: One object's state change should automatically notify many dependents.

\`\`\`java
interface Observer {
    void update(String event);
}

class EventBus {
    private List<Observer> observers = new ArrayList<>();
    public void subscribe(Observer o) { observers.add(o); }
    public void publish(String event) {
        observers.forEach(o -> o.update(event));
    }
}
\`\`\`

**Use case**: UI updates reacting to model changes, notification systems.

## Factory Pattern

\`\`\`java
abstract class Shape { abstract double area(); }

class ShapeFactory {
    public static Shape create(String type, double... params) {
        return switch(type) {
            case "CIRCLE" -> new Circle(params[0]);
            case "RECT" -> new Rectangle(params[0], params[1]);
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}
\`\`\`

## SOLID Principles Cheatsheet

| Principle | One-liner |
|---|---|
| **S**ingle Responsibility | One class, one reason to change |
| **O**pen/Closed | Open for extension, closed for modification |
| **L**iskov Substitution | Subtypes must behave like their parent |
| **I**nterface Segregation | Many small interfaces > one fat interface |
| **D**ependency Inversion | Depend on abstractions, not concretions |

**GitHub**: [animesh-94/LLD-and-OOPS-JAVA](https://github.com/animesh-94/LLD-and-OOPS-JAVA)
`,
  },
];
