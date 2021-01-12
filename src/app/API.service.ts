/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateUserInput = {
  username?: string | null;
  email?: string | null;
};

export type addCardsPackInput = {
  cardsPackId?: string | null;
};

export type changeCardsPackInput = {
  oldCardsPackId?: string | null;
  newCardsPackId?: string | null;
};

export type updatePaymentProgramInput = {
  paymentProgramId: string;
  providerTransactionId?: string | null;
};

export type groupUsersListInput = {
  usernamesList?: Array<GroupUserRoleInput | null> | null;
};

export type GroupUserRoleInput = {
  email?: string | null;
  role?: string | null;
};

export type unSubscribeInput = {
  username: string;
};

export type joinExistingGroupInput = {
  groupId: string;
};

export type deleteGroupInput = {
  groupId: string;
};

export type CreateCardsPackInput = {
  id?: string | null;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  usersIds?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  users?: Array<string | null> | null;
};

export type ModelCardsPackConditionInput = {
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cards?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  usersIds?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  users?: ModelStringInput | null;
  and?: Array<ModelCardsPackConditionInput | null> | null;
  or?: Array<ModelCardsPackConditionInput | null> | null;
  not?: ModelCardsPackConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateCardsPackInput = {
  id: string;
  imgUrl?: string | null;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  usersIds?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  users?: Array<string | null> | null;
};

export type DeleteCardsPackInput = {
  id?: string | null;
};

export type CreateGroupInput = {
  id?: string | null;
  groupUsers?: Array<GroupUserRoleInput | null> | null;
};

export type ModelGroupConditionInput = {
  and?: Array<ModelGroupConditionInput | null> | null;
  or?: Array<ModelGroupConditionInput | null> | null;
  not?: ModelGroupConditionInput | null;
};

export type UpdateGroupInput = {
  id: string;
  groupUsers?: Array<GroupUserRoleInput | null> | null;
};

export type DeleteGroupInput = {
  id?: string | null;
};

export type CreateSubscriptionPlanInput = {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  price?: number | null;
  discount?: number | null;
};

export type ModelSubscriptionPlanConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  providerPlanId?: ModelStringInput | null;
  numberOfUsers?: ModelIntInput | null;
  numberOfCardPacks?: ModelIntInput | null;
  price?: ModelFloatInput | null;
  discount?: ModelFloatInput | null;
  and?: Array<ModelSubscriptionPlanConditionInput | null> | null;
  or?: Array<ModelSubscriptionPlanConditionInput | null> | null;
  not?: ModelSubscriptionPlanConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateSubscriptionPlanInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId?: string | null;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  price?: number | null;
  discount?: number | null;
};

export type DeleteSubscriptionPlanInput = {
  id?: string | null;
};

export type GetGroupInput = {
  id: string;
};

export type ModelCardsPackFilterInput = {
  id?: ModelIDInput | null;
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cards?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  usersIds?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  users?: ModelStringInput | null;
  and?: Array<ModelCardsPackFilterInput | null> | null;
  or?: Array<ModelCardsPackFilterInput | null> | null;
  not?: ModelCardsPackFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelIDInput | null;
  email?: ModelIDInput | null;
  phone?: ModelStringInput | null;
  status?: ModelStringInput | null;
  numberOfPacksSubstitutions?: ModelIntInput | null;
  lastPackSubstitutionDate?: ModelStringInput | null;
  numberOfPlansSubstitutions?: ModelIntInput | null;
  lastPlanSubstitutionDate?: ModelStringInput | null;
  startPayingSinceDate?: ModelStringInput | null;
  groupId?: ModelStringInput | null;
  numberOfUsedPacks?: ModelIntInput | null;
  test?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelGroupFilterInput | null> | null;
  or?: Array<ModelGroupFilterInput | null> | null;
  not?: ModelGroupFilterInput | null;
};

export type ModelSubscriptionPlanFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  providerPlanId?: ModelStringInput | null;
  numberOfUsers?: ModelIntInput | null;
  numberOfCardPacks?: ModelIntInput | null;
  price?: ModelFloatInput | null;
  discount?: ModelFloatInput | null;
  and?: Array<ModelSubscriptionPlanFilterInput | null> | null;
  or?: Array<ModelSubscriptionPlanFilterInput | null> | null;
  not?: ModelSubscriptionPlanFilterInput | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phone: string | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    startDate: string | null;
    paymentProvider: string | null;
    providerTransactionId: string | null;
    subscriptionPlan: {
      __typename: "SubscriptionPlan";
      id: string;
      name: string | null;
      description: string | null;
      providerPlanId: string;
      numberOfUsers: number | null;
      numberOfCardPacks: number | null;
      price: number | null;
      discount: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
  numberOfPacksSubstitutions: number | null;
  lastPackSubstitutionDate: string | null;
  numberOfPlansSubstitutions: number | null;
  lastPlanSubstitutionDate: string | null;
  startPayingSinceDate: string | null;
  groupId: string | null;
  numberOfUsedPacks: number | null;
  test: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type GetGroupByIdQuery = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type GetCardsPackQuery = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCardsPacksQuery = {
  __typename: "ModelCardsPackConnection";
  items: Array<{
    __typename: "CardsPack";
    id: string;
    imgUrl: string;
    description: string | null;
    tags: Array<string | null> | null;
    categories: Array<string | null> | null;
    cards: Array<string | null> | null;
    cardsPreview: Array<string | null> | null;
    usersIds: Array<string | null> | null;
    groupsIds: Array<string | null> | null;
    users: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phone: string | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    startDate: string | null;
    paymentProvider: string | null;
    providerTransactionId: string | null;
    subscriptionPlan: {
      __typename: "SubscriptionPlan";
      id: string;
      name: string | null;
      description: string | null;
      providerPlanId: string;
      numberOfUsers: number | null;
      numberOfCardPacks: number | null;
      price: number | null;
      discount: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
  numberOfPacksSubstitutions: number | null;
  lastPackSubstitutionDate: string | null;
  numberOfPlansSubstitutions: number | null;
  lastPlanSubstitutionDate: string | null;
  startPayingSinceDate: string | null;
  groupId: string | null;
  numberOfUsedPacks: number | null;
  test: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    username: string;
    email: string;
    phone: string | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      startDate: string | null;
      paymentProvider: string | null;
      providerTransactionId: string | null;
      subscriptionPlan: {
        __typename: "SubscriptionPlan";
        id: string;
        name: string | null;
        description: string | null;
        providerPlanId: string;
        numberOfUsers: number | null;
        numberOfCardPacks: number | null;
        price: number | null;
        discount: number | null;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    startPayingSinceDate: string | null;
    groupId: string | null;
    numberOfUsedPacks: number | null;
    test: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetGroupQuery = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListGroupsQuery = {
  __typename: "ModelGroupConnection";
  items: Array<{
    __typename: "Group";
    id: string;
    groupUsers: Array<{
      __typename: "GroupUserRole";
      email: string | null;
      role: string | null;
    } | null> | null;
    paymentProgram: {
      __typename: "SubscriptionPlan";
      id: string;
      name: string | null;
      description: string | null;
      providerPlanId: string;
      numberOfUsers: number | null;
      numberOfCardPacks: number | null;
      price: number | null;
      discount: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetSubscriptionPlanQuery = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListSubscriptionPlansQuery = {
  __typename: "ModelSubscriptionPlanConnection";
  items: Array<{
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description: string | null;
  tags: Array<string | null> | null;
  categories: Array<string | null> | null;
  cards: Array<string | null> | null;
  cardsPreview: Array<string | null> | null;
  usersIds: Array<string | null> | null;
  groupsIds: Array<string | null> | null;
  users: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers: Array<{
    __typename: "GroupUserRole";
    email: string | null;
    role: string | null;
  } | null> | null;
  paymentProgram: {
    __typename: "SubscriptionPlan";
    id: string;
    name: string | null;
    description: string | null;
    providerPlanId: string;
    numberOfUsers: number | null;
    numberOfCardPacks: number | null;
    price: number | null;
    discount: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name: string | null;
  description: string | null;
  providerPlanId: string;
  numberOfUsers: number | null;
  numberOfCardPacks: number | null;
  price: number | null;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUser(input: CreateUserInput): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          __typename
          id
          username
          email
          phone
          status
          subscription {
            __typename
            id
            startDate
            paymentProvider
            providerTransactionId
            subscriptionPlan {
              __typename
              id
              name
              description
              providerPlanId
              numberOfUsers
              numberOfCardPacks
              price
              discount
              createdAt
              updatedAt
            }
          }
          numberOfPacksSubstitutions
          lastPackSubstitutionDate
          numberOfPlansSubstitutions
          lastPlanSubstitutionDate
          startPayingSinceDate
          groupId
          numberOfUsedPacks
          test
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async AddCardsPack(input: addCardsPackInput): Promise<boolean | null> {
    const statement = `mutation AddCardsPack($input: addCardsPackInput!) {
        addCardsPack(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.addCardsPack;
  }
  async ChangeCardsPack(input: changeCardsPackInput): Promise<boolean | null> {
    const statement = `mutation ChangeCardsPack($input: changeCardsPackInput!) {
        changeCardsPack(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.changeCardsPack;
  }
  async UpdatePaymentProgram(
    input: updatePaymentProgramInput
  ): Promise<boolean | null> {
    const statement = `mutation UpdatePaymentProgram($input: updatePaymentProgramInput!) {
        updatePaymentProgram(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.updatePaymentProgram;
  }
  async UpdateGroupUsersList(
    input: groupUsersListInput
  ): Promise<boolean | null> {
    const statement = `mutation UpdateGroupUsersList($input: groupUsersListInput!) {
        updateGroupUsersList(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.updateGroupUsersList;
  }
  async Unsubscribe(input: unSubscribeInput): Promise<boolean | null> {
    const statement = `mutation Unsubscribe($input: unSubscribeInput!) {
        Unsubscribe(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.Unsubscribe;
  }
  async JoinExistingGroup(
    input: joinExistingGroupInput
  ): Promise<boolean | null> {
    const statement = `mutation JoinExistingGroup($input: joinExistingGroupInput!) {
        JoinExistingGroup(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.JoinExistingGroup;
  }
  async DeleteGroupById(input: deleteGroupInput): Promise<boolean | null> {
    const statement = `mutation DeleteGroupById($input: deleteGroupInput!) {
        DeleteGroupById(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.DeleteGroupById;
  }
  async CreateCardsPack(
    input: CreateCardsPackInput,
    condition?: ModelCardsPackConditionInput
  ): Promise<CreateCardsPackMutation> {
    const statement = `mutation CreateCardsPack($input: CreateCardsPackInput!, $condition: ModelCardsPackConditionInput) {
        createCardsPack(input: $input, condition: $condition) {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCardsPackMutation>response.data.createCardsPack;
  }
  async UpdateCardsPack(
    input: UpdateCardsPackInput,
    condition?: ModelCardsPackConditionInput
  ): Promise<UpdateCardsPackMutation> {
    const statement = `mutation UpdateCardsPack($input: UpdateCardsPackInput!, $condition: ModelCardsPackConditionInput) {
        updateCardsPack(input: $input, condition: $condition) {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCardsPackMutation>response.data.updateCardsPack;
  }
  async DeleteCardsPack(
    input: DeleteCardsPackInput,
    condition?: ModelCardsPackConditionInput
  ): Promise<DeleteCardsPackMutation> {
    const statement = `mutation DeleteCardsPack($input: DeleteCardsPackInput!, $condition: ModelCardsPackConditionInput) {
        deleteCardsPack(input: $input, condition: $condition) {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCardsPackMutation>response.data.deleteCardsPack;
  }
  async CreateGroup(
    input: CreateGroupInput,
    condition?: ModelGroupConditionInput
  ): Promise<CreateGroupMutation> {
    const statement = `mutation CreateGroup($input: CreateGroupInput!, $condition: ModelGroupConditionInput) {
        createGroup(input: $input, condition: $condition) {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateGroupMutation>response.data.createGroup;
  }
  async UpdateGroup(
    input: UpdateGroupInput,
    condition?: ModelGroupConditionInput
  ): Promise<UpdateGroupMutation> {
    const statement = `mutation UpdateGroup($input: UpdateGroupInput!, $condition: ModelGroupConditionInput) {
        updateGroup(input: $input, condition: $condition) {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateGroupMutation>response.data.updateGroup;
  }
  async DeleteGroup(
    input: DeleteGroupInput,
    condition?: ModelGroupConditionInput
  ): Promise<DeleteGroupMutation> {
    const statement = `mutation DeleteGroup($input: DeleteGroupInput!, $condition: ModelGroupConditionInput) {
        deleteGroup(input: $input, condition: $condition) {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteGroupMutation>response.data.deleteGroup;
  }
  async CreateSubscriptionPlan(
    input: CreateSubscriptionPlanInput,
    condition?: ModelSubscriptionPlanConditionInput
  ): Promise<CreateSubscriptionPlanMutation> {
    const statement = `mutation CreateSubscriptionPlan($input: CreateSubscriptionPlanInput!, $condition: ModelSubscriptionPlanConditionInput) {
        createSubscriptionPlan(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateSubscriptionPlanMutation>response.data.createSubscriptionPlan;
  }
  async UpdateSubscriptionPlan(
    input: UpdateSubscriptionPlanInput,
    condition?: ModelSubscriptionPlanConditionInput
  ): Promise<UpdateSubscriptionPlanMutation> {
    const statement = `mutation UpdateSubscriptionPlan($input: UpdateSubscriptionPlanInput!, $condition: ModelSubscriptionPlanConditionInput) {
        updateSubscriptionPlan(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateSubscriptionPlanMutation>response.data.updateSubscriptionPlan;
  }
  async DeleteSubscriptionPlan(
    input: DeleteSubscriptionPlanInput,
    condition?: ModelSubscriptionPlanConditionInput
  ): Promise<DeleteSubscriptionPlanMutation> {
    const statement = `mutation DeleteSubscriptionPlan($input: DeleteSubscriptionPlanInput!, $condition: ModelSubscriptionPlanConditionInput) {
        deleteSubscriptionPlan(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteSubscriptionPlanMutation>response.data.deleteSubscriptionPlan;
  }
  async GetGroupById(input: GetGroupInput): Promise<GetGroupByIdQuery> {
    const statement = `query GetGroupById($input: GetGroupInput!) {
        GetGroupById(input: $input) {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetGroupByIdQuery>response.data.GetGroupById;
  }
  async IsInGroup(input: GetGroupInput): Promise<boolean | null> {
    const statement = `query IsInGroup($input: GetGroupInput!) {
        IsInGroup(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.IsInGroup;
  }
  async GetCardsPack(id: string): Promise<GetCardsPackQuery> {
    const statement = `query GetCardsPack($id: ID!) {
        getCardsPack(id: $id) {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCardsPackQuery>response.data.getCardsPack;
  }
  async ListCardsPacks(
    filter?: ModelCardsPackFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCardsPacksQuery> {
    const statement = `query ListCardsPacks($filter: ModelCardsPackFilterInput, $limit: Int, $nextToken: String) {
        listCardsPacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            imgUrl
            description
            tags
            categories
            cards
            cardsPreview
            usersIds
            groupsIds
            users
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCardsPacksQuery>response.data.listCardsPacks;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          username
          email
          phone
          status
          subscription {
            __typename
            id
            startDate
            paymentProvider
            providerTransactionId
            subscriptionPlan {
              __typename
              id
              name
              description
              providerPlanId
              numberOfUsers
              numberOfCardPacks
              price
              discount
              createdAt
              updatedAt
            }
          }
          numberOfPacksSubstitutions
          lastPackSubstitutionDate
          numberOfPlansSubstitutions
          lastPlanSubstitutionDate
          startPayingSinceDate
          groupId
          numberOfUsedPacks
          test
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            email
            phone
            status
            subscription {
              __typename
              id
              startDate
              paymentProvider
              providerTransactionId
              subscriptionPlan {
                __typename
                id
                name
                description
                providerPlanId
                numberOfUsers
                numberOfCardPacks
                price
                discount
                createdAt
                updatedAt
              }
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            startPayingSinceDate
            groupId
            numberOfUsedPacks
            test
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async GetGroup(id: string): Promise<GetGroupQuery> {
    const statement = `query GetGroup($id: ID!) {
        getGroup(id: $id) {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetGroupQuery>response.data.getGroup;
  }
  async ListGroups(
    filter?: ModelGroupFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListGroupsQuery> {
    const statement = `query ListGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
        listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            groupUsers {
              __typename
              email
              role
            }
            paymentProgram {
              __typename
              id
              name
              description
              providerPlanId
              numberOfUsers
              numberOfCardPacks
              price
              discount
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListGroupsQuery>response.data.listGroups;
  }
  async GetSubscriptionPlan(id: string): Promise<GetSubscriptionPlanQuery> {
    const statement = `query GetSubscriptionPlan($id: ID!) {
        getSubscriptionPlan(id: $id) {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSubscriptionPlanQuery>response.data.getSubscriptionPlan;
  }
  async ListSubscriptionPlans(
    filter?: ModelSubscriptionPlanFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSubscriptionPlansQuery> {
    const statement = `query ListSubscriptionPlans($filter: ModelSubscriptionPlanFilterInput, $limit: Int, $nextToken: String) {
        listSubscriptionPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSubscriptionPlansQuery>response.data.listSubscriptionPlans;
  }
  OnCreateCardsPackListener: Observable<
    SubscriptionResponse<OnCreateCardsPackSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCardsPack {
        onCreateCardsPack {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateCardsPackSubscription>>;

  OnUpdateCardsPackListener: Observable<
    SubscriptionResponse<OnUpdateCardsPackSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCardsPack {
        onUpdateCardsPack {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateCardsPackSubscription>>;

  OnDeleteCardsPackListener: Observable<
    SubscriptionResponse<OnDeleteCardsPackSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCardsPack {
        onDeleteCardsPack {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards
          cardsPreview
          usersIds
          groupsIds
          users
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCardsPackSubscription>>;

  OnCreateGroupListener: Observable<
    SubscriptionResponse<OnCreateGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateGroup {
        onCreateGroup {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateGroupSubscription>>;

  OnUpdateGroupListener: Observable<
    SubscriptionResponse<OnUpdateGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateGroup {
        onUpdateGroup {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateGroupSubscription>>;

  OnDeleteGroupListener: Observable<
    SubscriptionResponse<OnDeleteGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteGroup {
        onDeleteGroup {
          __typename
          id
          groupUsers {
            __typename
            email
            role
          }
          paymentProgram {
            __typename
            id
            name
            description
            providerPlanId
            numberOfUsers
            numberOfCardPacks
            price
            discount
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteGroupSubscription>>;

  OnCreateSubscriptionPlanListener: Observable<
    SubscriptionResponse<OnCreateSubscriptionPlanSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateSubscriptionPlan {
        onCreateSubscriptionPlan {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateSubscriptionPlanSubscription>>;

  OnUpdateSubscriptionPlanListener: Observable<
    SubscriptionResponse<OnUpdateSubscriptionPlanSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSubscriptionPlan {
        onUpdateSubscriptionPlan {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateSubscriptionPlanSubscription>>;

  OnDeleteSubscriptionPlanListener: Observable<
    SubscriptionResponse<OnDeleteSubscriptionPlanSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSubscriptionPlan {
        onDeleteSubscriptionPlan {
          __typename
          id
          name
          description
          providerPlanId
          numberOfUsers
          numberOfCardPacks
          price
          discount
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteSubscriptionPlanSubscription>>;
}
