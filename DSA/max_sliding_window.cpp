#include <iostream>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {

        deque<int> dq;
        vector<int> ans;

        for(int i = 0; i < nums.size(); i++) {
            while(!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }
            while(!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if(i >= k - 1) {
                ans.push_back(nums[dq.front()]);
            }
        }

        return ans;
    }
};

int main(){
    Solution s;
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    int k = 3;
    vector<int> result = s.maxSlidingWindow(nums, k);
    cout << "Maximum in each window: ";

    for(int x : result) {
        cout << x << " ";
    }

    cout << endl;

    return 0;
}