import { mapDatasource } from '../../src/basic/datasource'

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

describe('utils/datasource', () => {
  it('should map datasource correctly', () => {
    expect(mapDatasource(treeData, item => ({
      ...item,
      value: `${item.value}a`
    }))).toEqual([
      {
        value: '1a'
      },
      {
        value: '2a',
        children: [
          {
            value: '20a',
            children: [
              {
                value: '201a',
              },
              {
                value: '202a',
              }
            ]
          },
          {
            value: '21a'
          }
        ]
      },
      {
        value: '3a'
      }
    ])
  })
});
