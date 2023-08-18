
/**
 * Client
**/

import * as runtime from '.././runtime/index.d.ts';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  email: string
  password: string
  name: string
  image_url: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Mod
 * 
 */
export type Mod = {
  id: number
  name: string
  slug: string
  shortDescription: string
  description: string
  isNSFW: boolean
  isApproved: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  userId: number | null
  categoryId: number | null
}

/**
 * Model ModImage
 * 
 */
export type ModImage = {
  id: number
  url: string
  preview_url: string | null
  isPrimary: boolean
  isThumbnail: boolean
  createdAt: Date
  updatedAt: Date
  modId: number | null
}

/**
 * Model ModVersion
 * 
 */
export type ModVersion = {
  id: number
  version: string
  isLatest: boolean
  changelog: string
  downloadUrl: string
  extension: string | null
  filename: string | null
  createdAt: Date
  updatedAt: Date
  modId: number | null
}

/**
 * Model Tag
 * 
 */
export type Tag = {
  id: number
  name: string
  slug: string
  description: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Category
 * 
 */
export type Category = {
  id: number
  name: string
  slug: string
  description: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model ModDownload
 * 
 */
export type ModDownload = {
  id: number
  ip: string
  userAgent: string
  createdAt: Date
  updatedAt: Date
  modVersionId: number | null
}

/**
 * Model ModFavorite
 * 
 */
export type ModFavorite = {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number | null
  modId: number | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.mod`: Exposes CRUD operations for the **Mod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mods
    * const mods = await prisma.mod.findMany()
    * ```
    */
  get mod(): Prisma.ModDelegate<GlobalReject>;

  /**
   * `prisma.modImage`: Exposes CRUD operations for the **ModImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModImages
    * const modImages = await prisma.modImage.findMany()
    * ```
    */
  get modImage(): Prisma.ModImageDelegate<GlobalReject>;

  /**
   * `prisma.modVersion`: Exposes CRUD operations for the **ModVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModVersions
    * const modVersions = await prisma.modVersion.findMany()
    * ```
    */
  get modVersion(): Prisma.ModVersionDelegate<GlobalReject>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<GlobalReject>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<GlobalReject>;

  /**
   * `prisma.modDownload`: Exposes CRUD operations for the **ModDownload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModDownloads
    * const modDownloads = await prisma.modDownload.findMany()
    * ```
    */
  get modDownload(): Prisma.ModDownloadDelegate<GlobalReject>;

  /**
   * `prisma.modFavorite`: Exposes CRUD operations for the **ModFavorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModFavorites
    * const modFavorites = await prisma.modFavorite.findMany()
    * ```
    */
  get modFavorite(): Prisma.ModFavoriteDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.11.0
   * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Mod: 'Mod',
    ModImage: 'ModImage',
    ModVersion: 'ModVersion',
    Tag: 'Tag',
    Category: 'Category',
    ModDownload: 'ModDownload',
    ModFavorite: 'ModFavorite'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    mods: number
    favoriteMods: number
  }

  export type UserCountOutputTypeSelect = {
    mods?: boolean
    favoriteMods?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ModCountOutputType
   */


  export type ModCountOutputType = {
    versions: number
    tags: number
    images: number
    favorites: number
  }

  export type ModCountOutputTypeSelect = {
    versions?: boolean
    tags?: boolean
    images?: boolean
    favorites?: boolean
  }

  export type ModCountOutputTypeGetPayload<S extends boolean | null | undefined | ModCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ModCountOutputTypeArgs)
    ? ModCountOutputType 
    : S extends { select: any } & (ModCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ModCountOutputType ? ModCountOutputType[P] : never
  } 
      : ModCountOutputType




  // Custom InputTypes

  /**
   * ModCountOutputType without action
   */
  export type ModCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ModCountOutputType
     */
    select?: ModCountOutputTypeSelect | null
  }



  /**
   * Count Type ModVersionCountOutputType
   */


  export type ModVersionCountOutputType = {
    downloads: number
  }

  export type ModVersionCountOutputTypeSelect = {
    downloads?: boolean
  }

  export type ModVersionCountOutputTypeGetPayload<S extends boolean | null | undefined | ModVersionCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModVersionCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ModVersionCountOutputTypeArgs)
    ? ModVersionCountOutputType 
    : S extends { select: any } & (ModVersionCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ModVersionCountOutputType ? ModVersionCountOutputType[P] : never
  } 
      : ModVersionCountOutputType




  // Custom InputTypes

  /**
   * ModVersionCountOutputType without action
   */
  export type ModVersionCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ModVersionCountOutputType
     */
    select?: ModVersionCountOutputTypeSelect | null
  }



  /**
   * Count Type TagCountOutputType
   */


  export type TagCountOutputType = {
    mods: number
  }

  export type TagCountOutputTypeSelect = {
    mods?: boolean
  }

  export type TagCountOutputTypeGetPayload<S extends boolean | null | undefined | TagCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TagCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TagCountOutputTypeArgs)
    ? TagCountOutputType 
    : S extends { select: any } & (TagCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TagCountOutputType ? TagCountOutputType[P] : never
  } 
      : TagCountOutputType




  // Custom InputTypes

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect | null
  }



  /**
   * Count Type CategoryCountOutputType
   */


  export type CategoryCountOutputType = {
    mods: number
  }

  export type CategoryCountOutputTypeSelect = {
    mods?: boolean
  }

  export type CategoryCountOutputTypeGetPayload<S extends boolean | null | undefined | CategoryCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CategoryCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CategoryCountOutputTypeArgs)
    ? CategoryCountOutputType 
    : S extends { select: any } & (CategoryCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof CategoryCountOutputType ? CategoryCountOutputType[P] : never
  } 
      : CategoryCountOutputType




  // Custom InputTypes

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    image_url: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    image_url: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    image_url: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image_url?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image_url?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image_url?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    image_url: string
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    image_url?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mods?: boolean | User$modsArgs
    favoriteMods?: boolean | User$favoriteModsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    mods?: boolean | User$modsArgs
    favoriteMods?: boolean | User$favoriteModsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'mods' ? Array < ModGetPayload<S['include'][P]>>  :
        P extends 'favoriteMods' ? Array < ModFavoriteGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'mods' ? Array < ModGetPayload<S['select'][P]>>  :
        P extends 'favoriteMods' ? Array < ModFavoriteGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    mods<T extends User$modsArgs= {}>(args?: Subset<T, User$modsArgs>): Prisma.PrismaPromise<Array<ModGetPayload<T>>| Null>;

    favoriteMods<T extends User$favoriteModsArgs= {}>(args?: Subset<T, User$favoriteModsArgs>): Prisma.PrismaPromise<Array<ModFavoriteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.mods
   */
  export type User$modsArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    where?: ModWhereInput
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    cursor?: ModWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModScalarFieldEnum>
  }


  /**
   * User.favoriteMods
   */
  export type User$favoriteModsArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    where?: ModFavoriteWhereInput
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    cursor?: ModFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModFavoriteScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Model Mod
   */


  export type AggregateMod = {
    _count: ModCountAggregateOutputType | null
    _avg: ModAvgAggregateOutputType | null
    _sum: ModSumAggregateOutputType | null
    _min: ModMinAggregateOutputType | null
    _max: ModMaxAggregateOutputType | null
  }

  export type ModAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    categoryId: number | null
  }

  export type ModSumAggregateOutputType = {
    id: number | null
    userId: number | null
    categoryId: number | null
  }

  export type ModMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    shortDescription: string | null
    description: string | null
    isNSFW: boolean | null
    isApproved: boolean | null
    isFeatured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    categoryId: number | null
  }

  export type ModMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    shortDescription: string | null
    description: string | null
    isNSFW: boolean | null
    isApproved: boolean | null
    isFeatured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    categoryId: number | null
  }

  export type ModCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    shortDescription: number
    description: number
    isNSFW: number
    isApproved: number
    isFeatured: number
    createdAt: number
    updatedAt: number
    userId: number
    categoryId: number
    _all: number
  }


  export type ModAvgAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
  }

  export type ModSumAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
  }

  export type ModMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    isNSFW?: true
    isApproved?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    categoryId?: true
  }

  export type ModMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    isNSFW?: true
    isApproved?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    categoryId?: true
  }

  export type ModCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    isNSFW?: true
    isApproved?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    categoryId?: true
    _all?: true
  }

  export type ModAggregateArgs = {
    /**
     * Filter which Mod to aggregate.
     */
    where?: ModWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mods to fetch.
     */
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mods
    **/
    _count?: true | ModCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModMaxAggregateInputType
  }

  export type GetModAggregateType<T extends ModAggregateArgs> = {
        [P in keyof T & keyof AggregateMod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMod[P]>
      : GetScalarType<T[P], AggregateMod[P]>
  }




  export type ModGroupByArgs = {
    where?: ModWhereInput
    orderBy?: Enumerable<ModOrderByWithAggregationInput>
    by: ModScalarFieldEnum[]
    having?: ModScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModCountAggregateInputType | true
    _avg?: ModAvgAggregateInputType
    _sum?: ModSumAggregateInputType
    _min?: ModMinAggregateInputType
    _max?: ModMaxAggregateInputType
  }


  export type ModGroupByOutputType = {
    id: number
    name: string
    slug: string
    shortDescription: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt: Date
    updatedAt: Date
    userId: number | null
    categoryId: number | null
    _count: ModCountAggregateOutputType | null
    _avg: ModAvgAggregateOutputType | null
    _sum: ModSumAggregateOutputType | null
    _min: ModMinAggregateOutputType | null
    _max: ModMaxAggregateOutputType | null
  }

  type GetModGroupByPayload<T extends ModGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ModGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModGroupByOutputType[P]>
            : GetScalarType<T[P], ModGroupByOutputType[P]>
        }
      >
    >


  export type ModSelect = {
    id?: boolean
    name?: boolean
    slug?: boolean
    shortDescription?: boolean
    description?: boolean
    isNSFW?: boolean
    isApproved?: boolean
    isFeatured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    categoryId?: boolean
    user?: boolean | UserArgs
    category?: boolean | CategoryArgs
    versions?: boolean | Mod$versionsArgs
    tags?: boolean | Mod$tagsArgs
    images?: boolean | Mod$imagesArgs
    favorites?: boolean | Mod$favoritesArgs
    _count?: boolean | ModCountOutputTypeArgs
  }


  export type ModInclude = {
    user?: boolean | UserArgs
    category?: boolean | CategoryArgs
    versions?: boolean | Mod$versionsArgs
    tags?: boolean | Mod$tagsArgs
    images?: boolean | Mod$imagesArgs
    favorites?: boolean | Mod$favoritesArgs
    _count?: boolean | ModCountOutputTypeArgs
  }

  export type ModGetPayload<S extends boolean | null | undefined | ModArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Mod :
    S extends undefined ? never :
    S extends { include: any } & (ModArgs | ModFindManyArgs)
    ? Mod  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> | null :
        P extends 'category' ? CategoryGetPayload<S['include'][P]> | null :
        P extends 'versions' ? Array < ModVersionGetPayload<S['include'][P]>>  :
        P extends 'tags' ? Array < TagGetPayload<S['include'][P]>>  :
        P extends 'images' ? Array < ModImageGetPayload<S['include'][P]>>  :
        P extends 'favorites' ? Array < ModFavoriteGetPayload<S['include'][P]>>  :
        P extends '_count' ? ModCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ModArgs | ModFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> | null :
        P extends 'category' ? CategoryGetPayload<S['select'][P]> | null :
        P extends 'versions' ? Array < ModVersionGetPayload<S['select'][P]>>  :
        P extends 'tags' ? Array < TagGetPayload<S['select'][P]>>  :
        P extends 'images' ? Array < ModImageGetPayload<S['select'][P]>>  :
        P extends 'favorites' ? Array < ModFavoriteGetPayload<S['select'][P]>>  :
        P extends '_count' ? ModCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Mod ? Mod[P] : never
  } 
      : Mod


  type ModCountArgs = 
    Omit<ModFindManyArgs, 'select' | 'include'> & {
      select?: ModCountAggregateInputType | true
    }

  export interface ModDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Mod that matches the filter.
     * @param {ModFindUniqueArgs} args - Arguments to find a Mod
     * @example
     * // Get one Mod
     * const mod = await prisma.mod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Mod'> extends True ? Prisma__ModClient<ModGetPayload<T>> : Prisma__ModClient<ModGetPayload<T> | null, null>

    /**
     * Find one Mod that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModFindUniqueOrThrowArgs} args - Arguments to find a Mod
     * @example
     * // Get one Mod
     * const mod = await prisma.mod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ModFindUniqueOrThrowArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Find the first Mod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFindFirstArgs} args - Arguments to find a Mod
     * @example
     * // Get one Mod
     * const mod = await prisma.mod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Mod'> extends True ? Prisma__ModClient<ModGetPayload<T>> : Prisma__ModClient<ModGetPayload<T> | null, null>

    /**
     * Find the first Mod that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFindFirstOrThrowArgs} args - Arguments to find a Mod
     * @example
     * // Get one Mod
     * const mod = await prisma.mod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ModFindFirstOrThrowArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Find zero or more Mods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mods
     * const mods = await prisma.mod.findMany()
     * 
     * // Get first 10 Mods
     * const mods = await prisma.mod.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modWithIdOnly = await prisma.mod.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModFindManyArgs>(
      args?: SelectSubset<T, ModFindManyArgs>
    ): Prisma.PrismaPromise<Array<ModGetPayload<T>>>

    /**
     * Create a Mod.
     * @param {ModCreateArgs} args - Arguments to create a Mod.
     * @example
     * // Create one Mod
     * const Mod = await prisma.mod.create({
     *   data: {
     *     // ... data to create a Mod
     *   }
     * })
     * 
    **/
    create<T extends ModCreateArgs>(
      args: SelectSubset<T, ModCreateArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Create many Mods.
     *     @param {ModCreateManyArgs} args - Arguments to create many Mods.
     *     @example
     *     // Create many Mods
     *     const mod = await prisma.mod.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModCreateManyArgs>(
      args?: SelectSubset<T, ModCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mod.
     * @param {ModDeleteArgs} args - Arguments to delete one Mod.
     * @example
     * // Delete one Mod
     * const Mod = await prisma.mod.delete({
     *   where: {
     *     // ... filter to delete one Mod
     *   }
     * })
     * 
    **/
    delete<T extends ModDeleteArgs>(
      args: SelectSubset<T, ModDeleteArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Update one Mod.
     * @param {ModUpdateArgs} args - Arguments to update one Mod.
     * @example
     * // Update one Mod
     * const mod = await prisma.mod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModUpdateArgs>(
      args: SelectSubset<T, ModUpdateArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Delete zero or more Mods.
     * @param {ModDeleteManyArgs} args - Arguments to filter Mods to delete.
     * @example
     * // Delete a few Mods
     * const { count } = await prisma.mod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModDeleteManyArgs>(
      args?: SelectSubset<T, ModDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mods
     * const mod = await prisma.mod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModUpdateManyArgs>(
      args: SelectSubset<T, ModUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mod.
     * @param {ModUpsertArgs} args - Arguments to update or create a Mod.
     * @example
     * // Update or create a Mod
     * const mod = await prisma.mod.upsert({
     *   create: {
     *     // ... data to create a Mod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mod we want to update
     *   }
     * })
    **/
    upsert<T extends ModUpsertArgs>(
      args: SelectSubset<T, ModUpsertArgs>
    ): Prisma__ModClient<ModGetPayload<T>>

    /**
     * Count the number of Mods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModCountArgs} args - Arguments to filter Mods to count.
     * @example
     * // Count the number of Mods
     * const count = await prisma.mod.count({
     *   where: {
     *     // ... the filter for the Mods we want to count
     *   }
     * })
    **/
    count<T extends ModCountArgs>(
      args?: Subset<T, ModCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModAggregateArgs>(args: Subset<T, ModAggregateArgs>): Prisma.PrismaPromise<GetModAggregateType<T>>

    /**
     * Group by Mod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModGroupByArgs['orderBy'] }
        : { orderBy?: ModGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Mod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    category<T extends CategoryArgs= {}>(args?: Subset<T, CategoryArgs>): Prisma__CategoryClient<CategoryGetPayload<T> | Null>;

    versions<T extends Mod$versionsArgs= {}>(args?: Subset<T, Mod$versionsArgs>): Prisma.PrismaPromise<Array<ModVersionGetPayload<T>>| Null>;

    tags<T extends Mod$tagsArgs= {}>(args?: Subset<T, Mod$tagsArgs>): Prisma.PrismaPromise<Array<TagGetPayload<T>>| Null>;

    images<T extends Mod$imagesArgs= {}>(args?: Subset<T, Mod$imagesArgs>): Prisma.PrismaPromise<Array<ModImageGetPayload<T>>| Null>;

    favorites<T extends Mod$favoritesArgs= {}>(args?: Subset<T, Mod$favoritesArgs>): Prisma.PrismaPromise<Array<ModFavoriteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Mod base type for findUnique actions
   */
  export type ModFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter, which Mod to fetch.
     */
    where: ModWhereUniqueInput
  }

  /**
   * Mod findUnique
   */
  export interface ModFindUniqueArgs extends ModFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Mod findUniqueOrThrow
   */
  export type ModFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter, which Mod to fetch.
     */
    where: ModWhereUniqueInput
  }


  /**
   * Mod base type for findFirst actions
   */
  export type ModFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter, which Mod to fetch.
     */
    where?: ModWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mods to fetch.
     */
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mods.
     */
    cursor?: ModWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mods.
     */
    distinct?: Enumerable<ModScalarFieldEnum>
  }

  /**
   * Mod findFirst
   */
  export interface ModFindFirstArgs extends ModFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Mod findFirstOrThrow
   */
  export type ModFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter, which Mod to fetch.
     */
    where?: ModWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mods to fetch.
     */
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mods.
     */
    cursor?: ModWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mods.
     */
    distinct?: Enumerable<ModScalarFieldEnum>
  }


  /**
   * Mod findMany
   */
  export type ModFindManyArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter, which Mods to fetch.
     */
    where?: ModWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mods to fetch.
     */
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mods.
     */
    cursor?: ModWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mods.
     */
    skip?: number
    distinct?: Enumerable<ModScalarFieldEnum>
  }


  /**
   * Mod create
   */
  export type ModCreateArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * The data needed to create a Mod.
     */
    data: XOR<ModCreateInput, ModUncheckedCreateInput>
  }


  /**
   * Mod createMany
   */
  export type ModCreateManyArgs = {
    /**
     * The data used to create many Mods.
     */
    data: Enumerable<ModCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Mod update
   */
  export type ModUpdateArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * The data needed to update a Mod.
     */
    data: XOR<ModUpdateInput, ModUncheckedUpdateInput>
    /**
     * Choose, which Mod to update.
     */
    where: ModWhereUniqueInput
  }


  /**
   * Mod updateMany
   */
  export type ModUpdateManyArgs = {
    /**
     * The data used to update Mods.
     */
    data: XOR<ModUpdateManyMutationInput, ModUncheckedUpdateManyInput>
    /**
     * Filter which Mods to update
     */
    where?: ModWhereInput
  }


  /**
   * Mod upsert
   */
  export type ModUpsertArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * The filter to search for the Mod to update in case it exists.
     */
    where: ModWhereUniqueInput
    /**
     * In case the Mod found by the `where` argument doesn't exist, create a new Mod with this data.
     */
    create: XOR<ModCreateInput, ModUncheckedCreateInput>
    /**
     * In case the Mod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModUpdateInput, ModUncheckedUpdateInput>
  }


  /**
   * Mod delete
   */
  export type ModDeleteArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    /**
     * Filter which Mod to delete.
     */
    where: ModWhereUniqueInput
  }


  /**
   * Mod deleteMany
   */
  export type ModDeleteManyArgs = {
    /**
     * Filter which Mods to delete
     */
    where?: ModWhereInput
  }


  /**
   * Mod.versions
   */
  export type Mod$versionsArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    where?: ModVersionWhereInput
    orderBy?: Enumerable<ModVersionOrderByWithRelationInput>
    cursor?: ModVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModVersionScalarFieldEnum>
  }


  /**
   * Mod.tags
   */
  export type Mod$tagsArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Mod.images
   */
  export type Mod$imagesArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    where?: ModImageWhereInput
    orderBy?: Enumerable<ModImageOrderByWithRelationInput>
    cursor?: ModImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModImageScalarFieldEnum>
  }


  /**
   * Mod.favorites
   */
  export type Mod$favoritesArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    where?: ModFavoriteWhereInput
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    cursor?: ModFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModFavoriteScalarFieldEnum>
  }


  /**
   * Mod without action
   */
  export type ModArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
  }



  /**
   * Model ModImage
   */


  export type AggregateModImage = {
    _count: ModImageCountAggregateOutputType | null
    _avg: ModImageAvgAggregateOutputType | null
    _sum: ModImageSumAggregateOutputType | null
    _min: ModImageMinAggregateOutputType | null
    _max: ModImageMaxAggregateOutputType | null
  }

  export type ModImageAvgAggregateOutputType = {
    id: number | null
    modId: number | null
  }

  export type ModImageSumAggregateOutputType = {
    id: number | null
    modId: number | null
  }

  export type ModImageMinAggregateOutputType = {
    id: number | null
    url: string | null
    preview_url: string | null
    isPrimary: boolean | null
    isThumbnail: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    modId: number | null
  }

  export type ModImageMaxAggregateOutputType = {
    id: number | null
    url: string | null
    preview_url: string | null
    isPrimary: boolean | null
    isThumbnail: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    modId: number | null
  }

  export type ModImageCountAggregateOutputType = {
    id: number
    url: number
    preview_url: number
    isPrimary: number
    isThumbnail: number
    createdAt: number
    updatedAt: number
    modId: number
    _all: number
  }


  export type ModImageAvgAggregateInputType = {
    id?: true
    modId?: true
  }

  export type ModImageSumAggregateInputType = {
    id?: true
    modId?: true
  }

  export type ModImageMinAggregateInputType = {
    id?: true
    url?: true
    preview_url?: true
    isPrimary?: true
    isThumbnail?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
  }

  export type ModImageMaxAggregateInputType = {
    id?: true
    url?: true
    preview_url?: true
    isPrimary?: true
    isThumbnail?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
  }

  export type ModImageCountAggregateInputType = {
    id?: true
    url?: true
    preview_url?: true
    isPrimary?: true
    isThumbnail?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
    _all?: true
  }

  export type ModImageAggregateArgs = {
    /**
     * Filter which ModImage to aggregate.
     */
    where?: ModImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModImages to fetch.
     */
    orderBy?: Enumerable<ModImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModImages
    **/
    _count?: true | ModImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModImageMaxAggregateInputType
  }

  export type GetModImageAggregateType<T extends ModImageAggregateArgs> = {
        [P in keyof T & keyof AggregateModImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModImage[P]>
      : GetScalarType<T[P], AggregateModImage[P]>
  }




  export type ModImageGroupByArgs = {
    where?: ModImageWhereInput
    orderBy?: Enumerable<ModImageOrderByWithAggregationInput>
    by: ModImageScalarFieldEnum[]
    having?: ModImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModImageCountAggregateInputType | true
    _avg?: ModImageAvgAggregateInputType
    _sum?: ModImageSumAggregateInputType
    _min?: ModImageMinAggregateInputType
    _max?: ModImageMaxAggregateInputType
  }


  export type ModImageGroupByOutputType = {
    id: number
    url: string
    preview_url: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt: Date
    updatedAt: Date
    modId: number | null
    _count: ModImageCountAggregateOutputType | null
    _avg: ModImageAvgAggregateOutputType | null
    _sum: ModImageSumAggregateOutputType | null
    _min: ModImageMinAggregateOutputType | null
    _max: ModImageMaxAggregateOutputType | null
  }

  type GetModImageGroupByPayload<T extends ModImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ModImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModImageGroupByOutputType[P]>
            : GetScalarType<T[P], ModImageGroupByOutputType[P]>
        }
      >
    >


  export type ModImageSelect = {
    id?: boolean
    url?: boolean
    preview_url?: boolean
    isPrimary?: boolean
    isThumbnail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modId?: boolean
    mod?: boolean | ModArgs
  }


  export type ModImageInclude = {
    mod?: boolean | ModArgs
  }

  export type ModImageGetPayload<S extends boolean | null | undefined | ModImageArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModImage :
    S extends undefined ? never :
    S extends { include: any } & (ModImageArgs | ModImageFindManyArgs)
    ? ModImage  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'mod' ? ModGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (ModImageArgs | ModImageFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'mod' ? ModGetPayload<S['select'][P]> | null :  P extends keyof ModImage ? ModImage[P] : never
  } 
      : ModImage


  type ModImageCountArgs = 
    Omit<ModImageFindManyArgs, 'select' | 'include'> & {
      select?: ModImageCountAggregateInputType | true
    }

  export interface ModImageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one ModImage that matches the filter.
     * @param {ModImageFindUniqueArgs} args - Arguments to find a ModImage
     * @example
     * // Get one ModImage
     * const modImage = await prisma.modImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModImageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModImageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModImage'> extends True ? Prisma__ModImageClient<ModImageGetPayload<T>> : Prisma__ModImageClient<ModImageGetPayload<T> | null, null>

    /**
     * Find one ModImage that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModImageFindUniqueOrThrowArgs} args - Arguments to find a ModImage
     * @example
     * // Get one ModImage
     * const modImage = await prisma.modImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModImageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ModImageFindUniqueOrThrowArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Find the first ModImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageFindFirstArgs} args - Arguments to find a ModImage
     * @example
     * // Get one ModImage
     * const modImage = await prisma.modImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModImageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModImageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModImage'> extends True ? Prisma__ModImageClient<ModImageGetPayload<T>> : Prisma__ModImageClient<ModImageGetPayload<T> | null, null>

    /**
     * Find the first ModImage that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageFindFirstOrThrowArgs} args - Arguments to find a ModImage
     * @example
     * // Get one ModImage
     * const modImage = await prisma.modImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModImageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ModImageFindFirstOrThrowArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Find zero or more ModImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModImages
     * const modImages = await prisma.modImage.findMany()
     * 
     * // Get first 10 ModImages
     * const modImages = await prisma.modImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modImageWithIdOnly = await prisma.modImage.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModImageFindManyArgs>(
      args?: SelectSubset<T, ModImageFindManyArgs>
    ): Prisma.PrismaPromise<Array<ModImageGetPayload<T>>>

    /**
     * Create a ModImage.
     * @param {ModImageCreateArgs} args - Arguments to create a ModImage.
     * @example
     * // Create one ModImage
     * const ModImage = await prisma.modImage.create({
     *   data: {
     *     // ... data to create a ModImage
     *   }
     * })
     * 
    **/
    create<T extends ModImageCreateArgs>(
      args: SelectSubset<T, ModImageCreateArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Create many ModImages.
     *     @param {ModImageCreateManyArgs} args - Arguments to create many ModImages.
     *     @example
     *     // Create many ModImages
     *     const modImage = await prisma.modImage.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModImageCreateManyArgs>(
      args?: SelectSubset<T, ModImageCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModImage.
     * @param {ModImageDeleteArgs} args - Arguments to delete one ModImage.
     * @example
     * // Delete one ModImage
     * const ModImage = await prisma.modImage.delete({
     *   where: {
     *     // ... filter to delete one ModImage
     *   }
     * })
     * 
    **/
    delete<T extends ModImageDeleteArgs>(
      args: SelectSubset<T, ModImageDeleteArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Update one ModImage.
     * @param {ModImageUpdateArgs} args - Arguments to update one ModImage.
     * @example
     * // Update one ModImage
     * const modImage = await prisma.modImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModImageUpdateArgs>(
      args: SelectSubset<T, ModImageUpdateArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Delete zero or more ModImages.
     * @param {ModImageDeleteManyArgs} args - Arguments to filter ModImages to delete.
     * @example
     * // Delete a few ModImages
     * const { count } = await prisma.modImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModImageDeleteManyArgs>(
      args?: SelectSubset<T, ModImageDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModImages
     * const modImage = await prisma.modImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModImageUpdateManyArgs>(
      args: SelectSubset<T, ModImageUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModImage.
     * @param {ModImageUpsertArgs} args - Arguments to update or create a ModImage.
     * @example
     * // Update or create a ModImage
     * const modImage = await prisma.modImage.upsert({
     *   create: {
     *     // ... data to create a ModImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModImage we want to update
     *   }
     * })
    **/
    upsert<T extends ModImageUpsertArgs>(
      args: SelectSubset<T, ModImageUpsertArgs>
    ): Prisma__ModImageClient<ModImageGetPayload<T>>

    /**
     * Count the number of ModImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageCountArgs} args - Arguments to filter ModImages to count.
     * @example
     * // Count the number of ModImages
     * const count = await prisma.modImage.count({
     *   where: {
     *     // ... the filter for the ModImages we want to count
     *   }
     * })
    **/
    count<T extends ModImageCountArgs>(
      args?: Subset<T, ModImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModImageAggregateArgs>(args: Subset<T, ModImageAggregateArgs>): Prisma.PrismaPromise<GetModImageAggregateType<T>>

    /**
     * Group by ModImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModImageGroupByArgs['orderBy'] }
        : { orderBy?: ModImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ModImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModImageClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    mod<T extends ModArgs= {}>(args?: Subset<T, ModArgs>): Prisma__ModClient<ModGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ModImage base type for findUnique actions
   */
  export type ModImageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter, which ModImage to fetch.
     */
    where: ModImageWhereUniqueInput
  }

  /**
   * ModImage findUnique
   */
  export interface ModImageFindUniqueArgs extends ModImageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModImage findUniqueOrThrow
   */
  export type ModImageFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter, which ModImage to fetch.
     */
    where: ModImageWhereUniqueInput
  }


  /**
   * ModImage base type for findFirst actions
   */
  export type ModImageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter, which ModImage to fetch.
     */
    where?: ModImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModImages to fetch.
     */
    orderBy?: Enumerable<ModImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModImages.
     */
    cursor?: ModImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModImages.
     */
    distinct?: Enumerable<ModImageScalarFieldEnum>
  }

  /**
   * ModImage findFirst
   */
  export interface ModImageFindFirstArgs extends ModImageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModImage findFirstOrThrow
   */
  export type ModImageFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter, which ModImage to fetch.
     */
    where?: ModImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModImages to fetch.
     */
    orderBy?: Enumerable<ModImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModImages.
     */
    cursor?: ModImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModImages.
     */
    distinct?: Enumerable<ModImageScalarFieldEnum>
  }


  /**
   * ModImage findMany
   */
  export type ModImageFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter, which ModImages to fetch.
     */
    where?: ModImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModImages to fetch.
     */
    orderBy?: Enumerable<ModImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModImages.
     */
    cursor?: ModImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModImages.
     */
    skip?: number
    distinct?: Enumerable<ModImageScalarFieldEnum>
  }


  /**
   * ModImage create
   */
  export type ModImageCreateArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * The data needed to create a ModImage.
     */
    data: XOR<ModImageCreateInput, ModImageUncheckedCreateInput>
  }


  /**
   * ModImage createMany
   */
  export type ModImageCreateManyArgs = {
    /**
     * The data used to create many ModImages.
     */
    data: Enumerable<ModImageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModImage update
   */
  export type ModImageUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * The data needed to update a ModImage.
     */
    data: XOR<ModImageUpdateInput, ModImageUncheckedUpdateInput>
    /**
     * Choose, which ModImage to update.
     */
    where: ModImageWhereUniqueInput
  }


  /**
   * ModImage updateMany
   */
  export type ModImageUpdateManyArgs = {
    /**
     * The data used to update ModImages.
     */
    data: XOR<ModImageUpdateManyMutationInput, ModImageUncheckedUpdateManyInput>
    /**
     * Filter which ModImages to update
     */
    where?: ModImageWhereInput
  }


  /**
   * ModImage upsert
   */
  export type ModImageUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * The filter to search for the ModImage to update in case it exists.
     */
    where: ModImageWhereUniqueInput
    /**
     * In case the ModImage found by the `where` argument doesn't exist, create a new ModImage with this data.
     */
    create: XOR<ModImageCreateInput, ModImageUncheckedCreateInput>
    /**
     * In case the ModImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModImageUpdateInput, ModImageUncheckedUpdateInput>
  }


  /**
   * ModImage delete
   */
  export type ModImageDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
    /**
     * Filter which ModImage to delete.
     */
    where: ModImageWhereUniqueInput
  }


  /**
   * ModImage deleteMany
   */
  export type ModImageDeleteManyArgs = {
    /**
     * Filter which ModImages to delete
     */
    where?: ModImageWhereInput
  }


  /**
   * ModImage without action
   */
  export type ModImageArgs = {
    /**
     * Select specific fields to fetch from the ModImage
     */
    select?: ModImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModImageInclude | null
  }



  /**
   * Model ModVersion
   */


  export type AggregateModVersion = {
    _count: ModVersionCountAggregateOutputType | null
    _avg: ModVersionAvgAggregateOutputType | null
    _sum: ModVersionSumAggregateOutputType | null
    _min: ModVersionMinAggregateOutputType | null
    _max: ModVersionMaxAggregateOutputType | null
  }

  export type ModVersionAvgAggregateOutputType = {
    id: number | null
    modId: number | null
  }

  export type ModVersionSumAggregateOutputType = {
    id: number | null
    modId: number | null
  }

  export type ModVersionMinAggregateOutputType = {
    id: number | null
    version: string | null
    isLatest: boolean | null
    changelog: string | null
    downloadUrl: string | null
    extension: string | null
    filename: string | null
    createdAt: Date | null
    updatedAt: Date | null
    modId: number | null
  }

  export type ModVersionMaxAggregateOutputType = {
    id: number | null
    version: string | null
    isLatest: boolean | null
    changelog: string | null
    downloadUrl: string | null
    extension: string | null
    filename: string | null
    createdAt: Date | null
    updatedAt: Date | null
    modId: number | null
  }

  export type ModVersionCountAggregateOutputType = {
    id: number
    version: number
    isLatest: number
    changelog: number
    downloadUrl: number
    extension: number
    filename: number
    createdAt: number
    updatedAt: number
    modId: number
    _all: number
  }


  export type ModVersionAvgAggregateInputType = {
    id?: true
    modId?: true
  }

  export type ModVersionSumAggregateInputType = {
    id?: true
    modId?: true
  }

  export type ModVersionMinAggregateInputType = {
    id?: true
    version?: true
    isLatest?: true
    changelog?: true
    downloadUrl?: true
    extension?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
  }

  export type ModVersionMaxAggregateInputType = {
    id?: true
    version?: true
    isLatest?: true
    changelog?: true
    downloadUrl?: true
    extension?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
  }

  export type ModVersionCountAggregateInputType = {
    id?: true
    version?: true
    isLatest?: true
    changelog?: true
    downloadUrl?: true
    extension?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
    modId?: true
    _all?: true
  }

  export type ModVersionAggregateArgs = {
    /**
     * Filter which ModVersion to aggregate.
     */
    where?: ModVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModVersions to fetch.
     */
    orderBy?: Enumerable<ModVersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModVersions
    **/
    _count?: true | ModVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModVersionMaxAggregateInputType
  }

  export type GetModVersionAggregateType<T extends ModVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateModVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModVersion[P]>
      : GetScalarType<T[P], AggregateModVersion[P]>
  }




  export type ModVersionGroupByArgs = {
    where?: ModVersionWhereInput
    orderBy?: Enumerable<ModVersionOrderByWithAggregationInput>
    by: ModVersionScalarFieldEnum[]
    having?: ModVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModVersionCountAggregateInputType | true
    _avg?: ModVersionAvgAggregateInputType
    _sum?: ModVersionSumAggregateInputType
    _min?: ModVersionMinAggregateInputType
    _max?: ModVersionMaxAggregateInputType
  }


  export type ModVersionGroupByOutputType = {
    id: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension: string | null
    filename: string | null
    createdAt: Date
    updatedAt: Date
    modId: number | null
    _count: ModVersionCountAggregateOutputType | null
    _avg: ModVersionAvgAggregateOutputType | null
    _sum: ModVersionSumAggregateOutputType | null
    _min: ModVersionMinAggregateOutputType | null
    _max: ModVersionMaxAggregateOutputType | null
  }

  type GetModVersionGroupByPayload<T extends ModVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ModVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModVersionGroupByOutputType[P]>
            : GetScalarType<T[P], ModVersionGroupByOutputType[P]>
        }
      >
    >


  export type ModVersionSelect = {
    id?: boolean
    version?: boolean
    isLatest?: boolean
    changelog?: boolean
    downloadUrl?: boolean
    extension?: boolean
    filename?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modId?: boolean
    mod?: boolean | ModArgs
    downloads?: boolean | ModVersion$downloadsArgs
    _count?: boolean | ModVersionCountOutputTypeArgs
  }


  export type ModVersionInclude = {
    mod?: boolean | ModArgs
    downloads?: boolean | ModVersion$downloadsArgs
    _count?: boolean | ModVersionCountOutputTypeArgs
  }

  export type ModVersionGetPayload<S extends boolean | null | undefined | ModVersionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModVersion :
    S extends undefined ? never :
    S extends { include: any } & (ModVersionArgs | ModVersionFindManyArgs)
    ? ModVersion  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'mod' ? ModGetPayload<S['include'][P]> | null :
        P extends 'downloads' ? Array < ModDownloadGetPayload<S['include'][P]>>  :
        P extends '_count' ? ModVersionCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ModVersionArgs | ModVersionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'mod' ? ModGetPayload<S['select'][P]> | null :
        P extends 'downloads' ? Array < ModDownloadGetPayload<S['select'][P]>>  :
        P extends '_count' ? ModVersionCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof ModVersion ? ModVersion[P] : never
  } 
      : ModVersion


  type ModVersionCountArgs = 
    Omit<ModVersionFindManyArgs, 'select' | 'include'> & {
      select?: ModVersionCountAggregateInputType | true
    }

  export interface ModVersionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one ModVersion that matches the filter.
     * @param {ModVersionFindUniqueArgs} args - Arguments to find a ModVersion
     * @example
     * // Get one ModVersion
     * const modVersion = await prisma.modVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModVersionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModVersionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModVersion'> extends True ? Prisma__ModVersionClient<ModVersionGetPayload<T>> : Prisma__ModVersionClient<ModVersionGetPayload<T> | null, null>

    /**
     * Find one ModVersion that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModVersionFindUniqueOrThrowArgs} args - Arguments to find a ModVersion
     * @example
     * // Get one ModVersion
     * const modVersion = await prisma.modVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModVersionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ModVersionFindUniqueOrThrowArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Find the first ModVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionFindFirstArgs} args - Arguments to find a ModVersion
     * @example
     * // Get one ModVersion
     * const modVersion = await prisma.modVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModVersionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModVersionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModVersion'> extends True ? Prisma__ModVersionClient<ModVersionGetPayload<T>> : Prisma__ModVersionClient<ModVersionGetPayload<T> | null, null>

    /**
     * Find the first ModVersion that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionFindFirstOrThrowArgs} args - Arguments to find a ModVersion
     * @example
     * // Get one ModVersion
     * const modVersion = await prisma.modVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModVersionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ModVersionFindFirstOrThrowArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Find zero or more ModVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModVersions
     * const modVersions = await prisma.modVersion.findMany()
     * 
     * // Get first 10 ModVersions
     * const modVersions = await prisma.modVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modVersionWithIdOnly = await prisma.modVersion.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModVersionFindManyArgs>(
      args?: SelectSubset<T, ModVersionFindManyArgs>
    ): Prisma.PrismaPromise<Array<ModVersionGetPayload<T>>>

    /**
     * Create a ModVersion.
     * @param {ModVersionCreateArgs} args - Arguments to create a ModVersion.
     * @example
     * // Create one ModVersion
     * const ModVersion = await prisma.modVersion.create({
     *   data: {
     *     // ... data to create a ModVersion
     *   }
     * })
     * 
    **/
    create<T extends ModVersionCreateArgs>(
      args: SelectSubset<T, ModVersionCreateArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Create many ModVersions.
     *     @param {ModVersionCreateManyArgs} args - Arguments to create many ModVersions.
     *     @example
     *     // Create many ModVersions
     *     const modVersion = await prisma.modVersion.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModVersionCreateManyArgs>(
      args?: SelectSubset<T, ModVersionCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModVersion.
     * @param {ModVersionDeleteArgs} args - Arguments to delete one ModVersion.
     * @example
     * // Delete one ModVersion
     * const ModVersion = await prisma.modVersion.delete({
     *   where: {
     *     // ... filter to delete one ModVersion
     *   }
     * })
     * 
    **/
    delete<T extends ModVersionDeleteArgs>(
      args: SelectSubset<T, ModVersionDeleteArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Update one ModVersion.
     * @param {ModVersionUpdateArgs} args - Arguments to update one ModVersion.
     * @example
     * // Update one ModVersion
     * const modVersion = await prisma.modVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModVersionUpdateArgs>(
      args: SelectSubset<T, ModVersionUpdateArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Delete zero or more ModVersions.
     * @param {ModVersionDeleteManyArgs} args - Arguments to filter ModVersions to delete.
     * @example
     * // Delete a few ModVersions
     * const { count } = await prisma.modVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModVersionDeleteManyArgs>(
      args?: SelectSubset<T, ModVersionDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModVersions
     * const modVersion = await prisma.modVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModVersionUpdateManyArgs>(
      args: SelectSubset<T, ModVersionUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModVersion.
     * @param {ModVersionUpsertArgs} args - Arguments to update or create a ModVersion.
     * @example
     * // Update or create a ModVersion
     * const modVersion = await prisma.modVersion.upsert({
     *   create: {
     *     // ... data to create a ModVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModVersion we want to update
     *   }
     * })
    **/
    upsert<T extends ModVersionUpsertArgs>(
      args: SelectSubset<T, ModVersionUpsertArgs>
    ): Prisma__ModVersionClient<ModVersionGetPayload<T>>

    /**
     * Count the number of ModVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionCountArgs} args - Arguments to filter ModVersions to count.
     * @example
     * // Count the number of ModVersions
     * const count = await prisma.modVersion.count({
     *   where: {
     *     // ... the filter for the ModVersions we want to count
     *   }
     * })
    **/
    count<T extends ModVersionCountArgs>(
      args?: Subset<T, ModVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModVersionAggregateArgs>(args: Subset<T, ModVersionAggregateArgs>): Prisma.PrismaPromise<GetModVersionAggregateType<T>>

    /**
     * Group by ModVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModVersionGroupByArgs['orderBy'] }
        : { orderBy?: ModVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ModVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModVersionClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    mod<T extends ModArgs= {}>(args?: Subset<T, ModArgs>): Prisma__ModClient<ModGetPayload<T> | Null>;

    downloads<T extends ModVersion$downloadsArgs= {}>(args?: Subset<T, ModVersion$downloadsArgs>): Prisma.PrismaPromise<Array<ModDownloadGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ModVersion base type for findUnique actions
   */
  export type ModVersionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter, which ModVersion to fetch.
     */
    where: ModVersionWhereUniqueInput
  }

  /**
   * ModVersion findUnique
   */
  export interface ModVersionFindUniqueArgs extends ModVersionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModVersion findUniqueOrThrow
   */
  export type ModVersionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter, which ModVersion to fetch.
     */
    where: ModVersionWhereUniqueInput
  }


  /**
   * ModVersion base type for findFirst actions
   */
  export type ModVersionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter, which ModVersion to fetch.
     */
    where?: ModVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModVersions to fetch.
     */
    orderBy?: Enumerable<ModVersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModVersions.
     */
    cursor?: ModVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModVersions.
     */
    distinct?: Enumerable<ModVersionScalarFieldEnum>
  }

  /**
   * ModVersion findFirst
   */
  export interface ModVersionFindFirstArgs extends ModVersionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModVersion findFirstOrThrow
   */
  export type ModVersionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter, which ModVersion to fetch.
     */
    where?: ModVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModVersions to fetch.
     */
    orderBy?: Enumerable<ModVersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModVersions.
     */
    cursor?: ModVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModVersions.
     */
    distinct?: Enumerable<ModVersionScalarFieldEnum>
  }


  /**
   * ModVersion findMany
   */
  export type ModVersionFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter, which ModVersions to fetch.
     */
    where?: ModVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModVersions to fetch.
     */
    orderBy?: Enumerable<ModVersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModVersions.
     */
    cursor?: ModVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModVersions.
     */
    skip?: number
    distinct?: Enumerable<ModVersionScalarFieldEnum>
  }


  /**
   * ModVersion create
   */
  export type ModVersionCreateArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * The data needed to create a ModVersion.
     */
    data: XOR<ModVersionCreateInput, ModVersionUncheckedCreateInput>
  }


  /**
   * ModVersion createMany
   */
  export type ModVersionCreateManyArgs = {
    /**
     * The data used to create many ModVersions.
     */
    data: Enumerable<ModVersionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModVersion update
   */
  export type ModVersionUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * The data needed to update a ModVersion.
     */
    data: XOR<ModVersionUpdateInput, ModVersionUncheckedUpdateInput>
    /**
     * Choose, which ModVersion to update.
     */
    where: ModVersionWhereUniqueInput
  }


  /**
   * ModVersion updateMany
   */
  export type ModVersionUpdateManyArgs = {
    /**
     * The data used to update ModVersions.
     */
    data: XOR<ModVersionUpdateManyMutationInput, ModVersionUncheckedUpdateManyInput>
    /**
     * Filter which ModVersions to update
     */
    where?: ModVersionWhereInput
  }


  /**
   * ModVersion upsert
   */
  export type ModVersionUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * The filter to search for the ModVersion to update in case it exists.
     */
    where: ModVersionWhereUniqueInput
    /**
     * In case the ModVersion found by the `where` argument doesn't exist, create a new ModVersion with this data.
     */
    create: XOR<ModVersionCreateInput, ModVersionUncheckedCreateInput>
    /**
     * In case the ModVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModVersionUpdateInput, ModVersionUncheckedUpdateInput>
  }


  /**
   * ModVersion delete
   */
  export type ModVersionDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
    /**
     * Filter which ModVersion to delete.
     */
    where: ModVersionWhereUniqueInput
  }


  /**
   * ModVersion deleteMany
   */
  export type ModVersionDeleteManyArgs = {
    /**
     * Filter which ModVersions to delete
     */
    where?: ModVersionWhereInput
  }


  /**
   * ModVersion.downloads
   */
  export type ModVersion$downloadsArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    where?: ModDownloadWhereInput
    orderBy?: Enumerable<ModDownloadOrderByWithRelationInput>
    cursor?: ModDownloadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModDownloadScalarFieldEnum>
  }


  /**
   * ModVersion without action
   */
  export type ModVersionArgs = {
    /**
     * Select specific fields to fetch from the ModVersion
     */
    select?: ModVersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModVersionInclude | null
  }



  /**
   * Model Tag
   */


  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TagAggregateArgs = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs = {
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithAggregationInput>
    by: TagScalarFieldEnum[]
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }


  export type TagGroupByOutputType = {
    id: number
    name: string
    slug: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mods?: boolean | Tag$modsArgs
    _count?: boolean | TagCountOutputTypeArgs
  }


  export type TagInclude = {
    mods?: boolean | Tag$modsArgs
    _count?: boolean | TagCountOutputTypeArgs
  }

  export type TagGetPayload<S extends boolean | null | undefined | TagArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tag :
    S extends undefined ? never :
    S extends { include: any } & (TagArgs | TagFindManyArgs)
    ? Tag  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'mods' ? Array < ModGetPayload<S['include'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TagArgs | TagFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'mods' ? Array < ModGetPayload<S['select'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Tag ? Tag[P] : never
  } 
      : Tag


  type TagCountArgs = 
    Omit<TagFindManyArgs, 'select' | 'include'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find one Tag that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TagFindUniqueOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find the first Tag that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TagFindFirstOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagFindManyArgs>(
      args?: SelectSubset<T, TagFindManyArgs>
    ): Prisma.PrismaPromise<Array<TagGetPayload<T>>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
    **/
    create<T extends TagCreateArgs>(
      args: SelectSubset<T, TagCreateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Create many Tags.
     *     @param {TagCreateManyArgs} args - Arguments to create many Tags.
     *     @example
     *     // Create many Tags
     *     const tag = await prisma.tag.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagCreateManyArgs>(
      args?: SelectSubset<T, TagCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
    **/
    delete<T extends TagDeleteArgs>(
      args: SelectSubset<T, TagDeleteArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagUpdateArgs>(
      args: SelectSubset<T, TagUpdateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagDeleteManyArgs>(
      args?: SelectSubset<T, TagDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagUpdateManyArgs>(
      args: SelectSubset<T, TagUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
    **/
    upsert<T extends TagUpsertArgs>(
      args: SelectSubset<T, TagUpsertArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    mods<T extends Tag$modsArgs= {}>(args?: Subset<T, Tag$modsArgs>): Prisma.PrismaPromise<Array<ModGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tag base type for findUnique actions
   */
  export type TagFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUnique
   */
  export interface TagFindUniqueArgs extends TagFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag base type for findFirst actions
   */
  export type TagFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }

  /**
   * Tag findFirst
   */
  export interface TagFindFirstArgs extends TagFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag findMany
   */
  export type TagFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag create
   */
  export type TagCreateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }


  /**
   * Tag createMany
   */
  export type TagCreateManyArgs = {
    /**
     * The data used to create many Tags.
     */
    data: Enumerable<TagCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tag update
   */
  export type TagUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
  }


  /**
   * Tag upsert
   */
  export type TagUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }


  /**
   * Tag delete
   */
  export type TagDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
  }


  /**
   * Tag.mods
   */
  export type Tag$modsArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    where?: ModWhereInput
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    cursor?: ModWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModScalarFieldEnum>
  }


  /**
   * Tag without action
   */
  export type TagArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs = {
    where?: CategoryWhereInput
    orderBy?: Enumerable<CategoryOrderByWithAggregationInput>
    by: CategoryScalarFieldEnum[]
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }


  export type CategoryGroupByOutputType = {
    id: number
    name: string
    slug: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mods?: boolean | Category$modsArgs
    _count?: boolean | CategoryCountOutputTypeArgs
  }


  export type CategoryInclude = {
    mods?: boolean | Category$modsArgs
    _count?: boolean | CategoryCountOutputTypeArgs
  }

  export type CategoryGetPayload<S extends boolean | null | undefined | CategoryArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Category :
    S extends undefined ? never :
    S extends { include: any } & (CategoryArgs | CategoryFindManyArgs)
    ? Category  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'mods' ? Array < ModGetPayload<S['include'][P]>>  :
        P extends '_count' ? CategoryCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (CategoryArgs | CategoryFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'mods' ? Array < ModGetPayload<S['select'][P]>>  :
        P extends '_count' ? CategoryCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Category ? Category[P] : never
  } 
      : Category


  type CategoryCountArgs = 
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Category'> extends True ? Prisma__CategoryClient<CategoryGetPayload<T>> : Prisma__CategoryClient<CategoryGetPayload<T> | null, null>

    /**
     * Find one Category that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindUniqueOrThrowArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Category'> extends True ? Prisma__CategoryClient<CategoryGetPayload<T>> : Prisma__CategoryClient<CategoryGetPayload<T> | null, null>

    /**
     * Find the first Category that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs>
    ): Prisma.PrismaPromise<Array<CategoryGetPayload<T>>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    mods<T extends Category$modsArgs= {}>(args?: Subset<T, Category$modsArgs>): Prisma.PrismaPromise<Array<ModGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Category base type for findUnique actions
   */
  export type CategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUnique
   */
  export interface CategoryFindUniqueArgs extends CategoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category base type for findFirst actions
   */
  export type CategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }

  /**
   * Category findFirst
   */
  export interface CategoryFindFirstArgs extends CategoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs = {
    /**
     * The data used to create many Categories.
     */
    data: Enumerable<CategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }


  /**
   * Category.mods
   */
  export type Category$modsArgs = {
    /**
     * Select specific fields to fetch from the Mod
     */
    select?: ModSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModInclude | null
    where?: ModWhereInput
    orderBy?: Enumerable<ModOrderByWithRelationInput>
    cursor?: ModWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ModScalarFieldEnum>
  }


  /**
   * Category without action
   */
  export type CategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude | null
  }



  /**
   * Model ModDownload
   */


  export type AggregateModDownload = {
    _count: ModDownloadCountAggregateOutputType | null
    _avg: ModDownloadAvgAggregateOutputType | null
    _sum: ModDownloadSumAggregateOutputType | null
    _min: ModDownloadMinAggregateOutputType | null
    _max: ModDownloadMaxAggregateOutputType | null
  }

  export type ModDownloadAvgAggregateOutputType = {
    id: number | null
    modVersionId: number | null
  }

  export type ModDownloadSumAggregateOutputType = {
    id: number | null
    modVersionId: number | null
  }

  export type ModDownloadMinAggregateOutputType = {
    id: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    modVersionId: number | null
  }

  export type ModDownloadMaxAggregateOutputType = {
    id: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    modVersionId: number | null
  }

  export type ModDownloadCountAggregateOutputType = {
    id: number
    ip: number
    userAgent: number
    createdAt: number
    updatedAt: number
    modVersionId: number
    _all: number
  }


  export type ModDownloadAvgAggregateInputType = {
    id?: true
    modVersionId?: true
  }

  export type ModDownloadSumAggregateInputType = {
    id?: true
    modVersionId?: true
  }

  export type ModDownloadMinAggregateInputType = {
    id?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    modVersionId?: true
  }

  export type ModDownloadMaxAggregateInputType = {
    id?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    modVersionId?: true
  }

  export type ModDownloadCountAggregateInputType = {
    id?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    modVersionId?: true
    _all?: true
  }

  export type ModDownloadAggregateArgs = {
    /**
     * Filter which ModDownload to aggregate.
     */
    where?: ModDownloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModDownloads to fetch.
     */
    orderBy?: Enumerable<ModDownloadOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModDownloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModDownloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModDownloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModDownloads
    **/
    _count?: true | ModDownloadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModDownloadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModDownloadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModDownloadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModDownloadMaxAggregateInputType
  }

  export type GetModDownloadAggregateType<T extends ModDownloadAggregateArgs> = {
        [P in keyof T & keyof AggregateModDownload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModDownload[P]>
      : GetScalarType<T[P], AggregateModDownload[P]>
  }




  export type ModDownloadGroupByArgs = {
    where?: ModDownloadWhereInput
    orderBy?: Enumerable<ModDownloadOrderByWithAggregationInput>
    by: ModDownloadScalarFieldEnum[]
    having?: ModDownloadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModDownloadCountAggregateInputType | true
    _avg?: ModDownloadAvgAggregateInputType
    _sum?: ModDownloadSumAggregateInputType
    _min?: ModDownloadMinAggregateInputType
    _max?: ModDownloadMaxAggregateInputType
  }


  export type ModDownloadGroupByOutputType = {
    id: number
    ip: string
    userAgent: string
    createdAt: Date
    updatedAt: Date
    modVersionId: number | null
    _count: ModDownloadCountAggregateOutputType | null
    _avg: ModDownloadAvgAggregateOutputType | null
    _sum: ModDownloadSumAggregateOutputType | null
    _min: ModDownloadMinAggregateOutputType | null
    _max: ModDownloadMaxAggregateOutputType | null
  }

  type GetModDownloadGroupByPayload<T extends ModDownloadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ModDownloadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModDownloadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModDownloadGroupByOutputType[P]>
            : GetScalarType<T[P], ModDownloadGroupByOutputType[P]>
        }
      >
    >


  export type ModDownloadSelect = {
    id?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modVersionId?: boolean
    version?: boolean | ModVersionArgs
  }


  export type ModDownloadInclude = {
    version?: boolean | ModVersionArgs
  }

  export type ModDownloadGetPayload<S extends boolean | null | undefined | ModDownloadArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModDownload :
    S extends undefined ? never :
    S extends { include: any } & (ModDownloadArgs | ModDownloadFindManyArgs)
    ? ModDownload  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'version' ? ModVersionGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (ModDownloadArgs | ModDownloadFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'version' ? ModVersionGetPayload<S['select'][P]> | null :  P extends keyof ModDownload ? ModDownload[P] : never
  } 
      : ModDownload


  type ModDownloadCountArgs = 
    Omit<ModDownloadFindManyArgs, 'select' | 'include'> & {
      select?: ModDownloadCountAggregateInputType | true
    }

  export interface ModDownloadDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one ModDownload that matches the filter.
     * @param {ModDownloadFindUniqueArgs} args - Arguments to find a ModDownload
     * @example
     * // Get one ModDownload
     * const modDownload = await prisma.modDownload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModDownloadFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModDownloadFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModDownload'> extends True ? Prisma__ModDownloadClient<ModDownloadGetPayload<T>> : Prisma__ModDownloadClient<ModDownloadGetPayload<T> | null, null>

    /**
     * Find one ModDownload that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModDownloadFindUniqueOrThrowArgs} args - Arguments to find a ModDownload
     * @example
     * // Get one ModDownload
     * const modDownload = await prisma.modDownload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModDownloadFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ModDownloadFindUniqueOrThrowArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Find the first ModDownload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadFindFirstArgs} args - Arguments to find a ModDownload
     * @example
     * // Get one ModDownload
     * const modDownload = await prisma.modDownload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModDownloadFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModDownloadFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModDownload'> extends True ? Prisma__ModDownloadClient<ModDownloadGetPayload<T>> : Prisma__ModDownloadClient<ModDownloadGetPayload<T> | null, null>

    /**
     * Find the first ModDownload that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadFindFirstOrThrowArgs} args - Arguments to find a ModDownload
     * @example
     * // Get one ModDownload
     * const modDownload = await prisma.modDownload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModDownloadFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ModDownloadFindFirstOrThrowArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Find zero or more ModDownloads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModDownloads
     * const modDownloads = await prisma.modDownload.findMany()
     * 
     * // Get first 10 ModDownloads
     * const modDownloads = await prisma.modDownload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modDownloadWithIdOnly = await prisma.modDownload.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModDownloadFindManyArgs>(
      args?: SelectSubset<T, ModDownloadFindManyArgs>
    ): Prisma.PrismaPromise<Array<ModDownloadGetPayload<T>>>

    /**
     * Create a ModDownload.
     * @param {ModDownloadCreateArgs} args - Arguments to create a ModDownload.
     * @example
     * // Create one ModDownload
     * const ModDownload = await prisma.modDownload.create({
     *   data: {
     *     // ... data to create a ModDownload
     *   }
     * })
     * 
    **/
    create<T extends ModDownloadCreateArgs>(
      args: SelectSubset<T, ModDownloadCreateArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Create many ModDownloads.
     *     @param {ModDownloadCreateManyArgs} args - Arguments to create many ModDownloads.
     *     @example
     *     // Create many ModDownloads
     *     const modDownload = await prisma.modDownload.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModDownloadCreateManyArgs>(
      args?: SelectSubset<T, ModDownloadCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModDownload.
     * @param {ModDownloadDeleteArgs} args - Arguments to delete one ModDownload.
     * @example
     * // Delete one ModDownload
     * const ModDownload = await prisma.modDownload.delete({
     *   where: {
     *     // ... filter to delete one ModDownload
     *   }
     * })
     * 
    **/
    delete<T extends ModDownloadDeleteArgs>(
      args: SelectSubset<T, ModDownloadDeleteArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Update one ModDownload.
     * @param {ModDownloadUpdateArgs} args - Arguments to update one ModDownload.
     * @example
     * // Update one ModDownload
     * const modDownload = await prisma.modDownload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModDownloadUpdateArgs>(
      args: SelectSubset<T, ModDownloadUpdateArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Delete zero or more ModDownloads.
     * @param {ModDownloadDeleteManyArgs} args - Arguments to filter ModDownloads to delete.
     * @example
     * // Delete a few ModDownloads
     * const { count } = await prisma.modDownload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModDownloadDeleteManyArgs>(
      args?: SelectSubset<T, ModDownloadDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModDownloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModDownloads
     * const modDownload = await prisma.modDownload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModDownloadUpdateManyArgs>(
      args: SelectSubset<T, ModDownloadUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModDownload.
     * @param {ModDownloadUpsertArgs} args - Arguments to update or create a ModDownload.
     * @example
     * // Update or create a ModDownload
     * const modDownload = await prisma.modDownload.upsert({
     *   create: {
     *     // ... data to create a ModDownload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModDownload we want to update
     *   }
     * })
    **/
    upsert<T extends ModDownloadUpsertArgs>(
      args: SelectSubset<T, ModDownloadUpsertArgs>
    ): Prisma__ModDownloadClient<ModDownloadGetPayload<T>>

    /**
     * Count the number of ModDownloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadCountArgs} args - Arguments to filter ModDownloads to count.
     * @example
     * // Count the number of ModDownloads
     * const count = await prisma.modDownload.count({
     *   where: {
     *     // ... the filter for the ModDownloads we want to count
     *   }
     * })
    **/
    count<T extends ModDownloadCountArgs>(
      args?: Subset<T, ModDownloadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModDownloadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModDownload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModDownloadAggregateArgs>(args: Subset<T, ModDownloadAggregateArgs>): Prisma.PrismaPromise<GetModDownloadAggregateType<T>>

    /**
     * Group by ModDownload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModDownloadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModDownloadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModDownloadGroupByArgs['orderBy'] }
        : { orderBy?: ModDownloadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModDownloadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModDownloadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ModDownload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModDownloadClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    version<T extends ModVersionArgs= {}>(args?: Subset<T, ModVersionArgs>): Prisma__ModVersionClient<ModVersionGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ModDownload base type for findUnique actions
   */
  export type ModDownloadFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter, which ModDownload to fetch.
     */
    where: ModDownloadWhereUniqueInput
  }

  /**
   * ModDownload findUnique
   */
  export interface ModDownloadFindUniqueArgs extends ModDownloadFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModDownload findUniqueOrThrow
   */
  export type ModDownloadFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter, which ModDownload to fetch.
     */
    where: ModDownloadWhereUniqueInput
  }


  /**
   * ModDownload base type for findFirst actions
   */
  export type ModDownloadFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter, which ModDownload to fetch.
     */
    where?: ModDownloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModDownloads to fetch.
     */
    orderBy?: Enumerable<ModDownloadOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModDownloads.
     */
    cursor?: ModDownloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModDownloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModDownloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModDownloads.
     */
    distinct?: Enumerable<ModDownloadScalarFieldEnum>
  }

  /**
   * ModDownload findFirst
   */
  export interface ModDownloadFindFirstArgs extends ModDownloadFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModDownload findFirstOrThrow
   */
  export type ModDownloadFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter, which ModDownload to fetch.
     */
    where?: ModDownloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModDownloads to fetch.
     */
    orderBy?: Enumerable<ModDownloadOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModDownloads.
     */
    cursor?: ModDownloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModDownloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModDownloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModDownloads.
     */
    distinct?: Enumerable<ModDownloadScalarFieldEnum>
  }


  /**
   * ModDownload findMany
   */
  export type ModDownloadFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter, which ModDownloads to fetch.
     */
    where?: ModDownloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModDownloads to fetch.
     */
    orderBy?: Enumerable<ModDownloadOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModDownloads.
     */
    cursor?: ModDownloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModDownloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModDownloads.
     */
    skip?: number
    distinct?: Enumerable<ModDownloadScalarFieldEnum>
  }


  /**
   * ModDownload create
   */
  export type ModDownloadCreateArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * The data needed to create a ModDownload.
     */
    data: XOR<ModDownloadCreateInput, ModDownloadUncheckedCreateInput>
  }


  /**
   * ModDownload createMany
   */
  export type ModDownloadCreateManyArgs = {
    /**
     * The data used to create many ModDownloads.
     */
    data: Enumerable<ModDownloadCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModDownload update
   */
  export type ModDownloadUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * The data needed to update a ModDownload.
     */
    data: XOR<ModDownloadUpdateInput, ModDownloadUncheckedUpdateInput>
    /**
     * Choose, which ModDownload to update.
     */
    where: ModDownloadWhereUniqueInput
  }


  /**
   * ModDownload updateMany
   */
  export type ModDownloadUpdateManyArgs = {
    /**
     * The data used to update ModDownloads.
     */
    data: XOR<ModDownloadUpdateManyMutationInput, ModDownloadUncheckedUpdateManyInput>
    /**
     * Filter which ModDownloads to update
     */
    where?: ModDownloadWhereInput
  }


  /**
   * ModDownload upsert
   */
  export type ModDownloadUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * The filter to search for the ModDownload to update in case it exists.
     */
    where: ModDownloadWhereUniqueInput
    /**
     * In case the ModDownload found by the `where` argument doesn't exist, create a new ModDownload with this data.
     */
    create: XOR<ModDownloadCreateInput, ModDownloadUncheckedCreateInput>
    /**
     * In case the ModDownload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModDownloadUpdateInput, ModDownloadUncheckedUpdateInput>
  }


  /**
   * ModDownload delete
   */
  export type ModDownloadDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
    /**
     * Filter which ModDownload to delete.
     */
    where: ModDownloadWhereUniqueInput
  }


  /**
   * ModDownload deleteMany
   */
  export type ModDownloadDeleteManyArgs = {
    /**
     * Filter which ModDownloads to delete
     */
    where?: ModDownloadWhereInput
  }


  /**
   * ModDownload without action
   */
  export type ModDownloadArgs = {
    /**
     * Select specific fields to fetch from the ModDownload
     */
    select?: ModDownloadSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModDownloadInclude | null
  }



  /**
   * Model ModFavorite
   */


  export type AggregateModFavorite = {
    _count: ModFavoriteCountAggregateOutputType | null
    _avg: ModFavoriteAvgAggregateOutputType | null
    _sum: ModFavoriteSumAggregateOutputType | null
    _min: ModFavoriteMinAggregateOutputType | null
    _max: ModFavoriteMaxAggregateOutputType | null
  }

  export type ModFavoriteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    modId: number | null
  }

  export type ModFavoriteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    modId: number | null
  }

  export type ModFavoriteMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    modId: number | null
  }

  export type ModFavoriteMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    modId: number | null
  }

  export type ModFavoriteCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    modId: number
    _all: number
  }


  export type ModFavoriteAvgAggregateInputType = {
    id?: true
    userId?: true
    modId?: true
  }

  export type ModFavoriteSumAggregateInputType = {
    id?: true
    userId?: true
    modId?: true
  }

  export type ModFavoriteMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    modId?: true
  }

  export type ModFavoriteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    modId?: true
  }

  export type ModFavoriteCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    modId?: true
    _all?: true
  }

  export type ModFavoriteAggregateArgs = {
    /**
     * Filter which ModFavorite to aggregate.
     */
    where?: ModFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModFavorites to fetch.
     */
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModFavorites
    **/
    _count?: true | ModFavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModFavoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModFavoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModFavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModFavoriteMaxAggregateInputType
  }

  export type GetModFavoriteAggregateType<T extends ModFavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateModFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModFavorite[P]>
      : GetScalarType<T[P], AggregateModFavorite[P]>
  }




  export type ModFavoriteGroupByArgs = {
    where?: ModFavoriteWhereInput
    orderBy?: Enumerable<ModFavoriteOrderByWithAggregationInput>
    by: ModFavoriteScalarFieldEnum[]
    having?: ModFavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModFavoriteCountAggregateInputType | true
    _avg?: ModFavoriteAvgAggregateInputType
    _sum?: ModFavoriteSumAggregateInputType
    _min?: ModFavoriteMinAggregateInputType
    _max?: ModFavoriteMaxAggregateInputType
  }


  export type ModFavoriteGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number | null
    modId: number | null
    _count: ModFavoriteCountAggregateOutputType | null
    _avg: ModFavoriteAvgAggregateOutputType | null
    _sum: ModFavoriteSumAggregateOutputType | null
    _min: ModFavoriteMinAggregateOutputType | null
    _max: ModFavoriteMaxAggregateOutputType | null
  }

  type GetModFavoriteGroupByPayload<T extends ModFavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ModFavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModFavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModFavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], ModFavoriteGroupByOutputType[P]>
        }
      >
    >


  export type ModFavoriteSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    modId?: boolean
    user?: boolean | UserArgs
    mod?: boolean | ModArgs
  }


  export type ModFavoriteInclude = {
    user?: boolean | UserArgs
    mod?: boolean | ModArgs
  }

  export type ModFavoriteGetPayload<S extends boolean | null | undefined | ModFavoriteArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ModFavorite :
    S extends undefined ? never :
    S extends { include: any } & (ModFavoriteArgs | ModFavoriteFindManyArgs)
    ? ModFavorite  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> | null :
        P extends 'mod' ? ModGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (ModFavoriteArgs | ModFavoriteFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> | null :
        P extends 'mod' ? ModGetPayload<S['select'][P]> | null :  P extends keyof ModFavorite ? ModFavorite[P] : never
  } 
      : ModFavorite


  type ModFavoriteCountArgs = 
    Omit<ModFavoriteFindManyArgs, 'select' | 'include'> & {
      select?: ModFavoriteCountAggregateInputType | true
    }

  export interface ModFavoriteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one ModFavorite that matches the filter.
     * @param {ModFavoriteFindUniqueArgs} args - Arguments to find a ModFavorite
     * @example
     * // Get one ModFavorite
     * const modFavorite = await prisma.modFavorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModFavoriteFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModFavoriteFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModFavorite'> extends True ? Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>> : Prisma__ModFavoriteClient<ModFavoriteGetPayload<T> | null, null>

    /**
     * Find one ModFavorite that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModFavoriteFindUniqueOrThrowArgs} args - Arguments to find a ModFavorite
     * @example
     * // Get one ModFavorite
     * const modFavorite = await prisma.modFavorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModFavoriteFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ModFavoriteFindUniqueOrThrowArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Find the first ModFavorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteFindFirstArgs} args - Arguments to find a ModFavorite
     * @example
     * // Get one ModFavorite
     * const modFavorite = await prisma.modFavorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModFavoriteFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModFavoriteFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModFavorite'> extends True ? Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>> : Prisma__ModFavoriteClient<ModFavoriteGetPayload<T> | null, null>

    /**
     * Find the first ModFavorite that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteFindFirstOrThrowArgs} args - Arguments to find a ModFavorite
     * @example
     * // Get one ModFavorite
     * const modFavorite = await prisma.modFavorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModFavoriteFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ModFavoriteFindFirstOrThrowArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Find zero or more ModFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModFavorites
     * const modFavorites = await prisma.modFavorite.findMany()
     * 
     * // Get first 10 ModFavorites
     * const modFavorites = await prisma.modFavorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modFavoriteWithIdOnly = await prisma.modFavorite.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModFavoriteFindManyArgs>(
      args?: SelectSubset<T, ModFavoriteFindManyArgs>
    ): Prisma.PrismaPromise<Array<ModFavoriteGetPayload<T>>>

    /**
     * Create a ModFavorite.
     * @param {ModFavoriteCreateArgs} args - Arguments to create a ModFavorite.
     * @example
     * // Create one ModFavorite
     * const ModFavorite = await prisma.modFavorite.create({
     *   data: {
     *     // ... data to create a ModFavorite
     *   }
     * })
     * 
    **/
    create<T extends ModFavoriteCreateArgs>(
      args: SelectSubset<T, ModFavoriteCreateArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Create many ModFavorites.
     *     @param {ModFavoriteCreateManyArgs} args - Arguments to create many ModFavorites.
     *     @example
     *     // Create many ModFavorites
     *     const modFavorite = await prisma.modFavorite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModFavoriteCreateManyArgs>(
      args?: SelectSubset<T, ModFavoriteCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModFavorite.
     * @param {ModFavoriteDeleteArgs} args - Arguments to delete one ModFavorite.
     * @example
     * // Delete one ModFavorite
     * const ModFavorite = await prisma.modFavorite.delete({
     *   where: {
     *     // ... filter to delete one ModFavorite
     *   }
     * })
     * 
    **/
    delete<T extends ModFavoriteDeleteArgs>(
      args: SelectSubset<T, ModFavoriteDeleteArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Update one ModFavorite.
     * @param {ModFavoriteUpdateArgs} args - Arguments to update one ModFavorite.
     * @example
     * // Update one ModFavorite
     * const modFavorite = await prisma.modFavorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModFavoriteUpdateArgs>(
      args: SelectSubset<T, ModFavoriteUpdateArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Delete zero or more ModFavorites.
     * @param {ModFavoriteDeleteManyArgs} args - Arguments to filter ModFavorites to delete.
     * @example
     * // Delete a few ModFavorites
     * const { count } = await prisma.modFavorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModFavoriteDeleteManyArgs>(
      args?: SelectSubset<T, ModFavoriteDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModFavorites
     * const modFavorite = await prisma.modFavorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModFavoriteUpdateManyArgs>(
      args: SelectSubset<T, ModFavoriteUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModFavorite.
     * @param {ModFavoriteUpsertArgs} args - Arguments to update or create a ModFavorite.
     * @example
     * // Update or create a ModFavorite
     * const modFavorite = await prisma.modFavorite.upsert({
     *   create: {
     *     // ... data to create a ModFavorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModFavorite we want to update
     *   }
     * })
    **/
    upsert<T extends ModFavoriteUpsertArgs>(
      args: SelectSubset<T, ModFavoriteUpsertArgs>
    ): Prisma__ModFavoriteClient<ModFavoriteGetPayload<T>>

    /**
     * Count the number of ModFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteCountArgs} args - Arguments to filter ModFavorites to count.
     * @example
     * // Count the number of ModFavorites
     * const count = await prisma.modFavorite.count({
     *   where: {
     *     // ... the filter for the ModFavorites we want to count
     *   }
     * })
    **/
    count<T extends ModFavoriteCountArgs>(
      args?: Subset<T, ModFavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModFavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModFavoriteAggregateArgs>(args: Subset<T, ModFavoriteAggregateArgs>): Prisma.PrismaPromise<GetModFavoriteAggregateType<T>>

    /**
     * Group by ModFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModFavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModFavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModFavoriteGroupByArgs['orderBy'] }
        : { orderBy?: ModFavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModFavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ModFavorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModFavoriteClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    mod<T extends ModArgs= {}>(args?: Subset<T, ModArgs>): Prisma__ModClient<ModGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ModFavorite base type for findUnique actions
   */
  export type ModFavoriteFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter, which ModFavorite to fetch.
     */
    where: ModFavoriteWhereUniqueInput
  }

  /**
   * ModFavorite findUnique
   */
  export interface ModFavoriteFindUniqueArgs extends ModFavoriteFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModFavorite findUniqueOrThrow
   */
  export type ModFavoriteFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter, which ModFavorite to fetch.
     */
    where: ModFavoriteWhereUniqueInput
  }


  /**
   * ModFavorite base type for findFirst actions
   */
  export type ModFavoriteFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter, which ModFavorite to fetch.
     */
    where?: ModFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModFavorites to fetch.
     */
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModFavorites.
     */
    cursor?: ModFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModFavorites.
     */
    distinct?: Enumerable<ModFavoriteScalarFieldEnum>
  }

  /**
   * ModFavorite findFirst
   */
  export interface ModFavoriteFindFirstArgs extends ModFavoriteFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ModFavorite findFirstOrThrow
   */
  export type ModFavoriteFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter, which ModFavorite to fetch.
     */
    where?: ModFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModFavorites to fetch.
     */
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModFavorites.
     */
    cursor?: ModFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModFavorites.
     */
    distinct?: Enumerable<ModFavoriteScalarFieldEnum>
  }


  /**
   * ModFavorite findMany
   */
  export type ModFavoriteFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter, which ModFavorites to fetch.
     */
    where?: ModFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModFavorites to fetch.
     */
    orderBy?: Enumerable<ModFavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModFavorites.
     */
    cursor?: ModFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModFavorites.
     */
    skip?: number
    distinct?: Enumerable<ModFavoriteScalarFieldEnum>
  }


  /**
   * ModFavorite create
   */
  export type ModFavoriteCreateArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * The data needed to create a ModFavorite.
     */
    data: XOR<ModFavoriteCreateInput, ModFavoriteUncheckedCreateInput>
  }


  /**
   * ModFavorite createMany
   */
  export type ModFavoriteCreateManyArgs = {
    /**
     * The data used to create many ModFavorites.
     */
    data: Enumerable<ModFavoriteCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModFavorite update
   */
  export type ModFavoriteUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * The data needed to update a ModFavorite.
     */
    data: XOR<ModFavoriteUpdateInput, ModFavoriteUncheckedUpdateInput>
    /**
     * Choose, which ModFavorite to update.
     */
    where: ModFavoriteWhereUniqueInput
  }


  /**
   * ModFavorite updateMany
   */
  export type ModFavoriteUpdateManyArgs = {
    /**
     * The data used to update ModFavorites.
     */
    data: XOR<ModFavoriteUpdateManyMutationInput, ModFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which ModFavorites to update
     */
    where?: ModFavoriteWhereInput
  }


  /**
   * ModFavorite upsert
   */
  export type ModFavoriteUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * The filter to search for the ModFavorite to update in case it exists.
     */
    where: ModFavoriteWhereUniqueInput
    /**
     * In case the ModFavorite found by the `where` argument doesn't exist, create a new ModFavorite with this data.
     */
    create: XOR<ModFavoriteCreateInput, ModFavoriteUncheckedCreateInput>
    /**
     * In case the ModFavorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModFavoriteUpdateInput, ModFavoriteUncheckedUpdateInput>
  }


  /**
   * ModFavorite delete
   */
  export type ModFavoriteDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
    /**
     * Filter which ModFavorite to delete.
     */
    where: ModFavoriteWhereUniqueInput
  }


  /**
   * ModFavorite deleteMany
   */
  export type ModFavoriteDeleteManyArgs = {
    /**
     * Filter which ModFavorites to delete
     */
    where?: ModFavoriteWhereInput
  }


  /**
   * ModFavorite without action
   */
  export type ModFavoriteArgs = {
    /**
     * Select specific fields to fetch from the ModFavorite
     */
    select?: ModFavoriteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModFavoriteInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ModDownloadScalarFieldEnum: {
    id: 'id',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    modVersionId: 'modVersionId'
  };

  export type ModDownloadScalarFieldEnum = (typeof ModDownloadScalarFieldEnum)[keyof typeof ModDownloadScalarFieldEnum]


  export const ModFavoriteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    modId: 'modId'
  };

  export type ModFavoriteScalarFieldEnum = (typeof ModFavoriteScalarFieldEnum)[keyof typeof ModFavoriteScalarFieldEnum]


  export const ModImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    preview_url: 'preview_url',
    isPrimary: 'isPrimary',
    isThumbnail: 'isThumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    modId: 'modId'
  };

  export type ModImageScalarFieldEnum = (typeof ModImageScalarFieldEnum)[keyof typeof ModImageScalarFieldEnum]


  export const ModScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    shortDescription: 'shortDescription',
    description: 'description',
    isNSFW: 'isNSFW',
    isApproved: 'isApproved',
    isFeatured: 'isFeatured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    categoryId: 'categoryId'
  };

  export type ModScalarFieldEnum = (typeof ModScalarFieldEnum)[keyof typeof ModScalarFieldEnum]


  export const ModVersionScalarFieldEnum: {
    id: 'id',
    version: 'version',
    isLatest: 'isLatest',
    changelog: 'changelog',
    downloadUrl: 'downloadUrl',
    extension: 'extension',
    filename: 'filename',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    modId: 'modId'
  };

  export type ModVersionScalarFieldEnum = (typeof ModVersionScalarFieldEnum)[keyof typeof ModVersionScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    image_url: 'image_url',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    email?: StringFilter | string
    password?: StringFilter | string
    name?: StringFilter | string
    image_url?: StringFilter | string
    slug?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    mods?: ModListRelationFilter
    favoriteMods?: ModFavoriteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mods?: ModOrderByRelationAggregateInput
    favoriteMods?: ModFavoriteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
    slug?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    email?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    image_url?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ModWhereInput = {
    AND?: Enumerable<ModWhereInput>
    OR?: Enumerable<ModWhereInput>
    NOT?: Enumerable<ModWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    slug?: StringFilter | string
    shortDescription?: StringFilter | string
    description?: StringFilter | string
    isNSFW?: BoolFilter | boolean
    isApproved?: BoolFilter | boolean
    isFeatured?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntNullableFilter | number | null
    categoryId?: IntNullableFilter | number | null
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    category?: XOR<CategoryRelationFilter, CategoryWhereInput> | null
    versions?: ModVersionListRelationFilter
    tags?: TagListRelationFilter
    images?: ModImageListRelationFilter
    favorites?: ModFavoriteListRelationFilter
  }

  export type ModOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    isNSFW?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    versions?: ModVersionOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
    images?: ModImageOrderByRelationAggregateInput
    favorites?: ModFavoriteOrderByRelationAggregateInput
  }

  export type ModWhereUniqueInput = {
    id?: number
    slug?: string
  }

  export type ModOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    isNSFW?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    _count?: ModCountOrderByAggregateInput
    _avg?: ModAvgOrderByAggregateInput
    _max?: ModMaxOrderByAggregateInput
    _min?: ModMinOrderByAggregateInput
    _sum?: ModSumOrderByAggregateInput
  }

  export type ModScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    shortDescription?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    isNSFW?: BoolWithAggregatesFilter | boolean
    isApproved?: BoolWithAggregatesFilter | boolean
    isFeatured?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntNullableWithAggregatesFilter | number | null
    categoryId?: IntNullableWithAggregatesFilter | number | null
  }

  export type ModImageWhereInput = {
    AND?: Enumerable<ModImageWhereInput>
    OR?: Enumerable<ModImageWhereInput>
    NOT?: Enumerable<ModImageWhereInput>
    id?: IntFilter | number
    url?: StringFilter | string
    preview_url?: StringNullableFilter | string | null
    isPrimary?: BoolFilter | boolean
    isThumbnail?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modId?: IntNullableFilter | number | null
    mod?: XOR<ModRelationFilter, ModWhereInput> | null
  }

  export type ModImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    preview_url?: SortOrder
    isPrimary?: SortOrder
    isThumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
    mod?: ModOrderByWithRelationInput
  }

  export type ModImageWhereUniqueInput = {
    id?: number
  }

  export type ModImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    preview_url?: SortOrder
    isPrimary?: SortOrder
    isThumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
    _count?: ModImageCountOrderByAggregateInput
    _avg?: ModImageAvgOrderByAggregateInput
    _max?: ModImageMaxOrderByAggregateInput
    _min?: ModImageMinOrderByAggregateInput
    _sum?: ModImageSumOrderByAggregateInput
  }

  export type ModImageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModImageScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModImageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModImageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    url?: StringWithAggregatesFilter | string
    preview_url?: StringNullableWithAggregatesFilter | string | null
    isPrimary?: BoolWithAggregatesFilter | boolean
    isThumbnail?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    modId?: IntNullableWithAggregatesFilter | number | null
  }

  export type ModVersionWhereInput = {
    AND?: Enumerable<ModVersionWhereInput>
    OR?: Enumerable<ModVersionWhereInput>
    NOT?: Enumerable<ModVersionWhereInput>
    id?: IntFilter | number
    version?: StringFilter | string
    isLatest?: BoolFilter | boolean
    changelog?: StringFilter | string
    downloadUrl?: StringFilter | string
    extension?: StringNullableFilter | string | null
    filename?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modId?: IntNullableFilter | number | null
    mod?: XOR<ModRelationFilter, ModWhereInput> | null
    downloads?: ModDownloadListRelationFilter
  }

  export type ModVersionOrderByWithRelationInput = {
    id?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    changelog?: SortOrder
    downloadUrl?: SortOrder
    extension?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
    mod?: ModOrderByWithRelationInput
    downloads?: ModDownloadOrderByRelationAggregateInput
  }

  export type ModVersionWhereUniqueInput = {
    id?: number
  }

  export type ModVersionOrderByWithAggregationInput = {
    id?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    changelog?: SortOrder
    downloadUrl?: SortOrder
    extension?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
    _count?: ModVersionCountOrderByAggregateInput
    _avg?: ModVersionAvgOrderByAggregateInput
    _max?: ModVersionMaxOrderByAggregateInput
    _min?: ModVersionMinOrderByAggregateInput
    _sum?: ModVersionSumOrderByAggregateInput
  }

  export type ModVersionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModVersionScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModVersionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModVersionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    version?: StringWithAggregatesFilter | string
    isLatest?: BoolWithAggregatesFilter | boolean
    changelog?: StringWithAggregatesFilter | string
    downloadUrl?: StringWithAggregatesFilter | string
    extension?: StringNullableWithAggregatesFilter | string | null
    filename?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    modId?: IntNullableWithAggregatesFilter | number | null
  }

  export type TagWhereInput = {
    AND?: Enumerable<TagWhereInput>
    OR?: Enumerable<TagWhereInput>
    NOT?: Enumerable<TagWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    slug?: StringFilter | string
    description?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    mods?: ModListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mods?: ModOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = {
    id?: number
    slug?: string
  }

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    slug?: StringFilter | string
    description?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    mods?: ModListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mods?: ModOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = {
    id?: number
    slug?: string
  }

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ModDownloadWhereInput = {
    AND?: Enumerable<ModDownloadWhereInput>
    OR?: Enumerable<ModDownloadWhereInput>
    NOT?: Enumerable<ModDownloadWhereInput>
    id?: IntFilter | number
    ip?: StringFilter | string
    userAgent?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modVersionId?: IntNullableFilter | number | null
    version?: XOR<ModVersionRelationFilter, ModVersionWhereInput> | null
  }

  export type ModDownloadOrderByWithRelationInput = {
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modVersionId?: SortOrder
    version?: ModVersionOrderByWithRelationInput
  }

  export type ModDownloadWhereUniqueInput = {
    id?: number
  }

  export type ModDownloadOrderByWithAggregationInput = {
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modVersionId?: SortOrder
    _count?: ModDownloadCountOrderByAggregateInput
    _avg?: ModDownloadAvgOrderByAggregateInput
    _max?: ModDownloadMaxOrderByAggregateInput
    _min?: ModDownloadMinOrderByAggregateInput
    _sum?: ModDownloadSumOrderByAggregateInput
  }

  export type ModDownloadScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModDownloadScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModDownloadScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModDownloadScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    ip?: StringWithAggregatesFilter | string
    userAgent?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    modVersionId?: IntNullableWithAggregatesFilter | number | null
  }

  export type ModFavoriteWhereInput = {
    AND?: Enumerable<ModFavoriteWhereInput>
    OR?: Enumerable<ModFavoriteWhereInput>
    NOT?: Enumerable<ModFavoriteWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntNullableFilter | number | null
    modId?: IntNullableFilter | number | null
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    mod?: XOR<ModRelationFilter, ModWhereInput> | null
  }

  export type ModFavoriteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
    user?: UserOrderByWithRelationInput
    mod?: ModOrderByWithRelationInput
  }

  export type ModFavoriteWhereUniqueInput = {
    id?: number
  }

  export type ModFavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
    _count?: ModFavoriteCountOrderByAggregateInput
    _avg?: ModFavoriteAvgOrderByAggregateInput
    _max?: ModFavoriteMaxOrderByAggregateInput
    _min?: ModFavoriteMinOrderByAggregateInput
    _sum?: ModFavoriteSumOrderByAggregateInput
  }

  export type ModFavoriteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModFavoriteScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModFavoriteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModFavoriteScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntNullableWithAggregatesFilter | number | null
    modId?: IntNullableWithAggregatesFilter | number | null
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModCreateNestedManyWithoutUserInput
    favoriteMods?: ModFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModUncheckedCreateNestedManyWithoutUserInput
    favoriteMods?: ModFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUpdateManyWithoutUserNestedInput
    favoriteMods?: ModFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUncheckedUpdateManyWithoutUserNestedInput
    favoriteMods?: ModFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModCreateInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    category?: CategoryCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    tags?: TagCreateNestedManyWithoutModsInput
    images?: ModImageCreateNestedManyWithoutModInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    category?: CategoryUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModCreateManyInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
  }

  export type ModUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModImageCreateInput = {
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mod?: ModCreateNestedOneWithoutImagesInput
  }

  export type ModImageUncheckedCreateInput = {
    id?: number
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mod?: ModUpdateOneWithoutImagesNestedInput
  }

  export type ModImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModImageCreateManyInput = {
    id?: number
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModVersionCreateInput = {
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mod?: ModCreateNestedOneWithoutVersionsInput
    downloads?: ModDownloadCreateNestedManyWithoutVersionInput
  }

  export type ModVersionUncheckedCreateInput = {
    id?: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
    downloads?: ModDownloadUncheckedCreateNestedManyWithoutVersionInput
  }

  export type ModVersionUpdateInput = {
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mod?: ModUpdateOneWithoutVersionsNestedInput
    downloads?: ModDownloadUpdateManyWithoutVersionNestedInput
  }

  export type ModVersionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
    downloads?: ModDownloadUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type ModVersionCreateManyInput = {
    id?: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModVersionUpdateManyMutationInput = {
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModVersionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TagCreateInput = {
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModDownloadCreateInput = {
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: ModVersionCreateNestedOneWithoutDownloadsInput
  }

  export type ModDownloadUncheckedCreateInput = {
    id?: number
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    modVersionId?: number | null
  }

  export type ModDownloadUpdateInput = {
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: ModVersionUpdateOneWithoutDownloadsNestedInput
  }

  export type ModDownloadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modVersionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModDownloadCreateManyInput = {
    id?: number
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    modVersionId?: number | null
  }

  export type ModDownloadUpdateManyMutationInput = {
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModDownloadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modVersionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModFavoriteCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutFavoriteModsInput
    mod?: ModCreateNestedOneWithoutFavoritesInput
  }

  export type ModFavoriteUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    modId?: number | null
  }

  export type ModFavoriteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutFavoriteModsNestedInput
    mod?: ModUpdateOneWithoutFavoritesNestedInput
  }

  export type ModFavoriteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModFavoriteCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    modId?: number | null
  }

  export type ModFavoriteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModFavoriteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ModListRelationFilter = {
    every?: ModWhereInput
    some?: ModWhereInput
    none?: ModWhereInput
  }

  export type ModFavoriteListRelationFilter = {
    every?: ModFavoriteWhereInput
    some?: ModFavoriteWhereInput
    none?: ModFavoriteWhereInput
  }

  export type ModOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModFavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type ModVersionListRelationFilter = {
    every?: ModVersionWhereInput
    some?: ModVersionWhereInput
    none?: ModVersionWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type ModImageListRelationFilter = {
    every?: ModImageWhereInput
    some?: ModImageWhereInput
    none?: ModImageWhereInput
  }

  export type ModVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    isNSFW?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
  }

  export type ModAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
  }

  export type ModMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    isNSFW?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
  }

  export type ModMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    isNSFW?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
  }

  export type ModSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ModRelationFilter = {
    is?: ModWhereInput | null
    isNot?: ModWhereInput | null
  }

  export type ModImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    preview_url?: SortOrder
    isPrimary?: SortOrder
    isThumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModImageAvgOrderByAggregateInput = {
    id?: SortOrder
    modId?: SortOrder
  }

  export type ModImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    preview_url?: SortOrder
    isPrimary?: SortOrder
    isThumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    preview_url?: SortOrder
    isPrimary?: SortOrder
    isThumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModImageSumOrderByAggregateInput = {
    id?: SortOrder
    modId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ModDownloadListRelationFilter = {
    every?: ModDownloadWhereInput
    some?: ModDownloadWhereInput
    none?: ModDownloadWhereInput
  }

  export type ModDownloadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModVersionCountOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    changelog?: SortOrder
    downloadUrl?: SortOrder
    extension?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModVersionAvgOrderByAggregateInput = {
    id?: SortOrder
    modId?: SortOrder
  }

  export type ModVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    changelog?: SortOrder
    downloadUrl?: SortOrder
    extension?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModVersionMinOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    changelog?: SortOrder
    downloadUrl?: SortOrder
    extension?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modId?: SortOrder
  }

  export type ModVersionSumOrderByAggregateInput = {
    id?: SortOrder
    modId?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ModVersionRelationFilter = {
    is?: ModVersionWhereInput | null
    isNot?: ModVersionWhereInput | null
  }

  export type ModDownloadCountOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modVersionId?: SortOrder
  }

  export type ModDownloadAvgOrderByAggregateInput = {
    id?: SortOrder
    modVersionId?: SortOrder
  }

  export type ModDownloadMaxOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modVersionId?: SortOrder
  }

  export type ModDownloadMinOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modVersionId?: SortOrder
  }

  export type ModDownloadSumOrderByAggregateInput = {
    id?: SortOrder
    modVersionId?: SortOrder
  }

  export type ModFavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
  }

  export type ModFavoriteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
  }

  export type ModFavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
  }

  export type ModFavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
  }

  export type ModFavoriteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    modId?: SortOrder
  }

  export type ModCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ModCreateWithoutUserInput>, Enumerable<ModUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutUserInput>
    createMany?: ModCreateManyUserInputEnvelope
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModFavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutUserInput>, Enumerable<ModFavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutUserInput>
    createMany?: ModFavoriteCreateManyUserInputEnvelope
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
  }

  export type ModUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ModCreateWithoutUserInput>, Enumerable<ModUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutUserInput>
    createMany?: ModCreateManyUserInputEnvelope
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModFavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutUserInput>, Enumerable<ModFavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutUserInput>
    createMany?: ModFavoriteCreateManyUserInputEnvelope
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ModUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutUserInput>, Enumerable<ModUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ModCreateManyUserInputEnvelope
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModFavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutUserInput>, Enumerable<ModFavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ModFavoriteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ModFavoriteCreateManyUserInputEnvelope
    set?: Enumerable<ModFavoriteWhereUniqueInput>
    disconnect?: Enumerable<ModFavoriteWhereUniqueInput>
    delete?: Enumerable<ModFavoriteWhereUniqueInput>
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
    update?: Enumerable<ModFavoriteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ModFavoriteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ModFavoriteScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutUserInput>, Enumerable<ModUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ModCreateManyUserInputEnvelope
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModFavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutUserInput>, Enumerable<ModFavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ModFavoriteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ModFavoriteCreateManyUserInputEnvelope
    set?: Enumerable<ModFavoriteWhereUniqueInput>
    disconnect?: Enumerable<ModFavoriteWhereUniqueInput>
    delete?: Enumerable<ModFavoriteWhereUniqueInput>
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
    update?: Enumerable<ModFavoriteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ModFavoriteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ModFavoriteScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutModsInput = {
    create?: XOR<UserCreateWithoutModsInput, UserUncheckedCreateWithoutModsInput>
    connectOrCreate?: UserCreateOrConnectWithoutModsInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutModsInput = {
    create?: XOR<CategoryCreateWithoutModsInput, CategoryUncheckedCreateWithoutModsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutModsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ModVersionCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModVersionCreateWithoutModInput>, Enumerable<ModVersionUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModVersionCreateOrConnectWithoutModInput>
    createMany?: ModVersionCreateManyModInputEnvelope
    connect?: Enumerable<ModVersionWhereUniqueInput>
  }

  export type TagCreateNestedManyWithoutModsInput = {
    create?: XOR<Enumerable<TagCreateWithoutModsInput>, Enumerable<TagUncheckedCreateWithoutModsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutModsInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type ModImageCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModImageCreateWithoutModInput>, Enumerable<ModImageUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModImageCreateOrConnectWithoutModInput>
    createMany?: ModImageCreateManyModInputEnvelope
    connect?: Enumerable<ModImageWhereUniqueInput>
  }

  export type ModFavoriteCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutModInput>, Enumerable<ModFavoriteUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutModInput>
    createMany?: ModFavoriteCreateManyModInputEnvelope
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
  }

  export type ModVersionUncheckedCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModVersionCreateWithoutModInput>, Enumerable<ModVersionUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModVersionCreateOrConnectWithoutModInput>
    createMany?: ModVersionCreateManyModInputEnvelope
    connect?: Enumerable<ModVersionWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutModsInput = {
    create?: XOR<Enumerable<TagCreateWithoutModsInput>, Enumerable<TagUncheckedCreateWithoutModsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutModsInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type ModImageUncheckedCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModImageCreateWithoutModInput>, Enumerable<ModImageUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModImageCreateOrConnectWithoutModInput>
    createMany?: ModImageCreateManyModInputEnvelope
    connect?: Enumerable<ModImageWhereUniqueInput>
  }

  export type ModFavoriteUncheckedCreateNestedManyWithoutModInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutModInput>, Enumerable<ModFavoriteUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutModInput>
    createMany?: ModFavoriteCreateManyModInputEnvelope
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutModsNestedInput = {
    create?: XOR<UserCreateWithoutModsInput, UserUncheckedCreateWithoutModsInput>
    connectOrCreate?: UserCreateOrConnectWithoutModsInput
    upsert?: UserUpsertWithoutModsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutModsInput, UserUncheckedUpdateWithoutModsInput>
  }

  export type CategoryUpdateOneWithoutModsNestedInput = {
    create?: XOR<CategoryCreateWithoutModsInput, CategoryUncheckedCreateWithoutModsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutModsInput
    upsert?: CategoryUpsertWithoutModsInput
    disconnect?: boolean
    delete?: boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<CategoryUpdateWithoutModsInput, CategoryUncheckedUpdateWithoutModsInput>
  }

  export type ModVersionUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModVersionCreateWithoutModInput>, Enumerable<ModVersionUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModVersionCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModVersionUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModVersionCreateManyModInputEnvelope
    set?: Enumerable<ModVersionWhereUniqueInput>
    disconnect?: Enumerable<ModVersionWhereUniqueInput>
    delete?: Enumerable<ModVersionWhereUniqueInput>
    connect?: Enumerable<ModVersionWhereUniqueInput>
    update?: Enumerable<ModVersionUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModVersionUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModVersionScalarWhereInput>
  }

  export type TagUpdateManyWithoutModsNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutModsInput>, Enumerable<TagUncheckedCreateWithoutModsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutModsInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutModsInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutModsInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutModsInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type ModImageUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModImageCreateWithoutModInput>, Enumerable<ModImageUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModImageCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModImageUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModImageCreateManyModInputEnvelope
    set?: Enumerable<ModImageWhereUniqueInput>
    disconnect?: Enumerable<ModImageWhereUniqueInput>
    delete?: Enumerable<ModImageWhereUniqueInput>
    connect?: Enumerable<ModImageWhereUniqueInput>
    update?: Enumerable<ModImageUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModImageUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModImageScalarWhereInput>
  }

  export type ModFavoriteUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutModInput>, Enumerable<ModFavoriteUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModFavoriteUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModFavoriteCreateManyModInputEnvelope
    set?: Enumerable<ModFavoriteWhereUniqueInput>
    disconnect?: Enumerable<ModFavoriteWhereUniqueInput>
    delete?: Enumerable<ModFavoriteWhereUniqueInput>
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
    update?: Enumerable<ModFavoriteUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModFavoriteUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModFavoriteScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModVersionUncheckedUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModVersionCreateWithoutModInput>, Enumerable<ModVersionUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModVersionCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModVersionUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModVersionCreateManyModInputEnvelope
    set?: Enumerable<ModVersionWhereUniqueInput>
    disconnect?: Enumerable<ModVersionWhereUniqueInput>
    delete?: Enumerable<ModVersionWhereUniqueInput>
    connect?: Enumerable<ModVersionWhereUniqueInput>
    update?: Enumerable<ModVersionUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModVersionUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModVersionScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutModsNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutModsInput>, Enumerable<TagUncheckedCreateWithoutModsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutModsInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutModsInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutModsInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutModsInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type ModImageUncheckedUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModImageCreateWithoutModInput>, Enumerable<ModImageUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModImageCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModImageUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModImageCreateManyModInputEnvelope
    set?: Enumerable<ModImageWhereUniqueInput>
    disconnect?: Enumerable<ModImageWhereUniqueInput>
    delete?: Enumerable<ModImageWhereUniqueInput>
    connect?: Enumerable<ModImageWhereUniqueInput>
    update?: Enumerable<ModImageUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModImageUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModImageScalarWhereInput>
  }

  export type ModFavoriteUncheckedUpdateManyWithoutModNestedInput = {
    create?: XOR<Enumerable<ModFavoriteCreateWithoutModInput>, Enumerable<ModFavoriteUncheckedCreateWithoutModInput>>
    connectOrCreate?: Enumerable<ModFavoriteCreateOrConnectWithoutModInput>
    upsert?: Enumerable<ModFavoriteUpsertWithWhereUniqueWithoutModInput>
    createMany?: ModFavoriteCreateManyModInputEnvelope
    set?: Enumerable<ModFavoriteWhereUniqueInput>
    disconnect?: Enumerable<ModFavoriteWhereUniqueInput>
    delete?: Enumerable<ModFavoriteWhereUniqueInput>
    connect?: Enumerable<ModFavoriteWhereUniqueInput>
    update?: Enumerable<ModFavoriteUpdateWithWhereUniqueWithoutModInput>
    updateMany?: Enumerable<ModFavoriteUpdateManyWithWhereWithoutModInput>
    deleteMany?: Enumerable<ModFavoriteScalarWhereInput>
  }

  export type ModCreateNestedOneWithoutImagesInput = {
    create?: XOR<ModCreateWithoutImagesInput, ModUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ModCreateOrConnectWithoutImagesInput
    connect?: ModWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ModUpdateOneWithoutImagesNestedInput = {
    create?: XOR<ModCreateWithoutImagesInput, ModUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ModCreateOrConnectWithoutImagesInput
    upsert?: ModUpsertWithoutImagesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModWhereUniqueInput
    update?: XOR<ModUpdateWithoutImagesInput, ModUncheckedUpdateWithoutImagesInput>
  }

  export type ModCreateNestedOneWithoutVersionsInput = {
    create?: XOR<ModCreateWithoutVersionsInput, ModUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ModCreateOrConnectWithoutVersionsInput
    connect?: ModWhereUniqueInput
  }

  export type ModDownloadCreateNestedManyWithoutVersionInput = {
    create?: XOR<Enumerable<ModDownloadCreateWithoutVersionInput>, Enumerable<ModDownloadUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<ModDownloadCreateOrConnectWithoutVersionInput>
    createMany?: ModDownloadCreateManyVersionInputEnvelope
    connect?: Enumerable<ModDownloadWhereUniqueInput>
  }

  export type ModDownloadUncheckedCreateNestedManyWithoutVersionInput = {
    create?: XOR<Enumerable<ModDownloadCreateWithoutVersionInput>, Enumerable<ModDownloadUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<ModDownloadCreateOrConnectWithoutVersionInput>
    createMany?: ModDownloadCreateManyVersionInputEnvelope
    connect?: Enumerable<ModDownloadWhereUniqueInput>
  }

  export type ModUpdateOneWithoutVersionsNestedInput = {
    create?: XOR<ModCreateWithoutVersionsInput, ModUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ModCreateOrConnectWithoutVersionsInput
    upsert?: ModUpsertWithoutVersionsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModWhereUniqueInput
    update?: XOR<ModUpdateWithoutVersionsInput, ModUncheckedUpdateWithoutVersionsInput>
  }

  export type ModDownloadUpdateManyWithoutVersionNestedInput = {
    create?: XOR<Enumerable<ModDownloadCreateWithoutVersionInput>, Enumerable<ModDownloadUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<ModDownloadCreateOrConnectWithoutVersionInput>
    upsert?: Enumerable<ModDownloadUpsertWithWhereUniqueWithoutVersionInput>
    createMany?: ModDownloadCreateManyVersionInputEnvelope
    set?: Enumerable<ModDownloadWhereUniqueInput>
    disconnect?: Enumerable<ModDownloadWhereUniqueInput>
    delete?: Enumerable<ModDownloadWhereUniqueInput>
    connect?: Enumerable<ModDownloadWhereUniqueInput>
    update?: Enumerable<ModDownloadUpdateWithWhereUniqueWithoutVersionInput>
    updateMany?: Enumerable<ModDownloadUpdateManyWithWhereWithoutVersionInput>
    deleteMany?: Enumerable<ModDownloadScalarWhereInput>
  }

  export type ModDownloadUncheckedUpdateManyWithoutVersionNestedInput = {
    create?: XOR<Enumerable<ModDownloadCreateWithoutVersionInput>, Enumerable<ModDownloadUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<ModDownloadCreateOrConnectWithoutVersionInput>
    upsert?: Enumerable<ModDownloadUpsertWithWhereUniqueWithoutVersionInput>
    createMany?: ModDownloadCreateManyVersionInputEnvelope
    set?: Enumerable<ModDownloadWhereUniqueInput>
    disconnect?: Enumerable<ModDownloadWhereUniqueInput>
    delete?: Enumerable<ModDownloadWhereUniqueInput>
    connect?: Enumerable<ModDownloadWhereUniqueInput>
    update?: Enumerable<ModDownloadUpdateWithWhereUniqueWithoutVersionInput>
    updateMany?: Enumerable<ModDownloadUpdateManyWithWhereWithoutVersionInput>
    deleteMany?: Enumerable<ModDownloadScalarWhereInput>
  }

  export type ModCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<ModCreateWithoutTagsInput>, Enumerable<ModUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<ModCreateWithoutTagsInput>, Enumerable<ModUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutTagsInput>, Enumerable<ModUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutTagsInput>, Enumerable<ModUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ModCreateWithoutCategoryInput>, Enumerable<ModUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutCategoryInput>
    createMany?: ModCreateManyCategoryInputEnvelope
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ModCreateWithoutCategoryInput>, Enumerable<ModUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutCategoryInput>
    createMany?: ModCreateManyCategoryInputEnvelope
    connect?: Enumerable<ModWhereUniqueInput>
  }

  export type ModUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutCategoryInput>, Enumerable<ModUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ModCreateManyCategoryInputEnvelope
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ModCreateWithoutCategoryInput>, Enumerable<ModUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ModCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ModUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ModCreateManyCategoryInputEnvelope
    set?: Enumerable<ModWhereUniqueInput>
    disconnect?: Enumerable<ModWhereUniqueInput>
    delete?: Enumerable<ModWhereUniqueInput>
    connect?: Enumerable<ModWhereUniqueInput>
    update?: Enumerable<ModUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ModUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ModScalarWhereInput>
  }

  export type ModVersionCreateNestedOneWithoutDownloadsInput = {
    create?: XOR<ModVersionCreateWithoutDownloadsInput, ModVersionUncheckedCreateWithoutDownloadsInput>
    connectOrCreate?: ModVersionCreateOrConnectWithoutDownloadsInput
    connect?: ModVersionWhereUniqueInput
  }

  export type ModVersionUpdateOneWithoutDownloadsNestedInput = {
    create?: XOR<ModVersionCreateWithoutDownloadsInput, ModVersionUncheckedCreateWithoutDownloadsInput>
    connectOrCreate?: ModVersionCreateOrConnectWithoutDownloadsInput
    upsert?: ModVersionUpsertWithoutDownloadsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModVersionWhereUniqueInput
    update?: XOR<ModVersionUpdateWithoutDownloadsInput, ModVersionUncheckedUpdateWithoutDownloadsInput>
  }

  export type UserCreateNestedOneWithoutFavoriteModsInput = {
    create?: XOR<UserCreateWithoutFavoriteModsInput, UserUncheckedCreateWithoutFavoriteModsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteModsInput
    connect?: UserWhereUniqueInput
  }

  export type ModCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ModCreateWithoutFavoritesInput, ModUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ModCreateOrConnectWithoutFavoritesInput
    connect?: ModWhereUniqueInput
  }

  export type UserUpdateOneWithoutFavoriteModsNestedInput = {
    create?: XOR<UserCreateWithoutFavoriteModsInput, UserUncheckedCreateWithoutFavoriteModsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteModsInput
    upsert?: UserUpsertWithoutFavoriteModsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFavoriteModsInput, UserUncheckedUpdateWithoutFavoriteModsInput>
  }

  export type ModUpdateOneWithoutFavoritesNestedInput = {
    create?: XOR<ModCreateWithoutFavoritesInput, ModUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ModCreateOrConnectWithoutFavoritesInput
    upsert?: ModUpsertWithoutFavoritesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModWhereUniqueInput
    update?: XOR<ModUpdateWithoutFavoritesInput, ModUncheckedUpdateWithoutFavoritesInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ModCreateWithoutUserInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    tags?: TagCreateNestedManyWithoutModsInput
    images?: ModImageCreateNestedManyWithoutModInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutUserInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutUserInput, ModUncheckedCreateWithoutUserInput>
  }

  export type ModCreateManyUserInputEnvelope = {
    data: Enumerable<ModCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ModFavoriteCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    mod?: ModCreateNestedOneWithoutFavoritesInput
  }

  export type ModFavoriteUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModFavoriteCreateOrConnectWithoutUserInput = {
    where: ModFavoriteWhereUniqueInput
    create: XOR<ModFavoriteCreateWithoutUserInput, ModFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ModFavoriteCreateManyUserInputEnvelope = {
    data: Enumerable<ModFavoriteCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ModUpsertWithWhereUniqueWithoutUserInput = {
    where: ModWhereUniqueInput
    update: XOR<ModUpdateWithoutUserInput, ModUncheckedUpdateWithoutUserInput>
    create: XOR<ModCreateWithoutUserInput, ModUncheckedCreateWithoutUserInput>
  }

  export type ModUpdateWithWhereUniqueWithoutUserInput = {
    where: ModWhereUniqueInput
    data: XOR<ModUpdateWithoutUserInput, ModUncheckedUpdateWithoutUserInput>
  }

  export type ModUpdateManyWithWhereWithoutUserInput = {
    where: ModScalarWhereInput
    data: XOR<ModUpdateManyMutationInput, ModUncheckedUpdateManyWithoutModsInput>
  }

  export type ModScalarWhereInput = {
    AND?: Enumerable<ModScalarWhereInput>
    OR?: Enumerable<ModScalarWhereInput>
    NOT?: Enumerable<ModScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    slug?: StringFilter | string
    shortDescription?: StringFilter | string
    description?: StringFilter | string
    isNSFW?: BoolFilter | boolean
    isApproved?: BoolFilter | boolean
    isFeatured?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntNullableFilter | number | null
    categoryId?: IntNullableFilter | number | null
  }

  export type ModFavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: ModFavoriteWhereUniqueInput
    update: XOR<ModFavoriteUpdateWithoutUserInput, ModFavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<ModFavoriteCreateWithoutUserInput, ModFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ModFavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: ModFavoriteWhereUniqueInput
    data: XOR<ModFavoriteUpdateWithoutUserInput, ModFavoriteUncheckedUpdateWithoutUserInput>
  }

  export type ModFavoriteUpdateManyWithWhereWithoutUserInput = {
    where: ModFavoriteScalarWhereInput
    data: XOR<ModFavoriteUpdateManyMutationInput, ModFavoriteUncheckedUpdateManyWithoutFavoriteModsInput>
  }

  export type ModFavoriteScalarWhereInput = {
    AND?: Enumerable<ModFavoriteScalarWhereInput>
    OR?: Enumerable<ModFavoriteScalarWhereInput>
    NOT?: Enumerable<ModFavoriteScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntNullableFilter | number | null
    modId?: IntNullableFilter | number | null
  }

  export type UserCreateWithoutModsInput = {
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    favoriteMods?: ModFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutModsInput = {
    id?: number
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    favoriteMods?: ModFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutModsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutModsInput, UserUncheckedCreateWithoutModsInput>
  }

  export type CategoryCreateWithoutModsInput = {
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutModsInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutModsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutModsInput, CategoryUncheckedCreateWithoutModsInput>
  }

  export type ModVersionCreateWithoutModInput = {
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    downloads?: ModDownloadCreateNestedManyWithoutVersionInput
  }

  export type ModVersionUncheckedCreateWithoutModInput = {
    id?: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    downloads?: ModDownloadUncheckedCreateNestedManyWithoutVersionInput
  }

  export type ModVersionCreateOrConnectWithoutModInput = {
    where: ModVersionWhereUniqueInput
    create: XOR<ModVersionCreateWithoutModInput, ModVersionUncheckedCreateWithoutModInput>
  }

  export type ModVersionCreateManyModInputEnvelope = {
    data: Enumerable<ModVersionCreateManyModInput>
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutModsInput = {
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagUncheckedCreateWithoutModsInput = {
    id?: number
    name: string
    slug: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagCreateOrConnectWithoutModsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutModsInput, TagUncheckedCreateWithoutModsInput>
  }

  export type ModImageCreateWithoutModInput = {
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModImageUncheckedCreateWithoutModInput = {
    id?: number
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModImageCreateOrConnectWithoutModInput = {
    where: ModImageWhereUniqueInput
    create: XOR<ModImageCreateWithoutModInput, ModImageUncheckedCreateWithoutModInput>
  }

  export type ModImageCreateManyModInputEnvelope = {
    data: Enumerable<ModImageCreateManyModInput>
    skipDuplicates?: boolean
  }

  export type ModFavoriteCreateWithoutModInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutFavoriteModsInput
  }

  export type ModFavoriteUncheckedCreateWithoutModInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
  }

  export type ModFavoriteCreateOrConnectWithoutModInput = {
    where: ModFavoriteWhereUniqueInput
    create: XOR<ModFavoriteCreateWithoutModInput, ModFavoriteUncheckedCreateWithoutModInput>
  }

  export type ModFavoriteCreateManyModInputEnvelope = {
    data: Enumerable<ModFavoriteCreateManyModInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutModsInput = {
    update: XOR<UserUpdateWithoutModsInput, UserUncheckedUpdateWithoutModsInput>
    create: XOR<UserCreateWithoutModsInput, UserUncheckedCreateWithoutModsInput>
  }

  export type UserUpdateWithoutModsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favoriteMods?: ModFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favoriteMods?: ModFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutModsInput = {
    update: XOR<CategoryUpdateWithoutModsInput, CategoryUncheckedUpdateWithoutModsInput>
    create: XOR<CategoryCreateWithoutModsInput, CategoryUncheckedCreateWithoutModsInput>
  }

  export type CategoryUpdateWithoutModsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModVersionUpsertWithWhereUniqueWithoutModInput = {
    where: ModVersionWhereUniqueInput
    update: XOR<ModVersionUpdateWithoutModInput, ModVersionUncheckedUpdateWithoutModInput>
    create: XOR<ModVersionCreateWithoutModInput, ModVersionUncheckedCreateWithoutModInput>
  }

  export type ModVersionUpdateWithWhereUniqueWithoutModInput = {
    where: ModVersionWhereUniqueInput
    data: XOR<ModVersionUpdateWithoutModInput, ModVersionUncheckedUpdateWithoutModInput>
  }

  export type ModVersionUpdateManyWithWhereWithoutModInput = {
    where: ModVersionScalarWhereInput
    data: XOR<ModVersionUpdateManyMutationInput, ModVersionUncheckedUpdateManyWithoutVersionsInput>
  }

  export type ModVersionScalarWhereInput = {
    AND?: Enumerable<ModVersionScalarWhereInput>
    OR?: Enumerable<ModVersionScalarWhereInput>
    NOT?: Enumerable<ModVersionScalarWhereInput>
    id?: IntFilter | number
    version?: StringFilter | string
    isLatest?: BoolFilter | boolean
    changelog?: StringFilter | string
    downloadUrl?: StringFilter | string
    extension?: StringNullableFilter | string | null
    filename?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modId?: IntNullableFilter | number | null
  }

  export type TagUpsertWithWhereUniqueWithoutModsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutModsInput, TagUncheckedUpdateWithoutModsInput>
    create: XOR<TagCreateWithoutModsInput, TagUncheckedCreateWithoutModsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutModsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutModsInput, TagUncheckedUpdateWithoutModsInput>
  }

  export type TagUpdateManyWithWhereWithoutModsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type TagScalarWhereInput = {
    AND?: Enumerable<TagScalarWhereInput>
    OR?: Enumerable<TagScalarWhereInput>
    NOT?: Enumerable<TagScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    slug?: StringFilter | string
    description?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ModImageUpsertWithWhereUniqueWithoutModInput = {
    where: ModImageWhereUniqueInput
    update: XOR<ModImageUpdateWithoutModInput, ModImageUncheckedUpdateWithoutModInput>
    create: XOR<ModImageCreateWithoutModInput, ModImageUncheckedCreateWithoutModInput>
  }

  export type ModImageUpdateWithWhereUniqueWithoutModInput = {
    where: ModImageWhereUniqueInput
    data: XOR<ModImageUpdateWithoutModInput, ModImageUncheckedUpdateWithoutModInput>
  }

  export type ModImageUpdateManyWithWhereWithoutModInput = {
    where: ModImageScalarWhereInput
    data: XOR<ModImageUpdateManyMutationInput, ModImageUncheckedUpdateManyWithoutImagesInput>
  }

  export type ModImageScalarWhereInput = {
    AND?: Enumerable<ModImageScalarWhereInput>
    OR?: Enumerable<ModImageScalarWhereInput>
    NOT?: Enumerable<ModImageScalarWhereInput>
    id?: IntFilter | number
    url?: StringFilter | string
    preview_url?: StringNullableFilter | string | null
    isPrimary?: BoolFilter | boolean
    isThumbnail?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modId?: IntNullableFilter | number | null
  }

  export type ModFavoriteUpsertWithWhereUniqueWithoutModInput = {
    where: ModFavoriteWhereUniqueInput
    update: XOR<ModFavoriteUpdateWithoutModInput, ModFavoriteUncheckedUpdateWithoutModInput>
    create: XOR<ModFavoriteCreateWithoutModInput, ModFavoriteUncheckedCreateWithoutModInput>
  }

  export type ModFavoriteUpdateWithWhereUniqueWithoutModInput = {
    where: ModFavoriteWhereUniqueInput
    data: XOR<ModFavoriteUpdateWithoutModInput, ModFavoriteUncheckedUpdateWithoutModInput>
  }

  export type ModFavoriteUpdateManyWithWhereWithoutModInput = {
    where: ModFavoriteScalarWhereInput
    data: XOR<ModFavoriteUpdateManyMutationInput, ModFavoriteUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type ModCreateWithoutImagesInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    category?: CategoryCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    tags?: TagCreateNestedManyWithoutModsInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutImagesInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutImagesInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutImagesInput, ModUncheckedCreateWithoutImagesInput>
  }

  export type ModUpsertWithoutImagesInput = {
    update: XOR<ModUpdateWithoutImagesInput, ModUncheckedUpdateWithoutImagesInput>
    create: XOR<ModCreateWithoutImagesInput, ModUncheckedCreateWithoutImagesInput>
  }

  export type ModUpdateWithoutImagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    category?: CategoryUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModCreateWithoutVersionsInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    category?: CategoryCreateNestedOneWithoutModsInput
    tags?: TagCreateNestedManyWithoutModsInput
    images?: ModImageCreateNestedManyWithoutModInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutVersionsInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutVersionsInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutVersionsInput, ModUncheckedCreateWithoutVersionsInput>
  }

  export type ModDownloadCreateWithoutVersionInput = {
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModDownloadUncheckedCreateWithoutVersionInput = {
    id?: number
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModDownloadCreateOrConnectWithoutVersionInput = {
    where: ModDownloadWhereUniqueInput
    create: XOR<ModDownloadCreateWithoutVersionInput, ModDownloadUncheckedCreateWithoutVersionInput>
  }

  export type ModDownloadCreateManyVersionInputEnvelope = {
    data: Enumerable<ModDownloadCreateManyVersionInput>
    skipDuplicates?: boolean
  }

  export type ModUpsertWithoutVersionsInput = {
    update: XOR<ModUpdateWithoutVersionsInput, ModUncheckedUpdateWithoutVersionsInput>
    create: XOR<ModCreateWithoutVersionsInput, ModUncheckedCreateWithoutVersionsInput>
  }

  export type ModUpdateWithoutVersionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    category?: CategoryUpdateOneWithoutModsNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutVersionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModDownloadUpsertWithWhereUniqueWithoutVersionInput = {
    where: ModDownloadWhereUniqueInput
    update: XOR<ModDownloadUpdateWithoutVersionInput, ModDownloadUncheckedUpdateWithoutVersionInput>
    create: XOR<ModDownloadCreateWithoutVersionInput, ModDownloadUncheckedCreateWithoutVersionInput>
  }

  export type ModDownloadUpdateWithWhereUniqueWithoutVersionInput = {
    where: ModDownloadWhereUniqueInput
    data: XOR<ModDownloadUpdateWithoutVersionInput, ModDownloadUncheckedUpdateWithoutVersionInput>
  }

  export type ModDownloadUpdateManyWithWhereWithoutVersionInput = {
    where: ModDownloadScalarWhereInput
    data: XOR<ModDownloadUpdateManyMutationInput, ModDownloadUncheckedUpdateManyWithoutDownloadsInput>
  }

  export type ModDownloadScalarWhereInput = {
    AND?: Enumerable<ModDownloadScalarWhereInput>
    OR?: Enumerable<ModDownloadScalarWhereInput>
    NOT?: Enumerable<ModDownloadScalarWhereInput>
    id?: IntFilter | number
    ip?: StringFilter | string
    userAgent?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    modVersionId?: IntNullableFilter | number | null
  }

  export type ModCreateWithoutTagsInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    category?: CategoryCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    images?: ModImageCreateNestedManyWithoutModInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutTagsInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutTagsInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutTagsInput, ModUncheckedCreateWithoutTagsInput>
  }

  export type ModUpsertWithWhereUniqueWithoutTagsInput = {
    where: ModWhereUniqueInput
    update: XOR<ModUpdateWithoutTagsInput, ModUncheckedUpdateWithoutTagsInput>
    create: XOR<ModCreateWithoutTagsInput, ModUncheckedCreateWithoutTagsInput>
  }

  export type ModUpdateWithWhereUniqueWithoutTagsInput = {
    where: ModWhereUniqueInput
    data: XOR<ModUpdateWithoutTagsInput, ModUncheckedUpdateWithoutTagsInput>
  }

  export type ModUpdateManyWithWhereWithoutTagsInput = {
    where: ModScalarWhereInput
    data: XOR<ModUpdateManyMutationInput, ModUncheckedUpdateManyWithoutModsInput>
  }

  export type ModCreateWithoutCategoryInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    tags?: TagCreateNestedManyWithoutModsInput
    images?: ModImageCreateNestedManyWithoutModInput
    favorites?: ModFavoriteCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
    favorites?: ModFavoriteUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutCategoryInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutCategoryInput, ModUncheckedCreateWithoutCategoryInput>
  }

  export type ModCreateManyCategoryInputEnvelope = {
    data: Enumerable<ModCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type ModUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ModWhereUniqueInput
    update: XOR<ModUpdateWithoutCategoryInput, ModUncheckedUpdateWithoutCategoryInput>
    create: XOR<ModCreateWithoutCategoryInput, ModUncheckedCreateWithoutCategoryInput>
  }

  export type ModUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ModWhereUniqueInput
    data: XOR<ModUpdateWithoutCategoryInput, ModUncheckedUpdateWithoutCategoryInput>
  }

  export type ModUpdateManyWithWhereWithoutCategoryInput = {
    where: ModScalarWhereInput
    data: XOR<ModUpdateManyMutationInput, ModUncheckedUpdateManyWithoutModsInput>
  }

  export type ModVersionCreateWithoutDownloadsInput = {
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mod?: ModCreateNestedOneWithoutVersionsInput
  }

  export type ModVersionUncheckedCreateWithoutDownloadsInput = {
    id?: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModVersionCreateOrConnectWithoutDownloadsInput = {
    where: ModVersionWhereUniqueInput
    create: XOR<ModVersionCreateWithoutDownloadsInput, ModVersionUncheckedCreateWithoutDownloadsInput>
  }

  export type ModVersionUpsertWithoutDownloadsInput = {
    update: XOR<ModVersionUpdateWithoutDownloadsInput, ModVersionUncheckedUpdateWithoutDownloadsInput>
    create: XOR<ModVersionCreateWithoutDownloadsInput, ModVersionUncheckedCreateWithoutDownloadsInput>
  }

  export type ModVersionUpdateWithoutDownloadsInput = {
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mod?: ModUpdateOneWithoutVersionsNestedInput
  }

  export type ModVersionUncheckedUpdateWithoutDownloadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateWithoutFavoriteModsInput = {
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoriteModsInput = {
    id?: number
    email: string
    password: string
    name: string
    image_url?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mods?: ModUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoriteModsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoriteModsInput, UserUncheckedCreateWithoutFavoriteModsInput>
  }

  export type ModCreateWithoutFavoritesInput = {
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutModsInput
    category?: CategoryCreateNestedOneWithoutModsInput
    versions?: ModVersionCreateNestedManyWithoutModInput
    tags?: TagCreateNestedManyWithoutModsInput
    images?: ModImageCreateNestedManyWithoutModInput
  }

  export type ModUncheckedCreateWithoutFavoritesInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    categoryId?: number | null
    versions?: ModVersionUncheckedCreateNestedManyWithoutModInput
    tags?: TagUncheckedCreateNestedManyWithoutModsInput
    images?: ModImageUncheckedCreateNestedManyWithoutModInput
  }

  export type ModCreateOrConnectWithoutFavoritesInput = {
    where: ModWhereUniqueInput
    create: XOR<ModCreateWithoutFavoritesInput, ModUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoriteModsInput = {
    update: XOR<UserUpdateWithoutFavoriteModsInput, UserUncheckedUpdateWithoutFavoriteModsInput>
    create: XOR<UserCreateWithoutFavoriteModsInput, UserUncheckedCreateWithoutFavoriteModsInput>
  }

  export type UserUpdateWithoutFavoriteModsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoriteModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mods?: ModUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ModUpsertWithoutFavoritesInput = {
    update: XOR<ModUpdateWithoutFavoritesInput, ModUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ModCreateWithoutFavoritesInput, ModUncheckedCreateWithoutFavoritesInput>
  }

  export type ModUpdateWithoutFavoritesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    category?: CategoryUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModCreateManyUserInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId?: number | null
  }

  export type ModFavoriteCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    modId?: number | null
  }

  export type ModUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateManyWithoutModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModFavoriteUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mod?: ModUpdateOneWithoutFavoritesNestedInput
  }

  export type ModFavoriteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModFavoriteUncheckedUpdateManyWithoutFavoriteModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModVersionCreateManyModInput = {
    id?: number
    version: string
    isLatest: boolean
    changelog: string
    downloadUrl: string
    extension?: string | null
    filename?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModImageCreateManyModInput = {
    id?: number
    url: string
    preview_url?: string | null
    isPrimary: boolean
    isThumbnail: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModFavoriteCreateManyModInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
  }

  export type ModVersionUpdateWithoutModInput = {
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    downloads?: ModDownloadUpdateManyWithoutVersionNestedInput
  }

  export type ModVersionUncheckedUpdateWithoutModInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    downloads?: ModDownloadUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type ModVersionUncheckedUpdateManyWithoutVersionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    changelog?: StringFieldUpdateOperationsInput | string
    downloadUrl?: StringFieldUpdateOperationsInput | string
    extension?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutModsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateWithoutModsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModImageUpdateWithoutModInput = {
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModImageUncheckedUpdateWithoutModInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModImageUncheckedUpdateManyWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    preview_url?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    isThumbnail?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModFavoriteUpdateWithoutModInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutFavoriteModsNestedInput
  }

  export type ModFavoriteUncheckedUpdateWithoutModInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModFavoriteUncheckedUpdateManyWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModDownloadCreateManyVersionInput = {
    id?: number
    ip: string
    userAgent: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModDownloadUpdateWithoutVersionInput = {
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModDownloadUncheckedUpdateWithoutVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModDownloadUncheckedUpdateManyWithoutDownloadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModUpdateWithoutTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    category?: CategoryUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }

  export type ModCreateManyCategoryInput = {
    id?: number
    name: string
    slug: string
    shortDescription?: string
    description: string
    isNSFW: boolean
    isApproved: boolean
    isFeatured: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
  }

  export type ModUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutModsNestedInput
    versions?: ModVersionUpdateManyWithoutModNestedInput
    tags?: TagUpdateManyWithoutModsNestedInput
    images?: ModImageUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUpdateManyWithoutModNestedInput
  }

  export type ModUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isNSFW?: BoolFieldUpdateOperationsInput | boolean
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    versions?: ModVersionUncheckedUpdateManyWithoutModNestedInput
    tags?: TagUncheckedUpdateManyWithoutModsNestedInput
    images?: ModImageUncheckedUpdateManyWithoutModNestedInput
    favorites?: ModFavoriteUncheckedUpdateManyWithoutModNestedInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}