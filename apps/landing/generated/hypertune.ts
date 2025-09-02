import * as sdk from 'hypertune';

export const queryId = 'd8acd0ab-5503-58e4-ab59-12c263ffdaa2';

export const query: sdk.Query<sdk.ObjectValueWithVariables> = {
  variableDefinitions: {},
  fragmentDefinitions: {},
  fieldQuery: {
    Query: {
      type: 'InlineFragment',
      objectTypeName: 'Query',
      selection: {
        root: {
          fieldArguments: { __isPartialObject__: true },
          fieldQuery: {
            Root: {
              type: 'InlineFragment',
              objectTypeName: 'Root',
              selection: {
                routinesV2: { fieldArguments: {}, fieldQuery: null },
                trainerAndClubs: { fieldArguments: {}, fieldQuery: null },
                suggestions: { fieldArguments: {}, fieldQuery: null },
                performance: { fieldArguments: {}, fieldQuery: null },
                health: { fieldArguments: {}, fieldQuery: null },
                gyms: { fieldArguments: {}, fieldQuery: null },
                equipment: { fieldArguments: {}, fieldQuery: null },
                calendar: { fieldArguments: {}, fieldQuery: null },
                running: { fieldArguments: {}, fieldQuery: null },
                roadmap: { fieldArguments: {}, fieldQuery: null },
              },
            },
          },
        },
      },
    },
  },
};

