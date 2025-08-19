/* eslint-disable */

import * as sdk from 'hypertune';

export const queryCode = `query FullQuery{root{roadmap}}`;

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
              selection: { roadmap: { fieldArguments: {}, fieldQuery: null } },
            },
          },
        },
      },
    },
  },
};

export const initData = {
  commitId: 34186,
  hash: '3228034286984443',
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
  roadmap: boolean;
};

export type FlagValues = {
  roadmap: boolean;
};

export type FlagPaths = keyof FlagValues & string;

export const flagFallbacks: FlagValues = {
  roadmap: false,
};

export function decodeFlagValues<TFlagPaths extends keyof FlagValues & string>(
  encodedValues: string,
  flagPaths: TFlagPaths[]
): Pick<FlagValues, TFlagPaths> {
  return sdk.decodeFlagValues({ flagPaths, encodedValues });
}

export type VariableValues = {};

export type User = {
  id: string;
  anonymousId: string;
  email: string;
};

export const EnvironmentEnumValues = [
  'development',
  'production',
  'test',
] as const;
export type Environment = (typeof EnvironmentEnumValues)[number];

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
};

export type RootArgs = {
  context: Context;
};

export type EmptyObject = {};

export type Root = {
  roadmap: boolean;
};

const rootFallback = { roadmap: false };

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

const sourceFallback = { root: { roadmap: false } };

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
