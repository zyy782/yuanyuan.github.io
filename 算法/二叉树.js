// 1. 递归实现 中序遍历(左根右)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = []
  if (!root) return result
  const middleOrder = (root) => {
    if (root.left) middleOrder(root.left)
    result.push(root.val)
    if (root.right) middleOrder(root.right)
  }
  middleOrder(root)
  return result
}

// 2. 递归实现 前序遍历(根左右)
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let res = []
  const roOrder = (root) => {
    if (root) {
      res.push(root.val)
      root.left && roOrder(root.left)
      root.right && roOrder(root.right)
    } else {
      return res
    }
  }
  roOrder(root)
  return res
}

// 3. 后序遍历(左右跟)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  let res = []
  if (!root) return res
  const poOrder = (root) => {
    if (root.left) poOrder(root.left)
    if (root.right) poOrder(root.right)
    res.push(root.val)
  }
  poOrder(root)
  return res
}

// 4. 层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  // 递归实现
  let res = []
  if (!root) return res
  const levelOrder = (root, level) => {
    if (!root) return
    if (!res[level]) res[level] = []
    res[level].push(root.val)
    levelOrder(root.left, level + 1)
    levelOrder(root.right, level + 1)
  }
  levelOrder(root, 0)
  return res
}

// 5. 判断两棵树是否相同
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // return JSON.stringify(p) === JSON.stringify(q)
  if (!p && !q) return true
  if (!p || !q) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// 6.判断二叉树是否对称
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true
  const isMirror = (left, right) => {
    if (!left && !right) return true
    if (!left || !right) return false
    if (left.val !== right.val) return false
    return isMirror(left.left, right.right) && isMirror(left.right, right.left)
  }
  return isMirror(root.left, root.right)
}

// 7. 求二叉树的最大深度
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

// 8. 求二叉树的最小深度
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1
  if (!root.left) return minDepth(root.right) + 1
  if (!root.right) return minDepth(root.left) + 1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}

// 9. 完全二叉树的节点个数
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
  let num = 0
  if (!root) return num
  const count = (root) => {
    if (!root) return num
    if (root.left) num++
    if (root.right) num++
    count(root.left)
    count(root.right)
  }
  count(root)
  return num + 1
}

// 10. 求二叉树的左叶子节点之和
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 求二叉树的左叶子节点之和
var sumOfLeftLeaves = function (root) {
  let sum = 0
  if (!root) return sum
  const sumLeft = (root) => {
    if (!root) return
    if (root.left && !root.left.left && !root.left.right) sum += root.left.val
    sumLeft(root.left)
    sumLeft(root.right)
  }
  sumLeft(root)
  return sum
}

// 11. 求二叉树的所有路径
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let res = []
  if (!root) return res
  const getPath = (root, path) => {
    if (!root) return
    path += root.val
    if (!root.left && !root.right) {
      res.push(path)
    } else {
      path += '->'
      getPath(root.left, path)
      getPath(root.right, path)
    }
  }
  getPath(root, '')
  return res
}

// 12.二叉搜索树中的众数
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var findMode = function (root) {
//   const result = []
//   if (!root) return result
//   const res = {}
//   const mapRoot = (root) => {
//     if (root) {
//       if (!res[root.val]) {
//         res[root.val] = 1
//       } else {
//         res[root.val]++
//       }
//       mapRoot(root.left)
//       mapRoot(root.right)
//     }
//   }
//   mapRoot(root)
//   const max = Math.max(...Object.values(res))
//   Object.keys(res).forEach((item) => {
//     if (res[item] === max) {
//       result.push(item)
//     }
//   })
//   return result
// }

// 一棵二叉搜索树的中序遍历序列是一个非递减的有序序列

// 主要优化点：
// 空间复杂度从 O(n) 降低到 O(1)（不考虑递归调用栈）
// 移除了哈希表的使用
// 利用BST中序遍历的有序性质，相同的值一定是连续的
// 一次遍历就能得到结果，不需要额外的遍历来找最大值
// 这个优化后的实现：
// 时间复杂度：O(n)，其中 n 是树中节点的数量
// 空间复杂度：O(1)，只使用了几个变量来记录状态（不考虑递归调用栈和返回数组的空间）

var findMode = function (root) {
  let result = []
  let currentVal = null
  let currentCount = 0
  let maxCount = 0
  // 中序遍历函数
  const inorder = (node) => {
    if (!node) return

    inorder(node.left)

    // 处理当前节点
    if (currentVal === node.val) {
      currentCount++
    } else {
      currentVal = node.val
      currentCount = 1
    }

    // 更新结果
    if (currentCount > maxCount) {
      maxCount = currentCount
      result = [currentVal]
    } else if (currentCount === maxCount) {
      result.push(currentVal)
    }

    inorder(node.right)
  }

  inorder(root)
  return result
}

// 13. 二叉搜索树的最小绝对差
// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let min = Infinity
  let pre = -Infinity
  const inorder = (root) => {
    if (!root) return
    inorder(root.left)
    min = Math.min(min, root.val - pre)
    pre = root.val
    inorder(root.right)
  }
  inorder(root)
  return min
}

// 14. 翻转二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root) {
    const temp = root.left
    root.left = root.right
    root.right = temp
    invertTree(root.left)
    invertTree(root.right)
  }
  return root
}

// 15. 是否是平衡二叉树
// 二叉树中任意一个结点的左右子树的深度相差不超过1。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) return true
  const getDepth = (root) => {
    if (!root) return 0
    return Math.max(getDepth(root.left), getDepth(root.right)) + 1
  }
  return Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
}