export const initData = {
  commitId: 34732,
  hash: '7705105305063502',
  reducedExpression: {
    id: 'XIUJRXBLr6KJ9V8ZMNqXG',
    logs: {},
    type: 'ObjectExpression',
    fields: {
      root: {
        id: '-yNKyfie3BPrdV9pJDy7m',
        body: {
          id: 'gMT5LnCf5b4nyLQwkXp2B',
          logs: {
            evaluations: {
              ddtecJ9GbjuAcgCnn6Ozr: 1,
              'Cvc9FAObmEV-jW9SYm6td': 1,
            },
          },
          type: 'ObjectExpression',
          fields: {
            routinesV2: {
              id: 'hvNzUjGHtQVfX5w99gkEr',
              type: 'SwitchExpression',
              cases: [
                {
                  id: '-CNKdei0cgMZ_SVADCwqS',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { kMP_ibFCqkKXGqYOwsi6c: 1 } },
                    },
                    b: {
                      id: '0OqNqjMVUKSzZHLUsdUhA',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'QZ8fZK5spvT7zR2lvDzvj',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'HugnceC_ffehzGs8Cay9X',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'NPXf7SZCGhFsQtdCHyYFV',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'Z3AVLc92BRs6ggf1tYtgS',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { nKHN608oeZpMaIcs8G72s: 1 } },
            },
            trainerAndClubs: {
              id: 'sE97HmH5iyyDVbPW6T_h2',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'KVzT90Tl9IIoqBiZtkl41',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { 'Zl0Fmu-wukD5x_JHSz4Fa': 1 } },
                    },
                    b: {
                      id: '0vb8wu_OfLoly6_FMmZ71',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'wI9Av9GR8c3EBr_cq6o1v',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 't5PDhRAwkfHmHvfyoBVQ2',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'YcO1uNR1CuiRRRkLXiXi9',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'XHg-XIgQzbOTuafu4Tibv',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { tmtCFYUDpXszGjWb29Xwr: 1 } },
            },
            suggestions: {
              id: 'VITogQW_o9swFowXpy2Mn',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'wqDfWxa_pnZyxiIFYO8Vx',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { VFMPoGm848pGoFTtcrcQJ: 1 } },
                    },
                    b: {
                      id: 'T9uC1Dx-ZpWaUWzBp1nUX',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: '6DNMWryoA_AloIFpNyJWE',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'jxU9GCdhP7zZXLHnPGtGX',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'XQnIjqCSWTilWeVBgRWJt',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'a3ZMzUtUUuNbcVaEOsqju',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { 'OFN06Tt--a-vhZKEJUQP4': 1 } },
            },
            performance: {
              id: '2u6z9hgwkRt6mo215-RT5',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'kateOKbWxZK4TqKR383Tn',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { b7KFoBY7LLJjhGqlUWeju: 1 } },
                    },
                    b: {
                      id: 'EpxOyq11bRaxz8Ji8GoPJ',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'Vp-VLHrtRxSkBaKyPj0hX',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'iNGLIOgYfRbR_wEdkBG0Y',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'UfWmRR4bzPj00-c4rUZ8D',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'h-NkQUq5zGJa9s3Lg39yj',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { IwLE3I7wWdV9e0hXs1xHS: 1 } },
            },
            health: {
              id: 'Dy6UyuwdPQqab3dU4sjPi',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'mop3vO9MyUkdWl24xAfVQ',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { '0IuA_qOcljxlE2V2u7nHu': 1 } },
                    },
                    b: {
                      id: 'ojx63rxb1xQvXT6gnXrDU',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'uklApolNCt282YaCWzjuj',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'ziTy4gQ0yC0EdZmJewglG',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: '4H1yntZaQ35IBRGRRE3WI',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: '5ZTWTNsSi6nEo1z51-OsO',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { syCDM1wZYeo1eihyS_nW4: 1 } },
            },
            gyms: {
              id: '4einiNoQhrOsb8cNfPI5J',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'N6GtzEpfgLzLdf-qBJoS1',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { II0ZkasWJWkLChArKCazG: 1 } },
                    },
                    b: {
                      id: 'yEo2obvF86XwaH4oaRR8r',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: '_C5xTWQXEkDh8wyTdiEgC',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'DFhkUSAMo4mz1T5QPazC_',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'or2rV4pL_Br-OA8U9aMMl',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'kDiQiht0UpFJ8MMnUstXl',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { 'qv4SP_6XPp--jr49HEZ4_': 1 } },
            },
            equipment: {
              id: 'cXrjFMHtb3OUIna4_kvFF',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'Sm6RveFnGLv7IQzGJI9Zk',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { '4sBeDmolAflVVViF7KbmY': 1 } },
                    },
                    b: {
                      id: 'GaGNBcUdApZjN_Lm4p9UQ',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'NdGCzj-KDaG64Ns8LxqaJ',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'rWB5xEx9oszKP-9OFh6DJ',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'l8wh4KkVmpaC_LsH7j9_n',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: '8LXhgEgwNOOAad_yJwyld',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { stp2wR76T1ftTDaOmMTaM: 1 } },
            },
            calendar: {
              id: 'aj9AJS07onMbq0tHuXRqZ',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'S2UCsfUT1cmrZtG-0qQhh',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { cj3ukzpgfg_QIWelZ0WpW: 1 } },
                    },
                    b: {
                      id: 'w8nvkZf_EYhf2iMFcaYH4',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'hiyF3uMkQuVEQju5q0Dqx',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'BVsyAvTiEAJLl9l4INd6O',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: '2bMCGtOI0sp8_vL131fiQ',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'qZBDY98oNvxkbi7ulJeRG',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { et9MMpU__cAXcvCOuu9KH: 1 } },
            },
            running: {
              id: 'CxuUiQtJ81LC36A1eQRiy',
              type: 'SwitchExpression',
              cases: [
                {
                  id: '7CiueActjIEg9Jj2FiePh',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { KNHAWKfk7MMQ3BV8poGAQ: 1 } },
                    },
                    b: {
                      id: 'kQInvaJnfHlWOG5sAXPsL',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: '6xxxhWjd07PhRWNhv5q-S',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'YQRJ620qj5eObL_emWEDa',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'GVY56HWl7AwmCvjK4rDgU',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: '2Q6imizxOoqNXwbln2I5u',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { kvJi3H91bANSim7oZX_Lr: 1 } },
            },
            roadmap: {
              id: 'FLSF-mCdsVYQofN2gudQf',
              type: 'SwitchExpression',
              cases: [
                {
                  id: 'LTI267hfbjnmSj5m8t2YF',
                  when: {
                    a: {
                      id: 'tCrcedw8_c6XiKhgMTD50',
                      type: 'SwitchExpression',
                      cases: [
                        {
                          id: 'js8XozRFJ7etg8mm5VFxB',
                          when: {
                            a: {
                              id: 'KgPm1uWP7hladUQeEcfis',
                              type: 'GetFieldExpression',
                              object: {
                                id: '51Db27C2bjkqZ2_8Ole44',
                                type: 'VariableExpression',
                                valueType: {
                                  type: 'ObjectValueType',
                                  objectTypeName: 'Query_root_args',
                                },
                                variableId: 'NE9uKJWYhVJL9Zeiu13QI',
                              },
                              fieldPath: 'context > environment',
                              valueType: {
                                type: 'EnumValueType',
                                enumTypeName: 'Environment',
                              },
                            },
                            b: {
                              id: '_9ncyZ9Vp6dvzO4hXe4th',
                              type: 'ListExpression',
                              items: [
                                {
                                  id: '-MTek0YMYi5LyL2ht4_gM',
                                  type: 'EnumExpression',
                                  value: 'development',
                                  valueType: {
                                    type: 'EnumValueType',
                                    enumTypeName: 'Environment',
                                  },
                                },
                              ],
                              valueType: {
                                type: 'ListValueType',
                                itemValueType: {
                                  type: 'EnumValueType',
                                  enumTypeName: 'Environment',
                                },
                              },
                            },
                            id: 'DaQ5JB1v7qNWZvDRjeoKw',
                            type: 'ComparisonExpression',
                            operator: 'in',
                            valueType: { type: 'BooleanValueType' },
                          },
                          then: {
                            id: 'ZErY4DcUPPlzqo9hK9q5u',
                            type: 'BooleanExpression',
                            value: true,
                            valueType: { type: 'BooleanValueType' },
                          },
                        },
                      ],
                      control: {
                        id: 'A6NIWp3BElxMos19rlui0',
                        type: 'BooleanExpression',
                        value: true,
                        valueType: { type: 'BooleanValueType' },
                      },
                      default: {
                        id: 'DzDXf3N4Lr5uIXjCZHcJz',
                        type: 'BooleanExpression',
                        value: false,
                        valueType: { type: 'BooleanValueType' },
                      },
                      valueType: { type: 'BooleanValueType' },
                      logs: { evaluations: { 'vY-JIGNoRh28mKLUcwUWS': 1 } },
                    },
                    b: {
                      id: 'wLTo12HFL5m-UZKEDUGks',
                      type: 'BooleanExpression',
                      value: true,
                      valueType: { type: 'BooleanValueType' },
                    },
                    id: 'VrVe0wYm1KuXGS3i3PSrD',
                    type: 'ComparisonExpression',
                    operator: '==',
                    valueType: { type: 'BooleanValueType' },
                  },
                  then: {
                    id: 'ufoi6k-AO1InQBw18pVtK',
                    type: 'BooleanExpression',
                    value: true,
                    valueType: { type: 'BooleanValueType' },
                  },
                },
              ],
              control: {
                id: 'hW7jR1YC8n4uD1dejSGNa',
                type: 'BooleanExpression',
                value: true,
                valueType: { type: 'BooleanValueType' },
              },
              default: {
                id: 'Jwd91dpAbAm-zD8xSiZxG',
                type: 'BooleanExpression',
                value: false,
                valueType: { type: 'BooleanValueType' },
              },
              valueType: { type: 'BooleanValueType' },
              logs: { evaluations: { '6X-FIykw8EEZ8D4cIi3FM': 1 } },
            },
          },
          metadata: { permissions: { user: {}, group: {} } },
          valueType: { type: 'ObjectValueType', objectTypeName: 'Root' },
          objectTypeName: 'Root',
        },
        logs: {},
        type: 'FunctionExpression',
        valueType: {
          type: 'FunctionValueType',
          returnValueType: { type: 'ObjectValueType', objectTypeName: 'Root' },
          parameterValueTypes: [
            { type: 'ObjectValueType', objectTypeName: 'Query_root_args' },
          ],
        },
        parameters: [{ id: 'NE9uKJWYhVJL9Zeiu13QI', name: 'rootArgs' }],
      },
    },
    metadata: {
      permissions: { user: {}, group: { team: { write: 'allow' } } },
    },
    valueType: { type: 'ObjectValueType', objectTypeName: 'Query' },
    objectTypeName: 'Query',
  },
  splits: {},
  commitConfig: { splitConfig: {} },
};

