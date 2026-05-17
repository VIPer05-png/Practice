#include <iostream>
using namespace std;

#define MAX 100

int heap[MAX];
int size = 0;

// Insert into Max Heap
void insert(int value) {

    if (size == MAX) {
        cout << "Heap is Full\n";
        return;
    }

    // Insert at end
    int i = size;
    heap[i] = value;
    size++;

    // Heapify Up
    while (i != 0 && heap[(i - 1) / 2] < heap[i]) {

        int temp = heap[i];
        heap[i] = heap[(i - 1) / 2];
        heap[(i - 1) / 2] = temp;

        i = (i - 1) / 2;
    }
}

// Delete Root
void deleteRoot() {

    if (size <= 0) {
        cout << "Heap is Empty\n";
        return;
    }

    // Replace root with last element
    heap[0] = heap[size - 1];
    size--;

    // Heapify Down
    int i = 0;

    while (true) {

        int left = 2 * i + 1;
        int right = 2 * i + 2;

        int largest = i;

        if (left < size && heap[left] > heap[largest])
            largest = left;

        if (right < size && heap[right] > heap[largest])
            largest = right;

        if (largest != i) {

            int temp = heap[i];
            heap[i] = heap[largest];
            heap[largest] = temp;

            i = largest;
        }
        else {
            break;
        }
    }
}

// Display Heap
void display() {

    for (int i = 0; i < size; i++) {
        cout << heap[i] << " ";
    }

    cout << endl;
}

int main() {

    insert(40);
    insert(30);
    insert(35);
    insert(10);
    insert(50);

    cout << "Heap after insertion:\n";
    display();

    deleteRoot();

    cout << "Heap after deletion:\n";
    display();

    return 0;
}