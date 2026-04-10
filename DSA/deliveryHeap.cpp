#include <iostream>
using namespace std;

#define MAX 100

class MinHeap {
    int heap[MAX];
    int size;

public:
    MinHeap() {
        size = 0;
    }

    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }

    // Insert element
    
    void insert(int key) {
        if (size == MAX) {
            cout << "Heap Overflow\n";
            return;
        }

        heap[size] = key;
        int i = size;
        size++;

        // Heapify Up
        while (i != 0 && heap[parent(i)] > heap[i]) {
            swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }

    // Heapify Down
    void heapifyDown(int i) {
        int smallest = i;
        int l = left(i);
        int r = right(i);

        if (l < size && heap[l] < heap[smallest])
            smallest = l;

        if (r < size && heap[r] < heap[smallest])
            smallest = r;

        if (smallest != i) {
            swap(heap[i], heap[smallest]);
            heapifyDown(smallest);
        }
    }

    // Extract Min
    int extractMin() {
        if (size <= 0) return -1;

        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;

        heapifyDown(0);
        return root;
    }

    // Display heap
    void display() {
        for (int i = 0; i < size; i++)
            cout << heap[i] << " ";
        cout << endl;
    }

    bool isEmpty() {
        return size == 0;
    }
};

int main() {
    MinHeap mh;

    int orders[] = {25, 10, 30, 5, 15};

    // Build heap
    for (int i = 0; i < 5; i++)
        mh.insert(orders[i]);

    cout << "Min Heap after insertion: ";
    mh.display();

    // Processing order
    cout << "Processing order: ";
    while (!mh.isEmpty()) {
        cout << mh.extractMin() << " ";
    }
    cout << endl;

    // Rebuild heap
    for (int i = 0; i < 5; i++)
        mh.insert(orders[i]);

    // Insert new order (2 minutes)
    mh.insert(2);

    cout << "Min Heap after inserting 2: ";
    mh.display();

    return 0;
}