export const vercelFlagDefinitions = {
  routinesV2: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EroutinesV2',
  },
  trainerAndClubs: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EtrainerAndClubs',
  },
  suggestions: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Esuggestions',
  },
  performance: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eperformance',
  },
  health: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ehealth',
  },
  gyms: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Egyms',
  },
  equipment: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eequipment',
  },
  calendar: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ecalendar',
  },
  running: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Erunning',
  },
  roadmap: {
    options: [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    origin:
      'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eroadmap',
  },
};

export type RootFlagValues = {
  routinesV2: boolean;
  trainerAndClubs: boolean;
  suggestions: boolean;
  performance: boolean;
  health: boolean;
  gyms: boolean;
  equipment: boolean;
  calendar: boolean;
  running: boolean;
  roadmap: boolean;
};

export type FlagValues = {
  routinesV2: boolean;
  trainerAndClubs: boolean;
  suggestions: boolean;
  performance: boolean;
  health: boolean;
  gyms: boolean;
  equipment: boolean;
  calendar: boolean;
  running: boolean;
  roadmap: boolean;
};

export type FlagPath = keyof FlagValues & string;

export const flagFallbacks: FlagValues = {
  routinesV2: false,
  trainerAndClubs: false,
  suggestions: false,
  performance: false,
  health: false,
  gyms: false,
  equipment: false,
  calendar: false,
  running: false,
  roadmap: false,
};

