import { getCheckedSubTree } from '../src/tree'


const treeData = [
  {
    value: 1
  },
  {
    value: 2,
    children: [
      {
        value: 20,
        children: [
          {
            value: 201,
          },
          {
            value: 202,
          }
        ]
      },
      {
        value: 21
      }
    ]
  },
  {
    value: 3
  }
]

describe('tree', () => {
  it('getCheckedSubtree should extract checked subtree correctly', () => {
    expect(getCheckedSubTree(treeData, [1])).toEqual([treeData[0]])
    expect(getCheckedSubTree(treeData, [201, 202])).toEqual([{
      value: 2,
      children: [
        treeData[1].children![0]
      ]
    }])
    expect(getCheckedSubTree(treeData, [201])).toEqual([{
      value: 2,
      children: [
        {
          value: 20,
          children: [
            {
              value: 201,
            }
          ]
        }
      ]
    }])
  })
});
