import { fr, type Catalog } from './fr.ts';

type PluralNode = { readonly one: string; readonly other: string };

/** Every key of the catalog, as a dotted path to a string or a plural node. */
export type MessageKey = KeysOf<Catalog>;

type KeysOf<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string | PluralNode
    ? `${Prefix}${K}`
    : KeysOf<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

type NodeAt<T, P extends string> = P extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? NodeAt<T[Head], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

type Placeholders<S> = S extends `${string}{${infer Name}}${infer Rest}`
  ? Name | Placeholders<Rest>
  : never;

type ParamValue = string | number;

type ParamsFor<N> = N extends PluralNode
  ? { count: number } & Record<Exclude<Placeholders<N['one'] | N['other']>, 'count'>, ParamValue>
  : [Placeholders<N>] extends [never]
    ? never
    : Record<Placeholders<N>, ParamValue>;

type ParamsArg<K extends MessageKey> = [ParamsFor<NodeAt<Catalog, K>>] extends [never]
  ? []
  : [params: ParamsFor<NodeAt<Catalog, K>>];

const pluralRules = new Intl.PluralRules('fr');

function lookup(key: string): unknown {
  let node: unknown = fr;
  for (const part of key.split('.')) {
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

function interpolate(template: string, params: Record<string, ParamValue>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

/** Looks up a French string, interpolating `{placeholders}` and applying plural rules. */
export function t<K extends MessageKey>(key: K, ...args: ParamsArg<K>): string {
  const node = lookup(key);
  const params = (args[0] ?? {}) as Record<string, ParamValue>;
  if (typeof node === 'string') {
    return interpolate(node, params);
  }
  const plural = node as PluralNode;
  const category = pluralRules.select(Number(params.count));
  return interpolate(category === 'one' ? plural.one : plural.other, params);
}