export function decodeFlagValues<TFlagPath extends keyof FlagValues & string>(
  encodedFlagValues: string,
  flagPaths: TFlagPath[]
): Pick<FlagValues, TFlagPath> {
  return sdk.decodeFlagValues({ encodedFlagValues, flagPaths });
}

export type VariableValues = {};

export type User = {
  id: string;
  email: string;
};

export const EnvironmentEnumValues = [
  'development',
  'production',
  'test',
] as const;
export type Environment = (typeof EnvironmentEnumValues)[number];

export type AnonymousUser = {
  id: string;
};

/**
 * This `Context` input type is used for the `context` argument on your root field.
 * It contains details of the current `user` and `environment`.
 *
 * You can define other custom input types with fields that are primitives, enums
 * or other input types.
 */
export type Context = {
  user: User;
  environment: Environment;
  anonymousUser: AnonymousUser;
};

export type RootArgs = {
  context: Context;
};

export type EmptyObject = {};

export type Root = {
  routinesV2: boolean;
  trainerAndClubs: boolean;
  suggestions: boolean;
  performance: boolean;
  health: boolean;
  gyms: boolean;
  equipment: boolean;
  calendar: boolean;
  running: boolean;
  roadmap: boolean;
};

const rootFallback = {
  routinesV2: false,
  trainerAndClubs: false,
  suggestions: false,
  performance: false,
  health: false,
  gyms: false,
  equipment: false,
  calendar: false,
  running: false,
  roadmap: false,
};

export class RootNode extends sdk.Node {
  override typeName = 'Root' as const;

  getRootArgs(): RootArgs {
    const { step } = this.props;
    return (
      step?.type === 'GetFieldStep' ? step.fieldArguments : {}
    ) as RootArgs;
  }

  get({ fallback = rootFallback as Root }: { fallback?: Root } = {}): Root {
    const getQuery = sdk.mergeFieldQueryAndArgs(
      query.fragmentDefinitions,
      sdk.getFieldQueryForPath(query.fragmentDefinitions, query.fieldQuery, [
        'Query',
        'root',
      ]),
      null
    );
    return this.getValue({ query: getQuery, fallback }) as Root;
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EroutinesV2})
   */
  routinesV2({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('routinesV2', {
      fieldArguments: args,
    });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EtrainerAndClubs})
   */
  trainerAndClubs({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('trainerAndClubs', {
      fieldArguments: args,
    });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Esuggestions})
   */
  suggestions({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('suggestions', {
      fieldArguments: args,
    });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eperformance})
   */
  performance({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('performance', {
      fieldArguments: args,
    });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ehealth})
   */
  health({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('health', { fieldArguments: args });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Egyms})
   */
  gyms({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('gyms', { fieldArguments: args });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eequipment})
   */
  equipment({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('equipment', {
      fieldArguments: args,
    });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ecalendar})
   */
  calendar({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('calendar', { fieldArguments: args });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Erunning})
   */
  running({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('running', { fieldArguments: args });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eroadmap})
   */
  roadmap({
    args = {},
    fallback,
  }: {
    args?: EmptyObject;
    fallback: boolean;
  }): boolean {
    const props0 = this.getFieldNodeProps('roadmap', { fieldArguments: args });
    const expression0 = props0.expression;

    if (expression0 && expression0.type === 'BooleanExpression') {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }
}

