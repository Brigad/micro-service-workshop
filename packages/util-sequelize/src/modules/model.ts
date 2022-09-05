import { Optional } from 'sequelize';
import { Model as SequelizeModel } from 'sequelize-typescript';

type OptionalAttributes = 'id' | 'created_at' | 'updated_at';

type OptionalAndNullable<T, K extends keyof T> = Optional<
  {
    [P in K]: T[P] | null;
  },
  K
>;

export class Model<
  Attributes extends SequelizeModel,
  RequiredCreationAttributes extends keyof Attributes = never,
  OmittedCreationAttributes extends keyof Attributes = never,
> extends SequelizeModel<
  Attributes,
  OptionalAndNullable<Attributes, keyof Attributes> &
    Pick<
      Attributes,
      [RequiredCreationAttributes] extends [never]
        ? Exclude<keyof Attributes, keyof SequelizeModel | OptionalAttributes | OmittedCreationAttributes>
        : RequiredCreationAttributes
    >
> {}
