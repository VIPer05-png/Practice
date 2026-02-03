#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

Node* insertEnd(Node* head, int value) {
    Node* newNode = new Node(value);

    if (head == nullptr) {
        return newNode;
    }

    Node* temp = head;
    while (temp->next != nullptr) {
        temp = temp->next;
    }

    temp->next = newNode;
    return head;
}

void display(const Node* head) {
    const Node* temp = head;
    if (temp == nullptr) {
        cout << "NULL" << endl;
        return;
    }
    while (temp != nullptr) {
        cout << temp->data;
        if (temp->next) cout << " -> ";
        temp = temp->next;
    }
    cout << " -> NULL" << endl;
}

void freeList(Node*& head) {
    while (head != nullptr) {
        Node* tmp = head;
        head = head->next;
        delete tmp;
    }
}

int main() {
    Node* head = nullptr;

    head = insertEnd(head, 10);
    head = insertEnd(head, 20);
    head = insertEnd(head, 30);

    display(head);

    freeList(head);
    return 0;
}
