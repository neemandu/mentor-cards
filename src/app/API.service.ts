/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import awsconfig from '../aws-exports';
API.configure(awsconfig)
import { Observable } from "zen-observable-ts";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql/lib-esm/types/index";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}


export type CreateUserInput = {
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  fullName?: string | null;
};

export type User = {
  __typename: "User";
  id?: string;
  username?: string;
  email?: string;
  phone?: string | null;
  status?: string | null;
  subscription?: MonthlySubscription;
  numberOfPacksSubstitutions?: number | null;
  lastPackSubstitutionDate?: string | null;
  numberOfPlansSubstitutions?: number | null;
  lastPlanSubstitutionDate?: string | null;
  firstProgramRegistrationDate?: string | null;
  groupId?: string | null;
  numberOfUsedPacks?: number | null;
  groupRole?: string | null;
  cancellationDate?: string | null;
  couponCodes?: Array<CouponCodes | null> | null;
  cardsPacksIds?: Array<string | null> | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type MonthlySubscription = {
  __typename: "MonthlySubscription";
  id?: string;
  startDate?: string | null;
  paymentProvider?: string | null;
  providerTransactionId?: string | null;
  subscriptionPlan?: SubscriptionPlan;
};

export type SubscriptionPlan = {
  __typename: "SubscriptionPlan";
  id?: string;
  name?: string | null;
  description?: string | null;
  providerPlanId?: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CouponCodes = {
  __typename: "CouponCodes";
  id?: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type addCardsPackInput = {
  cardsPackId?: string | null;
};

export type changeCardsPackInput = {
  oldCardsPackId?: string | null;
  newCardsPackId?: string | null;
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

export type couponCodeInput = {
  couponCode: string;
};

export type updatePaymentProgramInput = {
  paymentProgramId: string;
  providerTransactionId?: string | null;
};

export type CreateContactUsModelInput = {
  id?: string | null;
  name?: string | null;
  content?: string | null;
  email?: string | null;
};

export type ModelContactUsModelConditionInput = {
  name?: ModelStringInput | null;
  content?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelContactUsModelConditionInput | null> | null;
  or?: Array<ModelContactUsModelConditionInput | null> | null;
  not?: ModelContactUsModelConditionInput | null;
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

export type ContactUsModel = {
  __typename: "ContactUsModel";
  id?: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateContactUsModelInput = {
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
};

export type DeleteContactUsModelInput = {
  id: string;
};

export type CreateMessageQueueInput = {
  id?: string | null;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
};

export type ModelMessageQueueConditionInput = {
  email?: ModelStringInput | null;
  emailDeliveryTime?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  smsDeliveryTime?: ModelStringInput | null;
  emailTemplateId?: ModelIntInput | null;
  name?: ModelStringInput | null;
  params?: ModelStringInput | null;
  and?: Array<ModelMessageQueueConditionInput | null> | null;
  or?: Array<ModelMessageQueueConditionInput | null> | null;
  not?: ModelMessageQueueConditionInput | null;
};

export type MessageQueue = {
  __typename: "MessageQueue";
  id?: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateMessageQueueInput = {
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
};

export type DeleteMessageQueueInput = {
  id: string;
};

export type ModelMessageQueueFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  emailDeliveryTime?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  smsDeliveryTime?: ModelStringInput | null;
  emailTemplateId?: ModelIntInput | null;
  name?: ModelStringInput | null;
  params?: ModelStringInput | null;
  and?: Array<ModelMessageQueueFilterInput | null> | null;
  or?: Array<ModelMessageQueueFilterInput | null> | null;
  not?: ModelMessageQueueFilterInput | null;
};

export type ModelMessageQueueConnection = {
  __typename: "ModelMessageQueueConnection";
  items?: Array<MessageQueue>;
  nextToken?: string | null;
};

export type CreateMessageQueueMutation = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMessageQueueMutation = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteMessageQueueMutation = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
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

export type Group = {
  __typename: "Group";
  id?: string;
  groupUsers?: Array<GroupUserRole | null> | null;
  paymentProgram?: SubscriptionPlan;
  createdAt?: string;
  updatedAt?: string;
};

export type GroupUserRole = {
  __typename: "GroupUserRole";
  email?: string | null;
  role?: string | null;
};

export type UpdateGroupInput = {
  id: string;
  groupUsers?: Array<GroupUserRoleInput | null> | null;
};

export type DeleteGroupInput = {
  id: string;
};

export type CreateSubscriptionPlanInput = {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
};

export type ModelSubscriptionPlanConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  providerPlanId?: ModelStringInput | null;
  numberOfUsers?: ModelIntInput | null;
  numberOfCardPacks?: ModelIntInput | null;
  billingCycleInMonths?: ModelFloatInput | null;
  fullPrice?: ModelFloatInput | null;
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
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
};

export type DeleteSubscriptionPlanInput = {
  id: string;
};

export type CreateNewsInput = {
  id?: string | null;
  message?: string | null;
  order?: number | null;
};

export type ModelNewsConditionInput = {
  message?: ModelStringInput | null;
  order?: ModelIntInput | null;
  and?: Array<ModelNewsConditionInput | null> | null;
  or?: Array<ModelNewsConditionInput | null> | null;
  not?: ModelNewsConditionInput | null;
};

export type News = {
  __typename: "News";
  id?: string;
  message?: string | null;
  order?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateNewsInput = {
  id: string;
  message?: string | null;
  order?: number | null;
};

export type DeleteNewsInput = {
  id: string;
};

export type CreateCardsPackInput = {
  id?: string | null;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElementInput | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: AboutInput | null;
};

export type GuideBookElementInput = {
  name?: string | null;
  subElements?: Array<GuideBookElementInput | null> | null;
};

export type AboutInput = {
  text?: string | null;
  imgUrl?: string | null;
  link?: string | null;
};

export type ModelCardsPackConditionInput = {
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cards?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  name?: ModelStringInput | null;
  freeUntilDate?: ModelStringInput | null;
  and?: Array<ModelCardsPackConditionInput | null> | null;
  or?: Array<ModelCardsPackConditionInput | null> | null;
  not?: ModelCardsPackConditionInput | null;
};

export type CardsPack = {
  __typename: "CardsPack";
  id?: string;
  imgUrl?: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElementInput | null>;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: About;
  createdAt?: string;
  updatedAt?: string;
};

export type GuideBookElement = {
  __typename: "GuideBookElement";
  name?: string | null;
  subElements?: Array<GuideBookElement | null> | null;
};

export type About = {
  __typename: "About";
  text?: string | null;
  imgUrl?: string | null;
  link?: string | null;
};

export type UpdateCardsPackInput = {
  id: string;
  imgUrl?: string | null;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElementInput | null>;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: AboutInput | null;
};

export type DeleteCardsPackInput = {
  id: string;
};

export type CreateCouponCodesInput = {
  id?: string | null;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
};

export type ModelCouponCodesConditionInput = {
  organization?: ModelStringInput | null;
  couponCode?: ModelStringInput | null;
  discount?: ModelFloatInput | null;
  trialPeriodInDays?: ModelIntInput | null;
  allowedCardsPacks?: ModelStringInput | null;
  and?: Array<ModelCouponCodesConditionInput | null> | null;
  or?: Array<ModelCouponCodesConditionInput | null> | null;
  not?: ModelCouponCodesConditionInput | null;
};

export type UpdateCouponCodesInput = {
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
};

export type DeleteCouponCodesInput = {
  id: string;
};

export type ModelContactUsModelFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  content?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelContactUsModelFilterInput | null> | null;
  or?: Array<ModelContactUsModelFilterInput | null> | null;
  not?: ModelContactUsModelFilterInput | null;
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

export type ModelContactUsModelConnection = {
  __typename: "ModelContactUsModelConnection";
  items?: Array<ContactUsModel | null> | null;
  nextToken?: string | null;
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
  firstProgramRegistrationDate?: ModelStringInput | null;
  groupId?: ModelStringInput | null;
  numberOfUsedPacks?: ModelIntInput | null;
  groupRole?: ModelStringInput | null;
  cancellationDate?: ModelStringInput | null;
  cardsPacksIds?: ModelStringInput | null;
  providerTransactionId?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items?: Array<User | null> | null;
  nextToken?: string | null;
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelGroupFilterInput | null> | null;
  or?: Array<ModelGroupFilterInput | null> | null;
  not?: ModelGroupFilterInput | null;
};

export type ModelGroupConnection = {
  __typename: "ModelGroupConnection";
  items?: Array<Group | null> | null;
  nextToken?: string | null;
};

export type ModelCouponCodesFilterInput = {
  id?: ModelIDInput | null;
  organization?: ModelStringInput | null;
  couponCode?: ModelStringInput | null;
  discount?: ModelFloatInput | null;
  trialPeriodInDays?: ModelIntInput | null;
  allowedCardsPacks?: ModelStringInput | null;
  and?: Array<ModelCouponCodesFilterInput | null> | null;
  or?: Array<ModelCouponCodesFilterInput | null> | null;
  not?: ModelCouponCodesFilterInput | null;
};

export type ModelCouponCodesConnection = {
  __typename: "ModelCouponCodesConnection";
  items?: Array<CouponCodes | null> | null;
  nextToken?: string | null;
};

export type ModelSubscriptionPlanFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  providerPlanId?: ModelStringInput | null;
  numberOfUsers?: ModelIntInput | null;
  numberOfCardPacks?: ModelIntInput | null;
  billingCycleInMonths?: ModelFloatInput | null;
  fullPrice?: ModelFloatInput | null;
  discount?: ModelFloatInput | null;
  and?: Array<ModelSubscriptionPlanFilterInput | null> | null;
  or?: Array<ModelSubscriptionPlanFilterInput | null> | null;
  not?: ModelSubscriptionPlanFilterInput | null;
};

export type ModelSubscriptionPlanConnection = {
  __typename: "ModelSubscriptionPlanConnection";
  items?: Array<SubscriptionPlan | null> | null;
  nextToken?: string | null;
};

export type ModelNewsFilterInput = {
  id?: ModelIDInput | null;
  message?: ModelStringInput | null;
  order?: ModelIntInput | null;
  and?: Array<ModelNewsFilterInput | null> | null;
  or?: Array<ModelNewsFilterInput | null> | null;
  not?: ModelNewsFilterInput | null;
};

export type ModelNewsConnection = {
  __typename: "ModelNewsConnection";
  items?: Array<News | null> | null;
  nextToken?: string | null;
};

export type ModelCardsPackFilterInput = {
  id?: ModelIDInput | null;
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cards?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  name?: ModelStringInput | null;
  freeUntilDate?: ModelStringInput | null;
  and?: Array<ModelCardsPackFilterInput | null> | null;
  or?: Array<ModelCardsPackFilterInput | null> | null;
  not?: ModelCardsPackFilterInput | null;
};

export type ModelCardsPackConnection = {
  __typename: "ModelCardsPackConnection";
  items?: Array<CardsPack | null> | null;
  nextToken?: string | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  status?: string | null;
  subscription?: {
    __typename: "MonthlySubscription";
    id: string;
    startDate?: string | null;
    paymentProvider?: string | null;
    providerTransactionId?: string | null;
    subscriptionPlan?: {
      __typename: "SubscriptionPlan";
      id: string;
      name?: string | null;
      description?: string | null;
      providerPlanId: string;
      numberOfUsers?: number | null;
      numberOfCardPacks?: number | null;
      billingCycleInMonths?: number | null;
      fullPrice?: number | null;
      discount?: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
  numberOfPacksSubstitutions?: number | null;
  lastPackSubstitutionDate?: string | null;
  numberOfPlansSubstitutions?: number | null;
  lastPlanSubstitutionDate?: string | null;
  firstProgramRegistrationDate?: string | null;
  groupId?: string | null;
  numberOfUsedPacks?: number | null;
  groupRole?: string | null;
  cancellationDate?: string | null;
  couponCodes?: Array<{
    __typename: "CouponCodes";
    id: string;
    organization?: string | null;
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  cardsPacksIds?: Array<string | null> | null; 
  providerTransactionId?: string | null;
  fullName?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteGroupMutation = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteSubscriptionPlanMutation = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateNewsMutation = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateNewsMutation = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteNewsMutation = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCardsPackMutation = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type GetContactUsModelQuery = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListContactUsModelsQuery = {
  __typename: "ModelContactUsModelConnection";
  items?: Array<{
    __typename: "ContactUsModel";
    id: string;
    name?: string | null;
    content?: string | null;
    email?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  status?: string | null;
  subscription?: {
    __typename: "MonthlySubscription";
    id: string;
    startDate?: string | null;
    paymentProvider?: string | null;
    providerTransactionId?: string | null;
    subscriptionPlan?: {
      __typename: "SubscriptionPlan";
      id: string;
      name?: string | null;
      description?: string | null;
      providerPlanId: string;
      numberOfUsers?: number | null;
      numberOfCardPacks?: number | null;
      billingCycleInMonths?: number | null;
      fullPrice?: number | null;
      discount?: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
  numberOfPacksSubstitutions?: number | null;
  lastPackSubstitutionDate?: string | null;
  numberOfPlansSubstitutions?: number | null;
  lastPlanSubstitutionDate?: string | null;
  firstProgramRegistrationDate?: string | null;
  groupId?: string | null;
  numberOfUsedPacks?: number | null;
  groupRole?: string | null;
  cancellationDate?: string | null;
  couponCodes?: Array<{
    __typename: "CouponCodes";
    id: string;
    organization?: string | null;
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  cardsPacksIds?: Array<string | null> | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items?: Array<{
    __typename: "User";
    id: string;
    username: string;
    email: string;
    phone?: string | null;
    status?: string | null;
    subscription?: {
      __typename: "MonthlySubscription";
      id: string;
      startDate?: string | null;
      paymentProvider?: string | null;
      providerTransactionId?: string | null;
      subscriptionPlan?: {
        __typename: "SubscriptionPlan";
        id: string;
        name?: string | null;
        description?: string | null;
        providerPlanId: string;
        numberOfUsers?: number | null;
        numberOfCardPacks?: number | null;
        billingCycleInMonths?: number | null;
        fullPrice?: number | null;
        discount?: number | null;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null;
    numberOfPacksSubstitutions?: number | null;
    lastPackSubstitutionDate?: string | null;
    numberOfPlansSubstitutions?: number | null;
    lastPlanSubstitutionDate?: string | null;
    firstProgramRegistrationDate?: string | null;
    groupId?: string | null;
    numberOfUsedPacks?: number | null;
    groupRole?: string | null;
    cancellationDate?: string | null;
    couponCodes?: Array<{
      __typename: "CouponCodes";
      id: string;
      organization?: string | null;
      couponCode?: string | null;
      discount?: number | null;
      trialPeriodInDays?: number | null;
      allowedCardsPacks?: Array<string | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cardsPacksIds?: Array<string | null> | null;
    providerTransactionId?: string | null;
    fullName?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetMessageQueueQuery = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListMessageQueuesQuery = {
  __typename: "ModelMessageQueueConnection";
  items: Array<{
    __typename: "MessageQueue";
    id: string;
    email?: string | null;
    emailDeliveryTime?: string | null;
    phone?: string | null;
    smsDeliveryTime?: string | null;
    emailTemplateId?: number | null;
    name?: string | null;
    params?: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  nextToken?: string | null;
};

export type GetGroupQuery = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListGroupsQuery = {
  __typename: "ModelGroupConnection";
  items?: Array<{
    __typename: "Group";
    id: string;
    groupUsers?: Array<{
      __typename: "GroupUserRole";
      email?: string | null;
      role?: string | null;
    } | null> | null;
    paymentProgram?: {
      __typename: "SubscriptionPlan";
      id: string;
      name?: string | null;
      description?: string | null;
      providerPlanId: string;
      numberOfUsers?: number | null;
      numberOfCardPacks?: number | null;
      billingCycleInMonths?: number | null;
      fullPrice?: number | null;
      discount?: number | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetCouponCodesQuery = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCouponCodessQuery = {
  __typename: "ModelCouponCodesConnection";
  items?: Array<{
    __typename: "CouponCodes";
    id: string;
    organization?: string | null;
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetSubscriptionPlanQuery = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListSubscriptionPlansQuery = {
  __typename: "ModelSubscriptionPlanConnection";
  items?: Array<{
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetNewsQuery = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListNewssQuery = {
  __typename: "ModelNewsConnection";
  items?: Array<{
    __typename: "News";
    id: string;
    message?: string | null;
    order?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetCardsPackQuery = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCardsPacksQuery = {
  __typename: "ModelCardsPackConnection";
  items?: Array<{
    __typename: "CardsPack";
    id: string;
    imgUrl: string;
    description?: string | null;
    tags?: Array<string | null> | null;
    categories?: Array<string | null> | null;
    cards?: Array<string | null> | null;
    cardsPreview?: Array<string | null> | null;
    groupsIds?: Array<string | null> | null;
    guideBook?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
    name?: string | null;
    freeUntilDate?: string | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateMessageQueueSubscription = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateMessageQueueSubscription = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteMessageQueueSubscription = {
  __typename: "MessageQueue";
  id: string;
  email?: string | null;
  emailDeliveryTime?: string | null;
  phone?: string | null;
  smsDeliveryTime?: string | null;
  emailTemplateId?: number | null;
  name?: string | null;
  params?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteGroupSubscription = {
  __typename: "Group";
  id: string;
  groupUsers?: Array<{
    __typename: "GroupUserRole";
    email?: string | null;
    role?: string | null;
  } | null> | null;
  paymentProgram?: {
    __typename: "SubscriptionPlan";
    id: string;
    name?: string | null;
    description?: string | null;
    providerPlanId: string;
    numberOfUsers?: number | null;
    numberOfCardPacks?: number | null;
    billingCycleInMonths?: number | null;
    fullPrice?: number | null;
    discount?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  organization?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteSubscriptionPlanSubscription = {
  __typename: "SubscriptionPlan";
  id: string;
  name?: string | null;
  description?: string | null;
  providerPlanId: string;
  numberOfUsers?: number | null;
  numberOfCardPacks?: number | null;
  billingCycleInMonths?: number | null;
  fullPrice?: number | null;
  discount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateNewsSubscription = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateNewsSubscription = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteNewsSubscription = {
  __typename: "News";
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCardsPackSubscription = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<string | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<{
    __typename: "GuideBookElement";
    name?: string | null;
    subElements?: Array<{
      __typename: "GuideBookElement";
      name?: string | null;
      subElements?: Array<{
        __typename: "GuideBookElement";
        name?: string | null;
        subElements?: Array<{
          __typename: "GuideBookElement";
          name?: string | null;
          subElements?: Array<{
            __typename: "GuideBookElement";
            name?: string | null;
            subElements?: Array<{
              __typename: "GuideBookElement";
              name?: string | null;
            } | null> | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
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
              billingCycleInMonths
              fullPrice
              discount
              createdAt
              updatedAt
            }
          }
          numberOfPacksSubstitutions
          lastPackSubstitutionDate
          numberOfPlansSubstitutions
          lastPlanSubstitutionDate
          firstProgramRegistrationDate
          groupId
          numberOfUsedPacks
          groupRole
          cancellationDate
          couponCodes {
            __typename
            id
            organization
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            createdAt
            updatedAt
          }
          cardsPacksIds
          providerTransactionId
          fullName
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
  async AddCouponCode(input: couponCodeInput): Promise<boolean | null> {
    const statement = `mutation AddCouponCode($input: couponCodeInput!) {
        AddCouponCode(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.AddCouponCode;
  }
  async UpdatePaymentProgram(
    input: updatePaymentProgramInput
  ): Promise<boolean | null> {
    const statement = `mutation UpdatePaymentProgram($input: updatePaymentProgramInput!) {
        UpdatePaymentProgram(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.updatePaymentProgram;
  }
  async CreateContactUsModel(
    input: CreateContactUsModelInput,
    condition?: ModelContactUsModelConditionInput
  ): Promise<CreateContactUsModelMutation> {
    const statement = `mutation CreateContactUsModel($input: CreateContactUsModelInput!, $condition: ModelContactUsModelConditionInput) {
        createContactUsModel(input: $input, condition: $condition) {
          __typename
          id
          name
          content
          email
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
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
    )) as any;
    return <CreateContactUsModelMutation>response.data.createContactUsModel;
  }
  async UpdateContactUsModel(
    input: UpdateContactUsModelInput,
    condition?: ModelContactUsModelConditionInput
  ): Promise<UpdateContactUsModelMutation> {
    const statement = `mutation UpdateContactUsModel($input: UpdateContactUsModelInput!, $condition: ModelContactUsModelConditionInput) {
        updateContactUsModel(input: $input, condition: $condition) {
          __typename
          id
          name
          content
          email
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
    return <UpdateContactUsModelMutation>response.data.updateContactUsModel;
  }
  async DeleteContactUsModel(
    input: DeleteContactUsModelInput,
    condition?: ModelContactUsModelConditionInput
  ): Promise<DeleteContactUsModelMutation> {
    const statement = `mutation DeleteContactUsModel($input: DeleteContactUsModelInput!, $condition: ModelContactUsModelConditionInput) {
        deleteContactUsModel(input: $input, condition: $condition) {
          __typename
          id
          name
          content
          email
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
    return <DeleteContactUsModelMutation>response.data.deleteContactUsModel;
  }
  async CreateMessageQueue(
    input: CreateMessageQueueInput,
    condition?: ModelMessageQueueConditionInput
  ): Promise<CreateMessageQueueMutation> {
    const statement = `mutation CreateMessageQueue($input: CreateMessageQueueInput!, $condition: ModelMessageQueueConditionInput) {
        createMessageQueue(input: $input, condition: $condition) {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
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
    return <CreateMessageQueueMutation>response.data.createMessageQueue;
  }
  async UpdateMessageQueue(
    input: UpdateMessageQueueInput,
    condition?: ModelMessageQueueConditionInput
  ): Promise<UpdateMessageQueueMutation> {
    const statement = `mutation UpdateMessageQueue($input: UpdateMessageQueueInput!, $condition: ModelMessageQueueConditionInput) {
        updateMessageQueue(input: $input, condition: $condition) {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
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
    return <UpdateMessageQueueMutation>response.data.updateMessageQueue;
  }
  async DeleteMessageQueue(
    input: DeleteMessageQueueInput,
    condition?: ModelMessageQueueConditionInput
  ): Promise<DeleteMessageQueueMutation> {
    const statement = `mutation DeleteMessageQueue($input: DeleteMessageQueueInput!, $condition: ModelMessageQueueConditionInput) {
        deleteMessageQueue(input: $input, condition: $condition) {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
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
    return <DeleteMessageQueueMutation>response.data.deleteMessageQueue;
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
            billingCycleInMonths
            fullPrice
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
            billingCycleInMonths
            fullPrice
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
            billingCycleInMonths
            fullPrice
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
          billingCycleInMonths
          fullPrice
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
          billingCycleInMonths
          fullPrice
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
          billingCycleInMonths
          fullPrice
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
  async CreateNews(
    input: CreateNewsInput,
    condition?: ModelNewsConditionInput
  ): Promise<CreateNewsMutation> {
    const statement = `mutation CreateNews($input: CreateNewsInput!, $condition: ModelNewsConditionInput) {
        createNews(input: $input, condition: $condition) {
          __typename
          id
          message
          order
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
    return <CreateNewsMutation>response.data.createNews;
  }
  async UpdateNews(
    input: UpdateNewsInput,
    condition?: ModelNewsConditionInput
  ): Promise<UpdateNewsMutation> {
    const statement = `mutation UpdateNews($input: UpdateNewsInput!, $condition: ModelNewsConditionInput) {
        updateNews(input: $input, condition: $condition) {
          __typename
          id
          message
          order
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
    return <UpdateNewsMutation>response.data.updateNews;
  }
  async DeleteNews(
    input: DeleteNewsInput,
    condition?: ModelNewsConditionInput
  ): Promise<DeleteNewsMutation> {
    const statement = `mutation DeleteNews($input: DeleteNewsInput!, $condition: ModelNewsConditionInput) {
        deleteNews(input: $input, condition: $condition) {
          __typename
          id
          message
          order
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
    return <DeleteNewsMutation>response.data.deleteNews;
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
  async CreateCouponCodes(
    input: CreateCouponCodesInput,
    condition?: ModelCouponCodesConditionInput
  ): Promise<CreateCouponCodesMutation> {
    const statement = `mutation CreateCouponCodes($input: CreateCouponCodesInput!, $condition: ModelCouponCodesConditionInput) {
        createCouponCodes(input: $input, condition: $condition) {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
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
    return <CreateCouponCodesMutation>response.data.createCouponCodes;
  }
  async UpdateCouponCodes(
    input: UpdateCouponCodesInput,
    condition?: ModelCouponCodesConditionInput
  ): Promise<UpdateCouponCodesMutation> {
    const statement = `mutation UpdateCouponCodes($input: UpdateCouponCodesInput!, $condition: ModelCouponCodesConditionInput) {
        updateCouponCodes(input: $input, condition: $condition) {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
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
    return <UpdateCouponCodesMutation>response.data.updateCouponCodes;
  }
  async DeleteCouponCodes(
    input: DeleteCouponCodesInput,
    condition?: ModelCouponCodesConditionInput
  ): Promise<DeleteCouponCodesMutation> {
    const statement = `mutation DeleteCouponCodes($input: DeleteCouponCodesInput!, $condition: ModelCouponCodesConditionInput) {
        deleteCouponCodes(input: $input, condition: $condition) {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
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
    return <DeleteCouponCodesMutation>response.data.deleteCouponCodes;
  }
  async GetContactUsModel(id: string): Promise<GetContactUsModelQuery> {
    const statement = `query GetContactUsModel($id: ID!) {
        getContactUsModel(id: $id) {
          __typename
          id
          name
          content
          email
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
    return <GetContactUsModelQuery>response.data.getContactUsModel;
  }
  async ListContactUsModels(
    filter?: ModelContactUsModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListContactUsModelsQuery> {
    const statement = `query ListContactUsModels($filter: ModelContactUsModelFilterInput, $limit: Int, $nextToken: String) {
        listContactUsModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            content
            email
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
    return <ListContactUsModelsQuery>response.data.listContactUsModels;
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
              billingCycleInMonths
              fullPrice
              discount
              createdAt
              updatedAt
            }
          }
          numberOfPacksSubstitutions
          lastPackSubstitutionDate
          numberOfPlansSubstitutions
          lastPlanSubstitutionDate
          firstProgramRegistrationDate
          groupId
          numberOfUsedPacks
          groupRole
          cancellationDate
          couponCodes {
            __typename
            id
            organization
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            createdAt
            updatedAt
          }
          cardsPacksIds
          providerTransactionId
          fullName
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
                billingCycleInMonths
                fullPrice
                discount
                createdAt
                updatedAt
              }
            }
            numberOfPacksSubstitutions
            lastPackSubstitutionDate
            numberOfPlansSubstitutions
            lastPlanSubstitutionDate
            firstProgramRegistrationDate
            groupId
            numberOfUsedPacks
            groupRole
            cancellationDate
            couponCodes {
              __typename
              id
              organization
              couponCode
              discount
              trialPeriodInDays
              allowedCardsPacks
              createdAt
              updatedAt
            }
            cardsPacksIds
            providerTransactionId
            fullName
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
  async GetMessageQueue(id: string): Promise<GetMessageQueueQuery> {
    const statement = `query GetMessageQueue($id: ID!) {
        getMessageQueue(id: $id) {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
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
    return <GetMessageQueueQuery>response.data.getMessageQueue;
  }
  async ListMessageQueues(
    filter?: ModelMessageQueueFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMessageQueuesQuery> {
    const statement = `query ListMessageQueues($filter: ModelMessageQueueFilterInput, $limit: Int, $nextToken: String) {
        listMessageQueues(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            emailDeliveryTime
            phone
            smsDeliveryTime
            emailTemplateId
            name
            params
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
    return <ListMessageQueuesQuery>response.data.listMessageQueues;
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
            billingCycleInMonths
            fullPrice
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
              billingCycleInMonths
              fullPrice
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
  async GetCouponCodes(id: string): Promise<GetCouponCodesQuery> {
    const statement = `query GetCouponCodes($id: ID!) {
        getCouponCodes(id: $id) {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
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
    return <GetCouponCodesQuery>response.data.getCouponCodes;
  }
  async ListCouponCodess(
    filter?: ModelCouponCodesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCouponCodessQuery> {
    const statement = `query ListCouponCodess($filter: ModelCouponCodesFilterInput, $limit: Int, $nextToken: String) {
        listCouponCodess(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            organization
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
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
    return <ListCouponCodessQuery>response.data.listCouponCodess;
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
          billingCycleInMonths
          fullPrice
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
            billingCycleInMonths
            fullPrice
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
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
    )) as any;
    return <ListSubscriptionPlansQuery>response.data.listSubscriptionPlans;
  }
  async GetNews(id: string): Promise<GetNewsQuery> {
    const statement = `query GetNews($id: ID!) {
        getNews(id: $id) {
          __typename
          id
          message
          order
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
    return <GetNewsQuery>response.data.getNews;
  }
  async ListNewss(
    filter?: ModelNewsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListNewssQuery> {
    const statement = `query ListNewss($filter: ModelNewsFilterInput, $limit: Int, $nextToken: String) {
        listNewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            message
            order
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
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
    )) as any;
    return <ListNewssQuery>response.data.listNewss;
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
  async ListCardsPacksForPreview(
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
            cards
            tags
            categories
            cardsPreview
            name
            about {
              __typename
              text
              imgUrl
              link
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
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
    )) as any;
    return <ListCardsPacksQuery>response.data.listCardsPacks;
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
            groupsIds
            guideBook {
               __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
            name
            freeUntilDate
            about {
              __typename
              text
              imgUrl
              link
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
  OnCreateContactUsModelListener: Observable<
    SubscriptionResponse<OnCreateContactUsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateContactUsModel {
        onCreateContactUsModel {
          __typename
          id
          name
          content
          email
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateContactUsModelSubscription>>;

  OnUpdateContactUsModelListener: Observable<
    SubscriptionResponse<OnUpdateContactUsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateContactUsModel {
        onUpdateContactUsModel {
          __typename
          id
          name
          content
          email
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateContactUsModelSubscription>>;

  OnDeleteContactUsModelListener: Observable<
    SubscriptionResponse<OnDeleteContactUsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteContactUsModel {
        onDeleteContactUsModel {
          __typename
          id
          name
          content
          email
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteContactUsModelSubscription>>;

OnCreateMessageQueueListener: Observable<
    SubscriptionResponse<OnCreateMessageQueueSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateMessageQueue {
        onCreateMessageQueue {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateMessageQueueSubscription>>;

  OnUpdateMessageQueueListener: Observable<
    SubscriptionResponse<OnUpdateMessageQueueSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMessageQueue {
        onUpdateMessageQueue {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateMessageQueueSubscription>>;

  OnDeleteMessageQueueListener: Observable<
    SubscriptionResponse<OnDeleteMessageQueueSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMessageQueue {
        onDeleteMessageQueue {
          __typename
          id
          email
          emailDeliveryTime
          phone
          smsDeliveryTime
          emailTemplateId
          name
          params
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteMessageQueueSubscription>>;

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
            billingCycleInMonths
            fullPrice
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
            billingCycleInMonths
            fullPrice
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
            billingCycleInMonths
            fullPrice
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

  OnCreateCouponCodesListener: Observable<
    SubscriptionResponse<OnCreateCouponCodesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCouponCodes {
        onCreateCouponCodes {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateCouponCodesSubscription>>;

  OnUpdateCouponCodesListener: Observable<
    SubscriptionResponse<OnUpdateCouponCodesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCouponCodes {
        onUpdateCouponCodes {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateCouponCodesSubscription>>;

  OnDeleteCouponCodesListener: Observable<
    SubscriptionResponse<OnDeleteCouponCodesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCouponCodes {
        onDeleteCouponCodes {
          __typename
          id
          organization
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCouponCodesSubscription>>;

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
          billingCycleInMonths
          fullPrice
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
          billingCycleInMonths
          fullPrice
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
          billingCycleInMonths
          fullPrice
          discount
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteSubscriptionPlanSubscription>>;

  OnCreateNewsListener: Observable<
    SubscriptionResponse<OnCreateNewsSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateNews {
        onCreateNews {
          __typename
          id
          message
          order
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateNewsSubscription>>;

  OnUpdateNewsListener: Observable<
    SubscriptionResponse<OnUpdateNewsSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateNews {
        onUpdateNews {
          __typename
          id
          message
          order
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateNewsSubscription>>;

  OnDeleteNewsListener: Observable<
    SubscriptionResponse<OnDeleteNewsSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteNews {
        onDeleteNews {
          __typename
          id
          message
          order
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteNewsSubscription>>;

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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
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
          groupsIds
          guideBook {
            __typename
            name
            subElements {
              __typename
              name
              subElements {
                __typename
                name
                subElements {
                  __typename
                  name
                  subElements {
                    __typename
                    name
                    subElements {
                      __typename
                      name
                    }
                  }
                }
              }
            }
          }
          name
          freeUntilDate
          about {
            __typename
            text
            imgUrl
            link
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCardsPackSubscription>>;
}
