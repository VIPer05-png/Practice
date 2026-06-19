#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int start = 0;
        int end = nums.size() - 1;
        
        while (start < end) {
            int mid = start + (end - start) / 2;
            
            if (nums[mid] < nums[mid + 1]) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        
        return start;
    }
};

int main() {
    Solution s;
    
    vector<int> nums = {1, 2, 3, 4, 10, 6, 7, 8};
    
    int peakIndex = s.findPeakElement(nums);
    
    cout << "Peak element found at index: " << peakIndex << " (Value: " << nums[peakIndex] << ")" << endl;
    
    return 0;
}