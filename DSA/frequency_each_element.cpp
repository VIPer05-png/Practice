#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main() {
    vector<int> nums = {4, 5, 4, 1, 2, 5, 4, 3, 2};
    unordered_map<int, int> frequency;

    for (int num : nums) {
        frequency[num]++;
    }

    for (auto const& [element, count] : frequency) {
        cout << element << ": " << count << endl;
    }

    return 0;
}