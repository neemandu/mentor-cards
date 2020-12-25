/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

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
};

export type DeleteCardsPackInput = {
  id?: string | null;
};

export type CreatePackOwnerInput = {
  id?: string | null;
  packID: string;
  userID: string;
};

export type ModelPackOwnerConditionInput = {
  packID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelPackOwnerConditionInput | null> | null;
  or?: Array<ModelPackOwnerConditionInput | null> | null;
  not?: ModelPackOwnerConditionInput | null;
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

export enum UserAction {
  SWITCH_CARDS_PACK = "SWITCH_CARDS_PACK",
  SWITCH_PAYMENT_PROGRAM = "SWITCH_PAYMENT_PROGRAM",
  ADD_CARDS_PACK = "ADD_CARDS_PACK",
  CREATE_USER = "CREATE_USER"
}

export type UpdatePackOwnerInput = {
  id: string;
  packID?: string | null;
  userID?: string | null;
};

export type DeletePackOwnerInput = {
  id?: string | null;
};

export type CreateUserInput = {
  id?: string | null;
  username: string;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  subscription?: MonthlySubscriptionInput | null;
  numberOfPacksSubstitutions?: number | null;
  lastPackSubstitutionDate?: string | null;
  numberOfPlansSubstitutions?: number | null;
  lastPlanSubstitutionDate?: string | null;
  groupId?: number | null;
  isGroupOwner?: boolean | null;
  action: UserAction;
  userGroupUsersId?: string | null;
};

export type MonthlySubscriptionInput = {
  id: string;
  paymentProvider?: string | null;
  providerSubscriptionId: string;
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  status?: ModelStringInput | null;
  numberOfPacksSubstitutions?: ModelIntInput | null;
  lastPackSubstitutionDate?: ModelStringInput | null;
  numberOfPlansSubstitutions?: ModelIntInput | null;
  lastPlanSubstitutionDate?: ModelStringInput | null;
  groupId?: ModelIntInput | null;
  isGroupOwner?: ModelBooleanInput | null;
  action?: ModelUserActionInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
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

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelUserActionInput = {
  eq?: UserAction | null;
  ne?: UserAction | null;
};

export type UpdateUserInput = {
  id: string;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  subscription?: MonthlySubscriptionInput | null;
  numberOfPacksSubstitutions?: number | null;
  lastPackSubstitutionDate?: string | null;
  numberOfPlansSubstitutions?: number | null;
  lastPlanSubstitutionDate?: string | null;
  groupId?: number | null;
  isGroupOwner?: boolean | null;
  action?: UserAction | null;
  userGroupUsersId?: string | null;
};

export type DeleteUserInput = {
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
  and?: Array<ModelCardsPackFilterInput | null> | null;
  or?: Array<ModelCardsPackFilterInput | null> | null;
  not?: ModelCardsPackFilterInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  status?: ModelStringInput | null;
  numberOfPacksSubstitutions?: ModelIntInput | null;
  lastPackSubstitutionDate?: ModelStringInput | null;
  numberOfPlansSubstitutions?: ModelIntInput | null;
  lastPlanSubstitutionDate?: ModelStringInput | null;
  groupId?: ModelIntInput | null;
  isGroupOwner?: ModelBooleanInput | null;
  action?: ModelUserActionInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePackOwnerMutation = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdatePackOwnerMutation = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeletePackOwnerMutation = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
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
  users: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreatePackOwnerSubscription = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePackOwnerSubscription = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePackOwnerSubscription = {
  __typename: "PackOwner";
  id: string;
  packID: string;
  userID: string;
  pack: {
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
    users: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  owner: {
    __typename: "User";
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    cardsPacks: {
      __typename: "ModelPackOwnerConnection";
      nextToken: string | null;
    } | null;
    status: string | null;
    subscription: {
      __typename: "MonthlySubscription";
      id: string;
      paymentProvider: string | null;
      providerSubscriptionId: string;
    } | null;
    numberOfPacksSubstitutions: number | null;
    lastPackSubstitutionDate: string | null;
    numberOfPlansSubstitutions: number | null;
    lastPlanSubstitutionDate: string | null;
    groupId: number | null;
    isGroupOwner: boolean | null;
    groupUsers: {
      __typename: "ModelUserConnection";
      nextToken: string | null;
    } | null;
    action: UserAction;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  cardsPacks: {
    __typename: "ModelPackOwnerConnection";
    items: Array<{
      __typename: "PackOwner";
      id: string;
      packID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  status: string | null;
  subscription: {
    __typename: "MonthlySubscription";
    id: string;
    paymentProvider: string | null;
    providerSubscriptionId: string;
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
  groupId: number | null;
  isGroupOwner: boolean | null;
  groupUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string | null;
      phone: string | null;
      status: string | null;
      numberOfPacksSubstitutions: number | null;
      lastPackSubstitutionDate: string | null;
      numberOfPlansSubstitutions: number | null;
      lastPlanSubstitutionDate: string | null;
      groupId: number | null;
      isGroupOwner: boolean | null;
      action: UserAction;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
  action: UserAction;
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
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
    return <DeleteCardsPackMutation>response.data.deleteCardsPack;
  }
  async CreatePackOwner(
    input: CreatePackOwnerInput,
    condition?: ModelPackOwnerConditionInput
  ): Promise<CreatePackOwnerMutation> {
    const statement = `mutation CreatePackOwner($input: CreatePackOwnerInput!, $condition: ModelPackOwnerConditionInput) {
        createPackOwner(input: $input, condition: $condition) {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
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
    return <CreatePackOwnerMutation>response.data.createPackOwner;
  }
  async UpdatePackOwner(
    input: UpdatePackOwnerInput,
    condition?: ModelPackOwnerConditionInput
  ): Promise<UpdatePackOwnerMutation> {
    const statement = `mutation UpdatePackOwner($input: UpdatePackOwnerInput!, $condition: ModelPackOwnerConditionInput) {
        updatePackOwner(input: $input, condition: $condition) {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
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
    return <UpdatePackOwnerMutation>response.data.updatePackOwner;
  }
  async DeletePackOwner(
    input: DeletePackOwnerInput,
    condition?: ModelPackOwnerConditionInput
  ): Promise<DeletePackOwnerMutation> {
    const statement = `mutation DeletePackOwner($input: DeletePackOwnerInput!, $condition: ModelPackOwnerConditionInput) {
        deletePackOwner(input: $input, condition: $condition) {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
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
    return <DeletePackOwnerMutation>response.data.deletePackOwner;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
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
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
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
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
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
    return <DeleteUserMutation>response.data.deleteUser;
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
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
            users {
              __typename
              nextToken
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
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
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
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
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
          users {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCardsPackSubscription>>;

  OnCreatePackOwnerListener: Observable<
    SubscriptionResponse<OnCreatePackOwnerSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePackOwner {
        onCreatePackOwner {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreatePackOwnerSubscription>>;

  OnUpdatePackOwnerListener: Observable<
    SubscriptionResponse<OnUpdatePackOwnerSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePackOwner {
        onUpdatePackOwner {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdatePackOwnerSubscription>>;

  OnDeletePackOwnerListener: Observable<
    SubscriptionResponse<OnDeletePackOwnerSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePackOwner {
        onDeletePackOwner {
          __typename
          id
          packID
          userID
          pack {
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
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          owner {
            __typename
            id
            username
            email
            phone
            cardsPacks {
              __typename
              nextToken
            }
            status
            subscription {
              __typename
              id
              paymentProvider
              providerSubscriptionId
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            groupId
            isGroupOwner
            groupUsers {
              __typename
              nextToken
            }
            action
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeletePackOwnerSubscription>>;

  OnCreateUserListener: Observable<
    SubscriptionResponse<OnCreateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($username: String!) {
        onCreateUser(username: $username) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserSubscription>>;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<OnUpdateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($username: String!) {
        onUpdateUser(username: $username) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserSubscription>>;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<OnDeleteUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($username: String!) {
        onDeleteUser(username: $username) {
          __typename
          id
          username
          email
          phone
          cardsPacks {
            __typename
            items {
              __typename
              id
              packID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          status
          subscription {
            __typename
            id
            paymentProvider
            providerSubscriptionId
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
          groupId
          isGroupOwner
          groupUsers {
            __typename
            items {
              __typename
              id
              username
              email
              phone
              status
              numberOfPacksSubstitutions
              lastPackSubstitutionDate
              numberOfPlansSubstitutions
              lastPlanSubstitutionDate
              groupId
              isGroupOwner
              action
              createdAt
              updatedAt
            }
            nextToken
          }
          action
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserSubscription>>;

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