/**
 * This is your project schema expressed in GraphQL.
 *
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with
 * more than two states, `Int` fields for numeric flags like timeouts and limits,
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and
 * fields with custom object and list types for more complex app configuration,
 * e.g. to use Hypertune as a CMS.
 *
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export type Source = {
  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field
   * already has a `context` argument. Since all flags are nested under the root
   * field, this context will be available to all of them.
   */
  root: Root;
};

const sourceFallback = {
  root: {
    routinesV2: false,
    trainerAndClubs: false,
    suggestions: false,
    performance: false,
    health: false,
    gyms: false,
    equipment: false,
    calendar: false,
    running: false,
    roadmap: false,
  },
};

export type GetQueryRootArgs = {
  args: RootArgs;
};

export type GetQueryArgs = {
  root: GetQueryRootArgs;
};

/**
 * This is your project schema expressed in GraphQL.
 *
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with
 * more than two states, `Int` fields for numeric flags like timeouts and limits,
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and
 * fields with custom object and list types for more complex app configuration,
 * e.g. to use Hypertune as a CMS.
 *
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export class SourceNode extends sdk.Node {
  override typeName = 'Query' as const;

  get({
    args,
    fallback = sourceFallback as Source,
  }: {
    args: GetQueryArgs;
    fallback?: Source;
  }): Source {
    const getQuery = sdk.mergeFieldQueryAndArgs(
      query.fragmentDefinitions,
      sdk.getFieldQueryForPath(query.fragmentDefinitions, query.fieldQuery, []),
      args
    );
    return this.getValue({ query: getQuery, fallback }) as Source;
  }

  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field
   * already has a `context` argument. Since all flags are nested under the root
   * field, this context will be available to all of them.
   */
  root({ args }: { args: RootArgs }): RootNode {
    const props0 = this.getFieldNodeProps('root', { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === 'ObjectExpression' &&
      expression0.objectTypeName === 'Root'
    ) {
      return new RootNode(props0);
    }

    const node = new RootNode(props0);
    node._logUnexpectedTypeError();
    return node;
  }
}

export type DehydratedState = sdk.DehydratedState<Source, VariableValues>;

const sources: { [key: string]: SourceNode } = {};

export type CreateSourceOptions = {
  token: string;
  variableValues?: VariableValues;
  override?: sdk.DeepPartial<Source> | null;
  key?: string;
} & sdk.CreateOptions;

export function createSource({
  token,
  variableValues = {},
  override,
  key,
  ...options
}: CreateSourceOptions): SourceNode {
  const sourceKey =
    key ?? (typeof window === 'undefined' ? 'server' : 'client');

  if (!sources[sourceKey]) {
    sources[sourceKey] = sdk.create({
      NodeConstructor: SourceNode,
      token,
      variableValues,
      override,
      options: { initData: initData as unknown as sdk.InitData, ...options },
    });
  }

  return sources[sourceKey];
}

export const emptySource = new SourceNode({
  context: null,
  logger: null,
  parent: null,
  step: null,
  expression: null,
  initDataHash: null,
});

export function createSourceForServerOnly({
  token,
  variableValues = {},
  override,
  key,
  ...options
}: CreateSourceOptions): SourceNode {
  return typeof window === 'undefined'
    ? createSource({ token, variableValues, override, ...options })
    : emptySource;
}

export const overrideCookieName = 'hypertuneOverride';

/**
 * @deprecated use createSource instead.
 */
export const initHypertune = createSource;
/**
 * @deprecated use SourceNode instead.
 */
export type QueryNode = SourceNode;
/**
 * @deprecated use Source instead.
 */
export type Query = Source;
