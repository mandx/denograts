/** @gqlScalar */
export type Float = number;
/** @gqlScalar */
export type Int = number;
/** @gqlScalar */
export type ID = string;

/** @gqlInterface */
interface Node {
  /** @gqlField */
  id(): ID;
}

/** @gqlType */
export default class Query {
  /**
   * @gqlField
   */
  testInt(): Int {
    return 1;
  }

  /**
   * @gqlField
   */
  testFloat(): Float {
    return 1;
  }

  /**
   * @gqlField
   */
  me(): UserResolver {
    return new UserResolver('1');
  }

  /**
   * @gqlField
   * @deprecated Please use `me` instead.
   */
  viewer(): UserResolver {
    return new UserResolver('1');
  }

  /** @gqlField */
  node({ id }: { id: ID }): Node | undefined {
    return new UserResolver(id);
  }
}

/**
 * A user in our kick-ass system!
 * @gqlType User
 */
class UserResolver implements Node {
  __typename = 'User'

  #data: {
    id: ID;
    name: string;
  }

  constructor(id: ID) {
    this.#data = {
      id, name: 'Alice'
    };
  }

  /** @gqlField */
  id(): ID {
    return this.#data.id;
  }

  /** @gqlField */
  name(): string {
    return this.#data.name;
  }

  /** @gqlField */
  greeting(args: { salutation: string }): string {
    return `${args.salutation}, ${this.name}`;
  }
}
