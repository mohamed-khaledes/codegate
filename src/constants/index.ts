import { Clock, Code2, Calendar, Users } from 'lucide-react'

export const INTERVIEW_CATEGORY = [
  { id: 'upcoming', title: 'Upcoming Interviews', variant: 'outline' },
  { id: 'completed', title: 'Completed', variant: 'secondary' },
  { id: 'succeeded', title: 'Succeeded', variant: 'default' },
  { id: 'failed', title: 'Failed', variant: 'destructive' }
] as const

export const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00'
]

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: 'New Call',
    description: 'Start an instant call',
    color: 'primary',
    gradient: 'from-primary/10 via-primary/5 to-transparent'
  },
  {
    icon: Users,
    title: 'Join Interview',
    description: 'Enter via invitation link',
    color: 'purple-500',
    gradient: 'from-purple-500/10 via-purple-500/5 to-transparent'
  },
  {
    icon: Calendar,
    title: 'Schedule',
    description: 'Plan upcoming interviews',
    color: 'blue-500',
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent'
  },
  {
    icon: Clock,
    title: 'Recordings',
    description: 'Access past interviews',
    color: 'orange-500',
    gradient: 'from-orange-500/10 via-orange-500/5 to-transparent'
  }
]

export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n\n}`,
      python: `def two_sum(nums, target):\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n\n    }\n}`
    }
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list and return the reversed list.',
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    starterCode: {
      javascript: `function reverseList(head) {\n\n}`,
      python: `def reverse_list(head):\n    pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public ListNode ReverseList(ListNode head) {\n\n    }\n}`
    }
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    description:
      'Merge two sorted linked lists and return it as a new sorted list built by splicing together the nodes of the first two lists.',
    examples: [{ input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
    starterCode: {
      javascript: `function mergeTwoLists(l1, l2) {\n\n}`,
      python: `def merge_two_lists(l1, l2):\n    pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public ListNode MergeTwoLists(ListNode l1, ListNode l2) {\n\n    }\n}`
    }
  },
  {
    id: 'maximum-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    description:
      'Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
    starterCode: {
      javascript: `function maxDepth(root) {\n\n}`,
      python: `def max_depth(root):\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int MaxDepth(TreeNode root) {\n\n    }\n}`
    }
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    description:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n\n}`,
      python: `def is_anagram(s, t):\n    pass`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public bool IsAnagram(string s, string t) {\n\n    }\n}`
    }
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    description:
      'Given head of a linked list, determine if the linked list has a cycle in it using O(1) memory.',
    examples: [{ input: 'head = [3,2,0,-4], pos = 1', output: 'true' }],
    starterCode: {
      javascript: `function hasCycle(head) {\n\n}`,
      python: `def has_cycle(head):\n    pass`,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public bool HasCycle(ListNode head) {\n\n    }\n}`
    }
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    description:
      'Given an m x n 2D binary grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
    examples: [
      {
        input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]',
        output: '2'
      }
    ],
    starterCode: {
      javascript: `function numIslands(grid) {\n\n}`,
      python: `def num_islands(grid):\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int NumIslands(char[][] grid) {\n\n    }\n}`
    }
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    description:
      'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i]. Must run in O(n) without using division.',
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n\n}`,
      python: `def product_except_self(nums):\n    pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int[] ProductExceptSelf(int[] nums) {\n\n    }\n}`
    }
  },
  {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n\n}`,
      python: `def length_of_longest_substring(s):\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int LengthOfLongestSubstring(string s) {\n\n    }\n}`
    }
  },
  {
    id: 'three-sum',
    title: 'Three Sum',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.',
    examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' }],
    starterCode: {
      javascript: `function threeSum(nums) {\n\n}`,
      python: `def three_sum(nums):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public IList<IList<int>> ThreeSum(int[] nums) {\n\n    }\n}`
    }
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    description:
      'Given an array of coins and an amount, return the fewest number of coins needed to make up that amount. Return -1 if it cannot be achieved.',
    examples: [{ input: 'coins = [1,5,11], amount = 11', output: '3' }],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n\n}`,
      python: `def coin_change(coins, amount):\n    pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int CoinChange(int[] coins, int amount) {\n\n    }\n}`
    }
  },
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [{ input: 'root = [2,1,3]', output: 'true' }],
    starterCode: {
      javascript: `function isValidBST(root) {\n\n}`,
      python: `def is_valid_bst(root):\n    pass`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public bool IsValidBST(TreeNode root) {\n\n    }\n}`
    }
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    description:
      'Given two strings text1 and text2, return the length of their longest common subsequence. Return 0 if there is no common subsequence.',
    examples: [{ input: 'text1 = "abcde", text2 = "ace"', output: '3' }],
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {\n\n}`,
      python: `def longest_common_subsequence(text1, text2):\n    pass`,
      java: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int LongestCommonSubsequence(string text1, string text2) {\n\n    }\n}`
    }
  },
  {
    id: 'word-search',
    title: 'Word Search',
    description:
      'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells horizontally or vertically.',
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true'
      }
    ],
    starterCode: {
      javascript: `function exist(board, word) {\n\n}`,
      python: `def exist(board, word):\n    pass`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public bool Exist(char[][] board, string word) {\n\n    }\n}`
    }
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    description:
      'Given the sorted rotated array nums of unique elements, return the minimum element of this array. Must run in O(log n) time.',
    examples: [{ input: 'nums = [3,4,5,1,2]', output: '1' }],
    starterCode: {
      javascript: `function findMin(nums) {\n\n}`,
      python: `def find_min(nums):\n    pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n\n    }\n};`,
      csharp: `public class Solution {\n    public int FindMin(int[] nums) {\n\n    }\n}`
    }
  }
]
export const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '/javascript.png' },
  { id: 'python', name: 'Python', icon: '/python.png' },
  { id: 'java', name: 'Java', icon: '/java.png' },
  { id: 'cpp', name: 'c++', icon: '/cpp.png' },
  { id: 'csharp', name: 'c#', icon: '/csharp.png' }
] as const

export interface CodeQuestion {
  id: string
  title: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  starterCode: {
    javascript: string
    python: string
    java: string
    cpp: string
    csharp: string
  }
  constraints?: string[]
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number]
