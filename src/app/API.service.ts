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

export type __SubscriptionContainer = {
  onCreateCommonLink: OnCreateCommonLinkSubscription;
  onUpdateCommonLink: OnUpdateCommonLinkSubscription;
  onDeleteCommonLink: OnDeleteCommonLinkSubscription;
  onCreateAffiliate: OnCreateAffiliateSubscription;
  onUpdateAffiliate: OnUpdateAffiliateSubscription;
  onDeleteAffiliate: OnDeleteAffiliateSubscription;
  onCreateCouponCodes: OnCreateCouponCodesSubscription;
  onUpdateCouponCodes: OnUpdateCouponCodesSubscription;
  onDeleteCouponCodes: OnDeleteCouponCodesSubscription;
  onCreateOrganizations: OnCreateOrganizationsSubscription;
  onUpdateOrganizations: OnUpdateOrganizationsSubscription;
  onDeleteOrganizations: OnDeleteOrganizationsSubscription;
  onCreateOrganizationMembership: OnCreateOrganizationMembershipSubscription;
  onUpdateOrganizationMembership: OnUpdateOrganizationMembershipSubscription;
  onDeleteOrganizationMembership: OnDeleteOrganizationMembershipSubscription;
  onCreateGroup: OnCreateGroupSubscription;
  onUpdateGroup: OnUpdateGroupSubscription;
  onDeleteGroup: OnDeleteGroupSubscription;
  onCreateMessageQueue: OnCreateMessageQueueSubscription;
  onUpdateMessageQueue: OnUpdateMessageQueueSubscription;
  onDeleteMessageQueue: OnDeleteMessageQueueSubscription;
  onCreateInvoices: OnCreateInvoicesSubscription;
  onUpdateInvoices: OnUpdateInvoicesSubscription;
  onDeleteInvoices: OnDeleteInvoicesSubscription;
  onCreateSubscriptionPlan: OnCreateSubscriptionPlanSubscription;
  onUpdateSubscriptionPlan: OnUpdateSubscriptionPlanSubscription;
  onDeleteSubscriptionPlan: OnDeleteSubscriptionPlanSubscription;
  onCreateReceiptsId: OnCreateReceiptsIdSubscription;
  onUpdateReceiptsId: OnUpdateReceiptsIdSubscription;
  onDeleteReceiptsId: OnDeleteReceiptsIdSubscription;
  onCreateNews: OnCreateNewsSubscription;
  onUpdateNews: OnUpdateNewsSubscription;
  onDeleteNews: OnDeleteNewsSubscription;
  onCreateCardsPack: OnCreateCardsPackSubscription;
  onUpdateCardsPack: OnUpdateCardsPackSubscription;
  onDeleteCardsPack: OnDeleteCardsPackSubscription;
  onCreateContactUsModel: OnCreateContactUsModelSubscription;
  onUpdateContactUsModel: OnUpdateContactUsModelSubscription;
  onDeleteContactUsModel: OnDeleteContactUsModelSubscription;
};

export type CreateCommonLinkInput = {
  packId?: number | null;
};

export type CreateUserInput = {
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  fullName?: string | null;
  affiliateId?: string | null;
  userOrgMembershipId?: string | null;
  userMyAffiliateId?: string | null;
};

export type User = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  status?: string | null;
  subscription?: MonthlySubscription | null;
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
  orgMembership?: OrganizationMembership | null;
  endOfTrialDate?: string | null;
  createdAt: string;
  updatedAt: string;
  favouritePacks?: Array<number | null> | null;
  entries?: number | null;
  externalPacksSubscriptions?: Array<MonthlySubscription | null> | null;
  entryDates?: Array<string | null> | null;
  refId?: string | null;
  myAffiliate?: Affiliate | null;
  payments?: Array<Payment | null> | null;
  profession?: string | null;
  AithreadId?: string | null;
  AiConversations?: Array<AiConversation | null> | null;
};

export type MonthlySubscription = {
  __typename: "MonthlySubscription";
  id: string;
  startDate?: string | null;
  paymentProvider?: string | null;
  providerTransactionId?: string | null;
  subscriptionPlan?: SubscriptionPlan | null;
  includedCardPacksIds?: Array<CardsPack | null> | null;
  cancellationDate?: string | null;
  nextBillingDate?: string | null;
};

export type SubscriptionPlan = {
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
  orgMembership?: OrganizationMembership | null;
  subscriptionProviderPlanId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationMembership = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: About | null;
  createdAt: string;
  updatedAt: string;
};

export type About = {
  __typename: "About";
  text?: string | null;
  imgUrl?: string | null;
  link?: string | null;
};

export type CardsPack = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<Category | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElement | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: About | null;
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<SubscriptionPlan | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<UserUsage | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  __typename: "Category";
  categoryName?: string | null;
  categoryStepNumber?: number | null;
  cardsImages?: Array<Cards | null> | null;
};

export type Cards = {
  __typename: "Cards";
  backImgUrl?: string | null;
  frontImgUrl?: string | null;
};

export type GuideBookElement = {
  __typename: "GuideBookElement";
  name?: string | null;
  subElements?: Array<GuideBookElement | null> | null;
};

export type UserUsage = {
  __typename: "UserUsage";
  user?: string | null;
  entries?: number | null;
};

export type CouponCodes = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: OrganizationMembership | null;
  createdAt: string;
  updatedAt: string;
};

export type Affiliate = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<Withdraw | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type Withdraw = {
  __typename: "Withdraw";
  id: string;
  date?: string | null;
  amount?: number | null;
  currency?: string | null;
  paymentWay?: string | null;
  transactionId?: string | null;
};

export type Payment = {
  __typename: "Payment";
  id: string;
  date?: string | null;
  payedMonths?: number | null;
  amount?: number | null;
  currency?: string | null;
  paymentWay?: string | null;
  transactionId?: string | null;
};

export type AiConversation = {
  __typename: "AiConversation";
  question?: string | null;
  answer?: string | null;
  date?: string | null;
};

export type UpdateUserInput = {
  id: string;
  username: string;
  phone?: string | null;
  status?: string | null;
  numberOfPacksSubstitutions?: number | null;
  numberOfPlansSubstitutions?: number | null;
  groupId?: string | null;
  numberOfUsedPacks?: number | null;
  groupRole?: string | null;
  cancellationDate?: string | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  profession?: string | null;
  userOrgMembershipId?: string | null;
  userMyAffiliateId?: string | null;
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
  providerTransactionId?: string | null;
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
  packId?: number | null;
  paymentProgramId: string;
  providerTransactionId?: string | null;
  fullName?: string | null;
};

export type userInput = {
  username: string;
};

export type selectedCardPacksInput = {
  cardsPacksIds?: Array<string | null> | null;
};

export type cardPackIdInput = {
  cardsPackId?: number | null;
};

export type InvoicesInput = {
  id?: string | null;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  itemName?: string | null;
  pricePerItem?: number | null;
  numberOfItems?: number | null;
  invoiceType?: string | null;
};

export type AiInput = {
  question?: string | null;
};

export type AiAnswer = {
  __typename: "AiAnswer";
  generalAnswer?: string | null;
  recommendedPacks?: Array<RecommendedPack | null> | null;
};

export type RecommendedPack = {
  __typename: "RecommendedPack";
  packId?: number | null;
  reason?: string | null;
  guide?: string | null;
};

export type S3Item = {
  __typename: "S3Item";
  key: string;
  data: string;
};

export type ModelCommonLinkConditionInput = {
  experationDate?: ModelStringInput | null;
  createdBy?: ModelStringInput | null;
  and?: Array<ModelCommonLinkConditionInput | null> | null;
  or?: Array<ModelCommonLinkConditionInput | null> | null;
  not?: ModelCommonLinkConditionInput | null;
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

export type CommonLink = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCommonLinkInput = {
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
};

export type DeleteCommonLinkInput = {
  id: string;
};

export type CreateAffiliateInput = {
  id?: string | null;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<WithdrawInput | null> | null;
};

export type WithdrawInput = {
  id: string;
  date?: string | null;
  amount?: number | null;
  currency?: string | null;
  paymentWay?: string | null;
  transactionId?: string | null;
};

export type ModelAffiliateConditionInput = {
  affiliateUrl?: ModelStringInput | null;
  contactEmail?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  websiteURL?: ModelStringInput | null;
  paymentDetails?: ModelStringInput | null;
  commissionPercentage?: ModelFloatInput | null;
  dateJoined?: ModelStringInput | null;
  status?: ModelStringInput | null;
  balance?: ModelFloatInput | null;
  and?: Array<ModelAffiliateConditionInput | null> | null;
  or?: Array<ModelAffiliateConditionInput | null> | null;
  not?: ModelAffiliateConditionInput | null;
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

export type UpdateAffiliateInput = {
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<WithdrawInput | null> | null;
};

export type DeleteAffiliateInput = {
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
  subscriptionProviderPlanId?: string | null;
  subscriptionPlanOrgMembershipId?: string | null;
};

export type ModelSubscriptionPlanConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  providerPlanId?: ModelStringInput | null;
  numberOfUsers?: ModelIntInput | null;
  numberOfCardPacks?: ModelIntInput | null;
  billingCycleInMonths?: ModelIntInput | null;
  fullPrice?: ModelFloatInput | null;
  discount?: ModelFloatInput | null;
  subscriptionProviderPlanId?: ModelStringInput | null;
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
  subscriptionProviderPlanId?: string | null;
  subscriptionPlanOrgMembershipId?: string | null;
};

export type DeleteSubscriptionPlanInput = {
  id: string;
};

export type CreateCouponCodesInput = {
  id?: string | null;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  couponCodesOrganizationId?: string | null;
};

export type ModelCouponCodesConditionInput = {
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
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  couponCodesOrganizationId?: string | null;
};

export type DeleteCouponCodesInput = {
  id: string;
};

export type CreateOrganizationsInput = {
  id?: string | null;
  membersEmails?: Array<string | null> | null;
  verifyPersonByEmail?: boolean | null;
  organizationsMembershipId?: string | null;
};

export type ModelOrganizationsConditionInput = {
  membersEmails?: ModelStringInput | null;
  verifyPersonByEmail?: ModelBooleanInput | null;
  and?: Array<ModelOrganizationsConditionInput | null> | null;
  or?: Array<ModelOrganizationsConditionInput | null> | null;
  not?: ModelOrganizationsConditionInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Organizations = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: OrganizationMembership | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrganizationsInput = {
  id: string;
  membersEmails?: Array<string | null> | null;
  verifyPersonByEmail?: boolean | null;
  organizationsMembershipId?: string | null;
};

export type DeleteOrganizationsInput = {
  id: string;
};

export type CreateOrganizationMembershipInput = {
  id?: string | null;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: AboutInput | null;
};

export type AboutInput = {
  text?: string | null;
  imgUrl?: string | null;
  link?: string | null;
};

export type ModelOrganizationMembershipConditionInput = {
  name?: ModelStringInput | null;
  trialPeriodInDays?: ModelIntInput | null;
  numberOfallowedCardsPacks?: ModelIntInput | null;
  and?: Array<ModelOrganizationMembershipConditionInput | null> | null;
  or?: Array<ModelOrganizationMembershipConditionInput | null> | null;
  not?: ModelOrganizationMembershipConditionInput | null;
};

export type UpdateOrganizationMembershipInput = {
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: AboutInput | null;
};

export type DeleteOrganizationMembershipInput = {
  id: string;
};

export type DeleteReceiptsIdInput = {
  id: string;
};

export type ModelReceiptsIdConditionInput = {
  counter?: ModelIntInput | null;
  and?: Array<ModelReceiptsIdConditionInput | null> | null;
  or?: Array<ModelReceiptsIdConditionInput | null> | null;
  not?: ModelReceiptsIdConditionInput | null;
};

export type ReceiptsId = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
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
  id: string;
  groupUsers?: Array<GroupUserRole | null> | null;
  paymentProgram?: SubscriptionPlan | null;
  createdAt: string;
  updatedAt: string;
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
  id: string;
  message?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
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
  cards?: Array<CategoryInput | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElementInput | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: AboutInput | null;
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<UserUsageInput | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
};

export type CategoryInput = {
  categoryName?: string | null;
  categoryStepNumber?: number | null;
  cardsImages?: Array<CardsInput | null> | null;
};

export type CardsInput = {
  backImgUrl?: string | null;
  frontImgUrl?: string | null;
};

export type GuideBookElementInput = {
  name?: string | null;
  subElements?: Array<GuideBookElementInput | null> | null;
};

export type UserUsageInput = {
  user?: string | null;
  entries?: number | null;
};

export type ModelCardsPackConditionInput = {
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  name?: ModelStringInput | null;
  freeUntilDate?: ModelStringInput | null;
  isOwnedByOrg?: ModelBooleanInput | null;
  brief?: ModelStringInput | null;
  likesCounter?: ModelIntInput | null;
  visitorsCounter?: ModelIntInput | null;
  backImgUrl?: ModelStringInput | null;
  isExternalPack?: ModelBooleanInput | null;
  authorizedDomains?: ModelStringInput | null;
  topQuestions?: ModelStringInput | null;
  isFree?: ModelBooleanInput | null;
  language?: ModelStringInput | null;
  isActive?: ModelBooleanInput | null;
  guidebookUrl?: ModelStringInput | null;
  ownerName?: ModelStringInput | null;
  numberOfCards?: ModelIntInput | null;
  isHardCopyAvailable?: ModelBooleanInput | null;
  videoUrl?: ModelStringInput | null;
  isReadingGuidebookAMust?: ModelBooleanInput | null;
  and?: Array<ModelCardsPackConditionInput | null> | null;
  or?: Array<ModelCardsPackConditionInput | null> | null;
  not?: ModelCardsPackConditionInput | null;
};

export type UpdateCardsPackInput = {
  id: string;
  imgUrl?: string | null;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<CategoryInput | null> | null;
  cardsPreview?: Array<string | null> | null;
  groupsIds?: Array<string | null> | null;
  guideBook?: Array<GuideBookElementInput | null> | null;
  name?: string | null;
  freeUntilDate?: string | null;
  about?: AboutInput | null;
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<UserUsageInput | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
};

export type DeleteCardsPackInput = {
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

export type UpdateContactUsModelInput = {
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type ModelContactUsModelConditionInput = {
  name?: ModelStringInput | null;
  content?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelContactUsModelConditionInput | null> | null;
  or?: Array<ModelContactUsModelConditionInput | null> | null;
  not?: ModelContactUsModelConditionInput | null;
};

export type ContactUsModel = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteContactUsModelInput = {
  id: string;
};

export type CreateInvoicesInput = {
  id?: string | null;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<InvoiceItemsInput | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
};

export type InvoiceItemsInput = {
  itemName?: string | null;
  pricePerItem?: number | null;
  numberOfItems?: number | null;
};

export type ModelInvoicesConditionInput = {
  email?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  customerAddress?: ModelStringInput | null;
  date?: ModelStringInput | null;
  invoiceRunningId?: ModelIntInput | null;
  businessName?: ModelStringInput | null;
  businessPhoneNumber?: ModelStringInput | null;
  businessAddress?: ModelStringInput | null;
  businessWebsite?: ModelStringInput | null;
  invoiceType?: ModelStringInput | null;
  s3Url?: ModelStringInput | null;
  and?: Array<ModelInvoicesConditionInput | null> | null;
  or?: Array<ModelInvoicesConditionInput | null> | null;
  not?: ModelInvoicesConditionInput | null;
};

export type Invoices = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<InvoiceItems | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceItems = {
  __typename: "InvoiceItems";
  itemName?: string | null;
  pricePerItem?: number | null;
  numberOfItems?: number | null;
};

export type UpdateInvoicesInput = {
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<InvoiceItemsInput | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
};

export type DeleteInvoicesInput = {
  id: string;
};

export type CreateReceiptsIdInput = {
  id?: string | null;
  counter: number;
};

export type UpdateReceiptsIdInput = {
  id: string;
  counter?: number | null;
};

export type CreateContactUsModelInput = {
  id?: string | null;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type ModelCommonLinkFilterInput = {
  id?: ModelIDInput | null;
  experationDate?: ModelStringInput | null;
  createdBy?: ModelStringInput | null;
  and?: Array<ModelCommonLinkFilterInput | null> | null;
  or?: Array<ModelCommonLinkFilterInput | null> | null;
  not?: ModelCommonLinkFilterInput | null;
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

export type ModelCommonLinkConnection = {
  __typename: "ModelCommonLinkConnection";
  items: Array<CommonLink | null>;
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
  endOfTrialDate?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  favouritePacks?: ModelIntInput | null;
  entries?: ModelIntInput | null;
  entryDates?: ModelStringInput | null;
  refId?: ModelStringInput | null;
  profession?: ModelStringInput | null;
  AithreadId?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelAffiliateFilterInput = {
  id?: ModelIDInput | null;
  affiliateUrl?: ModelStringInput | null;
  contactEmail?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  websiteURL?: ModelStringInput | null;
  paymentDetails?: ModelStringInput | null;
  commissionPercentage?: ModelFloatInput | null;
  dateJoined?: ModelStringInput | null;
  status?: ModelStringInput | null;
  balance?: ModelFloatInput | null;
  and?: Array<ModelAffiliateFilterInput | null> | null;
  or?: Array<ModelAffiliateFilterInput | null> | null;
  not?: ModelAffiliateFilterInput | null;
};

export type ModelAffiliateConnection = {
  __typename: "ModelAffiliateConnection";
  items: Array<Affiliate | null>;
  nextToken?: string | null;
};

export type ModelCouponCodesFilterInput = {
  id?: ModelIDInput | null;
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
  items: Array<CouponCodes | null>;
  nextToken?: string | null;
};

export type ModelOrganizationsFilterInput = {
  id?: ModelIDInput | null;
  membersEmails?: ModelStringInput | null;
  verifyPersonByEmail?: ModelBooleanInput | null;
  and?: Array<ModelOrganizationsFilterInput | null> | null;
  or?: Array<ModelOrganizationsFilterInput | null> | null;
  not?: ModelOrganizationsFilterInput | null;
};

export type ModelOrganizationsConnection = {
  __typename: "ModelOrganizationsConnection";
  items: Array<Organizations | null>;
  nextToken?: string | null;
};

export type ModelOrganizationMembershipFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  trialPeriodInDays?: ModelIntInput | null;
  numberOfallowedCardsPacks?: ModelIntInput | null;
  and?: Array<ModelOrganizationMembershipFilterInput | null> | null;
  or?: Array<ModelOrganizationMembershipFilterInput | null> | null;
  not?: ModelOrganizationMembershipFilterInput | null;
};

export type ModelOrganizationMembershipConnection = {
  __typename: "ModelOrganizationMembershipConnection";
  items: Array<OrganizationMembership | null>;
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
  items: Array<Group | null>;
  nextToken?: string | null;
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
  items: Array<MessageQueue | null>;
  nextToken?: string | null;
};

export type ModelInvoicesFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  customerAddress?: ModelStringInput | null;
  date?: ModelStringInput | null;
  invoiceRunningId?: ModelIntInput | null;
  businessName?: ModelStringInput | null;
  businessPhoneNumber?: ModelStringInput | null;
  businessAddress?: ModelStringInput | null;
  businessWebsite?: ModelStringInput | null;
  invoiceType?: ModelStringInput | null;
  s3Url?: ModelStringInput | null;
  and?: Array<ModelInvoicesFilterInput | null> | null;
  or?: Array<ModelInvoicesFilterInput | null> | null;
  not?: ModelInvoicesFilterInput | null;
};

export type ModelInvoicesConnection = {
  __typename: "ModelInvoicesConnection";
  items: Array<Invoices | null>;
  nextToken?: string | null;
};

export type ModelReceiptsIdFilterInput = {
  id?: ModelIDInput | null;
  counter?: ModelIntInput | null;
  and?: Array<ModelReceiptsIdFilterInput | null> | null;
  or?: Array<ModelReceiptsIdFilterInput | null> | null;
  not?: ModelReceiptsIdFilterInput | null;
};

export type ModelReceiptsIdConnection = {
  __typename: "ModelReceiptsIdConnection";
  items: Array<ReceiptsId | null>;
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
  items: Array<News | null>;
  nextToken?: string | null;
};

export type ModelCardsPackFilterInput = {
  id?: ModelIDInput | null;
  imgUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  tags?: ModelStringInput | null;
  categories?: ModelStringInput | null;
  cardsPreview?: ModelStringInput | null;
  groupsIds?: ModelStringInput | null;
  name?: ModelStringInput | null;
  freeUntilDate?: ModelStringInput | null;
  isOwnedByOrg?: ModelBooleanInput | null;
  brief?: ModelStringInput | null;
  likesCounter?: ModelIntInput | null;
  visitorsCounter?: ModelIntInput | null;
  backImgUrl?: ModelStringInput | null;
  isExternalPack?: ModelBooleanInput | null;
  authorizedDomains?: ModelStringInput | null;
  topQuestions?: ModelStringInput | null;
  isFree?: ModelBooleanInput | null;
  language?: ModelStringInput | null;
  isActive?: ModelBooleanInput | null;
  guidebookUrl?: ModelStringInput | null;
  ownerName?: ModelStringInput | null;
  numberOfCards?: ModelIntInput | null;
  isHardCopyAvailable?: ModelBooleanInput | null;
  videoUrl?: ModelStringInput | null;
  isReadingGuidebookAMust?: ModelBooleanInput | null;
  and?: Array<ModelCardsPackFilterInput | null> | null;
  or?: Array<ModelCardsPackFilterInput | null> | null;
  not?: ModelCardsPackFilterInput | null;
};

export type ModelCardsPackConnection = {
  __typename: "ModelCardsPackConnection";
  items: Array<CardsPack | null>;
  nextToken?: string | null;
};

export type ModelContactUsModelFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  content?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelContactUsModelFilterInput | null> | null;
  or?: Array<ModelContactUsModelFilterInput | null> | null;
  not?: ModelContactUsModelFilterInput | null;
};

export type ModelContactUsModelConnection = {
  __typename: "ModelContactUsModelConnection";
  items: Array<ContactUsModel | null>;
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
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
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    organization?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  cardsPacksIds?: Array<string | null> | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  endOfTrialDate?: string | null;
  createdAt: string;
  updatedAt: string;
  favouritePacks?: Array<number | null> | null;
  entries?: number | null;
  externalPacksSubscriptions?: Array<{
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
  } | null> | null;
  entryDates?: Array<string | null> | null;
  refId?: string | null;
  myAffiliate?: {
    __typename: "Affiliate";
    id: string;
    affiliateUrl?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
    websiteURL?: string | null;
    paymentDetails?: string | null;
    commissionPercentage?: number | null;
    dateJoined?: string | null;
    status?: string | null;
    balance?: number | null;
    withdraws?: Array<{
      __typename: "Withdraw";
      id: string;
      date?: string | null;
      amount?: number | null;
      currency?: string | null;
      paymentWay?: string | null;
      transactionId?: string | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  payments?: Array<{
    __typename: "Payment";
    id: string;
    date?: string | null;
    payedMonths?: number | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  profession?: string | null;
  AithreadId?: string | null;
  AiConversations?: Array<{
    __typename: "AiConversation";
    question?: string | null;
    answer?: string | null;
    date?: string | null;
  } | null> | null;
};

export type AddCouponCodeMutation = {
  __typename: "About";
  text?: string | null;
  imgUrl?: string | null;
  link?: string | null;
};

export type GetSubscriptionPlansMutation = {
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetAffiliateDataMutation = {
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
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
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    organization?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  cardsPacksIds?: Array<string | null> | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  endOfTrialDate?: string | null;
  createdAt: string;
  updatedAt: string;
  favouritePacks?: Array<number | null> | null;
  entries?: number | null;
  externalPacksSubscriptions?: Array<{
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
  } | null> | null;
  entryDates?: Array<string | null> | null;
  refId?: string | null;
  myAffiliate?: {
    __typename: "Affiliate";
    id: string;
    affiliateUrl?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
    websiteURL?: string | null;
    paymentDetails?: string | null;
    commissionPercentage?: number | null;
    dateJoined?: string | null;
    status?: string | null;
    balance?: number | null;
    withdraws?: Array<{
      __typename: "Withdraw";
      id: string;
      date?: string | null;
      amount?: number | null;
      currency?: string | null;
      paymentWay?: string | null;
      transactionId?: string | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  payments?: Array<{
    __typename: "Payment";
    id: string;
    date?: string | null;
    payedMonths?: number | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  profession?: string | null;
  AithreadId?: string | null;
  AiConversations?: Array<{
    __typename: "AiConversation";
    question?: string | null;
    answer?: string | null;
    date?: string | null;
  } | null> | null;
};

export type AskTheAIMutation = {
  __typename: "AiAnswer";
  generalAnswer?: string | null;
  recommendedPacks?: Array<{
    __typename: "RecommendedPack";
    packId?: number | null;
    reason?: string | null;
    guide?: string | null;
  } | null> | null;
};

export type GetInvoicesFromS3Mutation = {
  __typename: "S3Item";
  key: string;
  data: string;
};

export type GetAllAffiliatesDataMutation = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommonLinkMutation = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCommonLinkMutation = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCommonLinkMutation = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateAffiliateMutation = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAffiliateMutation = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteAffiliateMutation = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCouponCodesMutation = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganizationsMutation = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrganizationsMutation = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteOrganizationsMutation = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganizationMembershipMutation = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrganizationMembershipMutation = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteOrganizationMembershipMutation = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteReceiptsIdMutation = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
  createdAt: string;
  updatedAt: string;
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

export type UpdateContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateInvoicesMutation = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateInvoicesMutation = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteInvoicesMutation = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateReceiptsIdMutation = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateReceiptsIdMutation = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateContactUsModelMutation = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetCommonLinkQuery = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCommonLinksQuery = {
  __typename: "ModelCommonLinkConnection";
  items: Array<{
    __typename: "CommonLink";
    id: string;
    experationDate?: string | null;
    createdBy?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
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
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    organization?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  cardsPacksIds?: Array<string | null> | null;
  providerTransactionId?: string | null;
  fullName?: string | null;
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  endOfTrialDate?: string | null;
  createdAt: string;
  updatedAt: string;
  favouritePacks?: Array<number | null> | null;
  entries?: number | null;
  externalPacksSubscriptions?: Array<{
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    includedCardPacksIds?: Array<{
      __typename: "CardsPack";
      id: string;
      imgUrl: string;
      description?: string | null;
      tags?: Array<string | null> | null;
      categories?: Array<string | null> | null;
      cards?: Array<{
        __typename: "Category";
        categoryName?: string | null;
        categoryStepNumber?: number | null;
        cardsImages?: Array<{
          __typename: "Cards";
          backImgUrl?: string | null;
          frontImgUrl?: string | null;
        } | null> | null;
      } | null> | null;
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
      isOwnedByOrg?: boolean | null;
      brief?: string | null;
      likesCounter?: number | null;
      visitorsCounter?: number | null;
      backImgUrl?: string | null;
      isExternalPack?: boolean | null;
      authorizedDomains?: Array<string | null> | null;
      subscriptionPlans?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      topQuestions?: Array<string | null> | null;
      usersUsage?: Array<{
        __typename: "UserUsage";
        user?: string | null;
        entries?: number | null;
      } | null> | null;
      isFree?: boolean | null;
      language?: string | null;
      isActive?: boolean | null;
      guidebookUrl?: string | null;
      ownerName?: string | null;
      numberOfCards?: number | null;
      isHardCopyAvailable?: boolean | null;
      videoUrl?: string | null;
      isReadingGuidebookAMust?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cancellationDate?: string | null;
    nextBillingDate?: string | null;
  } | null> | null;
  entryDates?: Array<string | null> | null;
  refId?: string | null;
  myAffiliate?: {
    __typename: "Affiliate";
    id: string;
    affiliateUrl?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
    websiteURL?: string | null;
    paymentDetails?: string | null;
    commissionPercentage?: number | null;
    dateJoined?: string | null;
    status?: string | null;
    balance?: number | null;
    withdraws?: Array<{
      __typename: "Withdraw";
      id: string;
      date?: string | null;
      amount?: number | null;
      currency?: string | null;
      paymentWay?: string | null;
      transactionId?: string | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  payments?: Array<{
    __typename: "Payment";
    id: string;
    date?: string | null;
    payedMonths?: number | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  profession?: string | null;
  AithreadId?: string | null;
  AiConversations?: Array<{
    __typename: "AiConversation";
    question?: string | null;
    answer?: string | null;
    date?: string | null;
  } | null> | null;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      includedCardPacksIds?: Array<{
        __typename: "CardsPack";
        id: string;
        imgUrl: string;
        description?: string | null;
        tags?: Array<string | null> | null;
        categories?: Array<string | null> | null;
        cards?: Array<{
          __typename: "Category";
          categoryName?: string | null;
          categoryStepNumber?: number | null;
          cardsImages?: Array<{
            __typename: "Cards";
            backImgUrl?: string | null;
            frontImgUrl?: string | null;
          } | null> | null;
        } | null> | null;
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
        isOwnedByOrg?: boolean | null;
        brief?: string | null;
        likesCounter?: number | null;
        visitorsCounter?: number | null;
        backImgUrl?: string | null;
        isExternalPack?: boolean | null;
        authorizedDomains?: Array<string | null> | null;
        subscriptionPlans?: Array<{
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
          orgMembership?: {
            __typename: "OrganizationMembership";
            id: string;
            name?: string | null;
            trialPeriodInDays?: number | null;
            numberOfallowedCardsPacks?: number | null;
            about?: {
              __typename: "About";
              text?: string | null;
              imgUrl?: string | null;
              link?: string | null;
            } | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          subscriptionProviderPlanId?: string | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        topQuestions?: Array<string | null> | null;
        usersUsage?: Array<{
          __typename: "UserUsage";
          user?: string | null;
          entries?: number | null;
        } | null> | null;
        isFree?: boolean | null;
        language?: string | null;
        isActive?: boolean | null;
        guidebookUrl?: string | null;
        ownerName?: string | null;
        numberOfCards?: number | null;
        isHardCopyAvailable?: boolean | null;
        videoUrl?: string | null;
        isReadingGuidebookAMust?: boolean | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      cancellationDate?: string | null;
      nextBillingDate?: string | null;
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
      couponCode?: string | null;
      discount?: number | null;
      trialPeriodInDays?: number | null;
      allowedCardsPacks?: Array<string | null> | null;
      organization?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    cardsPacksIds?: Array<string | null> | null;
    providerTransactionId?: string | null;
    fullName?: string | null;
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    endOfTrialDate?: string | null;
    createdAt: string;
    updatedAt: string;
    favouritePacks?: Array<number | null> | null;
    entries?: number | null;
    externalPacksSubscriptions?: Array<{
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
        orgMembership?: {
          __typename: "OrganizationMembership";
          id: string;
          name?: string | null;
          trialPeriodInDays?: number | null;
          numberOfallowedCardsPacks?: number | null;
          about?: {
            __typename: "About";
            text?: string | null;
            imgUrl?: string | null;
            link?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        subscriptionProviderPlanId?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      includedCardPacksIds?: Array<{
        __typename: "CardsPack";
        id: string;
        imgUrl: string;
        description?: string | null;
        tags?: Array<string | null> | null;
        categories?: Array<string | null> | null;
        cards?: Array<{
          __typename: "Category";
          categoryName?: string | null;
          categoryStepNumber?: number | null;
          cardsImages?: Array<{
            __typename: "Cards";
            backImgUrl?: string | null;
            frontImgUrl?: string | null;
          } | null> | null;
        } | null> | null;
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
        isOwnedByOrg?: boolean | null;
        brief?: string | null;
        likesCounter?: number | null;
        visitorsCounter?: number | null;
        backImgUrl?: string | null;
        isExternalPack?: boolean | null;
        authorizedDomains?: Array<string | null> | null;
        subscriptionPlans?: Array<{
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
          orgMembership?: {
            __typename: "OrganizationMembership";
            id: string;
            name?: string | null;
            trialPeriodInDays?: number | null;
            numberOfallowedCardsPacks?: number | null;
            about?: {
              __typename: "About";
              text?: string | null;
              imgUrl?: string | null;
              link?: string | null;
            } | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          subscriptionProviderPlanId?: string | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        topQuestions?: Array<string | null> | null;
        usersUsage?: Array<{
          __typename: "UserUsage";
          user?: string | null;
          entries?: number | null;
        } | null> | null;
        isFree?: boolean | null;
        language?: string | null;
        isActive?: boolean | null;
        guidebookUrl?: string | null;
        ownerName?: string | null;
        numberOfCards?: number | null;
        isHardCopyAvailable?: boolean | null;
        videoUrl?: string | null;
        isReadingGuidebookAMust?: boolean | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      cancellationDate?: string | null;
      nextBillingDate?: string | null;
    } | null> | null;
    entryDates?: Array<string | null> | null;
    refId?: string | null;
    myAffiliate?: {
      __typename: "Affiliate";
      id: string;
      affiliateUrl?: string | null;
      contactEmail?: string | null;
      phoneNumber?: string | null;
      websiteURL?: string | null;
      paymentDetails?: string | null;
      commissionPercentage?: number | null;
      dateJoined?: string | null;
      status?: string | null;
      balance?: number | null;
      withdraws?: Array<{
        __typename: "Withdraw";
        id: string;
        date?: string | null;
        amount?: number | null;
        currency?: string | null;
        paymentWay?: string | null;
        transactionId?: string | null;
      } | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    payments?: Array<{
      __typename: "Payment";
      id: string;
      date?: string | null;
      payedMonths?: number | null;
      amount?: number | null;
      currency?: string | null;
      paymentWay?: string | null;
      transactionId?: string | null;
    } | null> | null;
    profession?: string | null;
    AithreadId?: string | null;
    AiConversations?: Array<{
      __typename: "AiConversation";
      question?: string | null;
      answer?: string | null;
      date?: string | null;
    } | null> | null;
  } | null>;
  nextToken?: string | null;
};

export type GetAffiliateQuery = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListAffiliatesQuery = {
  __typename: "ModelAffiliateConnection";
  items: Array<{
    __typename: "Affiliate";
    id: string;
    affiliateUrl?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
    websiteURL?: string | null;
    paymentDetails?: string | null;
    commissionPercentage?: number | null;
    dateJoined?: string | null;
    status?: string | null;
    balance?: number | null;
    withdraws?: Array<{
      __typename: "Withdraw";
      id: string;
      date?: string | null;
      amount?: number | null;
      currency?: string | null;
      paymentWay?: string | null;
      transactionId?: string | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCouponCodesQuery = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCouponCodessQuery = {
  __typename: "ModelCouponCodesConnection";
  items: Array<{
    __typename: "CouponCodes";
    id: string;
    couponCode?: string | null;
    discount?: number | null;
    trialPeriodInDays?: number | null;
    allowedCardsPacks?: Array<string | null> | null;
    organization?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetOrganizationsQuery = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type ListOrganizationssQuery = {
  __typename: "ModelOrganizationsConnection";
  items: Array<{
    __typename: "Organizations";
    id: string;
    membersEmails?: Array<string | null> | null;
    membership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    verifyPersonByEmail?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetOrganizationMembershipQuery = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListOrganizationMembershipsQuery = {
  __typename: "ModelOrganizationMembershipConnection";
  items: Array<{
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
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
  } | null>;
  nextToken?: string | null;
};

export type GetInvoicesQuery = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListInvoicessQuery = {
  __typename: "ModelInvoicesConnection";
  items: Array<{
    __typename: "Invoices";
    id: string;
    email?: string | null;
    fullName?: string | null;
    customerAddress?: string | null;
    date?: string | null;
    invoiceRunningId?: number | null;
    items?: Array<{
      __typename: "InvoiceItems";
      itemName?: string | null;
      pricePerItem?: number | null;
      numberOfItems?: number | null;
    } | null> | null;
    businessName?: string | null;
    businessPhoneNumber?: string | null;
    businessAddress?: string | null;
    businessWebsite?: string | null;
    invoiceType?: string | null;
    s3Url?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetReceiptsIdQuery = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
  createdAt: string;
  updatedAt: string;
};

export type ListReceiptsIdsQuery = {
  __typename: "ModelReceiptsIdConnection";
  items: Array<{
    __typename: "ReceiptsId";
    id: string;
    counter: number;
    createdAt: string;
    updatedAt: string;
  } | null>;
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
  items: Array<{
    __typename: "News";
    id: string;
    message?: string | null;
    order?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCardsPackQuery = {
  __typename: "CardsPack";
  id: string;
  imgUrl: string;
  description?: string | null;
  tags?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCardsPacksQuery = {
  __typename: "ModelCardsPackConnection";
  items: Array<{
    __typename: "CardsPack";
    id: string;
    imgUrl: string;
    description?: string | null;
    tags?: Array<string | null> | null;
    categories?: Array<string | null> | null;
    cards?: Array<{
      __typename: "Category";
      categoryName?: string | null;
      categoryStepNumber?: number | null;
      cardsImages?: Array<{
        __typename: "Cards";
        backImgUrl?: string | null;
        frontImgUrl?: string | null;
      } | null> | null;
    } | null> | null;
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
    isOwnedByOrg?: boolean | null;
    brief?: string | null;
    likesCounter?: number | null;
    visitorsCounter?: number | null;
    backImgUrl?: string | null;
    isExternalPack?: boolean | null;
    authorizedDomains?: Array<string | null> | null;
    subscriptionPlans?: Array<{
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
      orgMembership?: {
        __typename: "OrganizationMembership";
        id: string;
        name?: string | null;
        trialPeriodInDays?: number | null;
        numberOfallowedCardsPacks?: number | null;
        about?: {
          __typename: "About";
          text?: string | null;
          imgUrl?: string | null;
          link?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      subscriptionProviderPlanId?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    topQuestions?: Array<string | null> | null;
    usersUsage?: Array<{
      __typename: "UserUsage";
      user?: string | null;
      entries?: number | null;
    } | null> | null;
    isFree?: boolean | null;
    language?: string | null;
    isActive?: boolean | null;
    guidebookUrl?: string | null;
    ownerName?: string | null;
    numberOfCards?: number | null;
    isHardCopyAvailable?: boolean | null;
    videoUrl?: string | null;
    isReadingGuidebookAMust?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetContactUsModelQuery = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListContactUsModelsQuery = {
  __typename: "ModelContactUsModelConnection";
  items: Array<{
    __typename: "ContactUsModel";
    id: string;
    name?: string | null;
    content?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateCommonLinkSubscription = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCommonLinkSubscription = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCommonLinkSubscription = {
  __typename: "CommonLink";
  id: string;
  experationDate?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateAffiliateSubscription = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateAffiliateSubscription = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteAffiliateSubscription = {
  __typename: "Affiliate";
  id: string;
  affiliateUrl?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  websiteURL?: string | null;
  paymentDetails?: string | null;
  commissionPercentage?: number | null;
  dateJoined?: string | null;
  status?: string | null;
  balance?: number | null;
  withdraws?: Array<{
    __typename: "Withdraw";
    id: string;
    date?: string | null;
    amount?: number | null;
    currency?: string | null;
    paymentWay?: string | null;
    transactionId?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCouponCodesSubscription = {
  __typename: "CouponCodes";
  id: string;
  couponCode?: string | null;
  discount?: number | null;
  trialPeriodInDays?: number | null;
  allowedCardsPacks?: Array<string | null> | null;
  organization?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateOrganizationsSubscription = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateOrganizationsSubscription = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteOrganizationsSubscription = {
  __typename: "Organizations";
  id: string;
  membersEmails?: Array<string | null> | null;
  membership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  verifyPersonByEmail?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateOrganizationMembershipSubscription = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateOrganizationMembershipSubscription = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteOrganizationMembershipSubscription = {
  __typename: "OrganizationMembership";
  id: string;
  name?: string | null;
  trialPeriodInDays?: number | null;
  numberOfallowedCardsPacks?: number | null;
  about?: {
    __typename: "About";
    text?: string | null;
    imgUrl?: string | null;
    link?: string | null;
  } | null;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
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

export type OnCreateInvoicesSubscription = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateInvoicesSubscription = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteInvoicesSubscription = {
  __typename: "Invoices";
  id: string;
  email?: string | null;
  fullName?: string | null;
  customerAddress?: string | null;
  date?: string | null;
  invoiceRunningId?: number | null;
  items?: Array<{
    __typename: "InvoiceItems";
    itemName?: string | null;
    pricePerItem?: number | null;
    numberOfItems?: number | null;
  } | null> | null;
  businessName?: string | null;
  businessPhoneNumber?: string | null;
  businessAddress?: string | null;
  businessWebsite?: string | null;
  invoiceType?: string | null;
  s3Url?: string | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
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
  orgMembership?: {
    __typename: "OrganizationMembership";
    id: string;
    name?: string | null;
    trialPeriodInDays?: number | null;
    numberOfallowedCardsPacks?: number | null;
    about?: {
      __typename: "About";
      text?: string | null;
      imgUrl?: string | null;
      link?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  subscriptionProviderPlanId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateReceiptsIdSubscription = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateReceiptsIdSubscription = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteReceiptsIdSubscription = {
  __typename: "ReceiptsId";
  id: string;
  counter: number;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
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
  cards?: Array<{
    __typename: "Category";
    categoryName?: string | null;
    categoryStepNumber?: number | null;
    cardsImages?: Array<{
      __typename: "Cards";
      backImgUrl?: string | null;
      frontImgUrl?: string | null;
    } | null> | null;
  } | null> | null;
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
              subElements?: Array<{
                __typename: "GuideBookElement";
                name?: string | null;
              } | null> | null;
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
  isOwnedByOrg?: boolean | null;
  brief?: string | null;
  likesCounter?: number | null;
  visitorsCounter?: number | null;
  backImgUrl?: string | null;
  isExternalPack?: boolean | null;
  authorizedDomains?: Array<string | null> | null;
  subscriptionPlans?: Array<{
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
    orgMembership?: {
      __typename: "OrganizationMembership";
      id: string;
      name?: string | null;
      trialPeriodInDays?: number | null;
      numberOfallowedCardsPacks?: number | null;
      about?: {
        __typename: "About";
        text?: string | null;
        imgUrl?: string | null;
        link?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    subscriptionProviderPlanId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  topQuestions?: Array<string | null> | null;
  usersUsage?: Array<{
    __typename: "UserUsage";
    user?: string | null;
    entries?: number | null;
  } | null> | null;
  isFree?: boolean | null;
  language?: string | null;
  isActive?: boolean | null;
  guidebookUrl?: string | null;
  ownerName?: string | null;
  numberOfCards?: number | null;
  isHardCopyAvailable?: boolean | null;
  videoUrl?: string | null;
  isReadingGuidebookAMust?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteContactUsModelSubscription = {
  __typename: "ContactUsModel";
  id: string;
  name?: string | null;
  content?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async MakeCommonLink(input: CreateCommonLinkInput): Promise<string | null> {
    const statement = `mutation MakeCommonLink($input: CreateCommonLinkInput!) {
        makeCommonLink(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.makeCommonLink;
  }
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
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
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            organization {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          cardsPacksIds
          providerTransactionId
          fullName
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          endOfTrialDate
          createdAt
          updatedAt
          favouritePacks
          entries
          externalPacksSubscriptions {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
          }
          entryDates
          refId
          myAffiliate {
            __typename
            id
            affiliateUrl
            contactEmail
            phoneNumber
            websiteURL
            paymentDetails
            commissionPercentage
            dateJoined
            status
            balance
            withdraws {
              __typename
              id
              date
              amount
              currency
              paymentWay
              transactionId
            }
            createdAt
            updatedAt
          }
          payments {
            __typename
            id
            date
            payedMonths
            amount
            currency
            paymentWay
            transactionId
          }
          profession
          AithreadId
          AiConversations {
            __typename
            question
            answer
            date
          }
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
  async UpdateUser(input: UpdateUserInput): Promise<boolean | null> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.updateUser;
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
  async AddCouponCode(input: couponCodeInput): Promise<AddCouponCodeMutation> {
    const statement = `mutation AddCouponCode($input: couponCodeInput!) {
        AddCouponCode(input: $input) {
          __typename
          text
          imgUrl
          link
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddCouponCodeMutation>response.data.AddCouponCode;
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
    return <boolean | null>response.data.UpdatePaymentProgram;
  }
async GetSubscriptionPlansForOrgs(
    input: userInput
  ): Promise<Array<GetSubscriptionPlansMutation>> {
    const statement = `mutation GetSubscriptionPlans($input: userInput!) {
        GetSubscriptionPlans(input: $input) {
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
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
    return <Array<GetSubscriptionPlansMutation>>(
      response.data.GetSubscriptionPlans
    );
  }
  async GetSubscriptionPlans(
    input: userInput
  ): Promise<Array<GetSubscriptionPlansMutation>> {
    const statement = `mutation GetSubscriptionPlans($input: userInput!) {
        GetSubscriptionPlans(input: $input) {
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
    )) as any;
    return <Array<GetSubscriptionPlansMutation>>(
      response.data.GetSubscriptionPlans
    );
  }
  async UpdateSelectedCardPacks(
    input: selectedCardPacksInput
  ): Promise<boolean | null> {
    const statement = `mutation UpdateSelectedCardPacks($input: selectedCardPacksInput!) {
        UpdateSelectedCardPacks(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.UpdateSelectedCardPacks;
  }
  async LikeClicked(input: cardPackIdInput): Promise<boolean | null> {
    const statement = `mutation LikeClicked($input: cardPackIdInput!) {
        LikeClicked(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.LikeClicked;
  }
  async IncrementPackEntries(input: cardPackIdInput): Promise<boolean | null> {
    const statement = `mutation IncrementPackEntries($input: cardPackIdInput!) {
        IncrementPackEntries(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.IncrementPackEntries;
  }
  async GetAffiliateData(
    input: userInput
  ): Promise<Array<GetAffiliateDataMutation>> {
    const statement = `mutation GetAffiliateData($input: userInput!) {
        getAffiliateData(input: $input) {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
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
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            organization {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          cardsPacksIds
          providerTransactionId
          fullName
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          endOfTrialDate
          createdAt
          updatedAt
          favouritePacks
          entries
          externalPacksSubscriptions {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
          }
          entryDates
          refId
          myAffiliate {
            __typename
            id
            affiliateUrl
            contactEmail
            phoneNumber
            websiteURL
            paymentDetails
            commissionPercentage
            dateJoined
            status
            balance
            withdraws {
              __typename
              id
              date
              amount
              currency
              paymentWay
              transactionId
            }
            createdAt
            updatedAt
          }
          payments {
            __typename
            id
            date
            payedMonths
            amount
            currency
            paymentWay
            transactionId
          }
          profession
          AithreadId
          AiConversations {
            __typename
            question
            answer
            date
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <Array<GetAffiliateDataMutation>>response.data.getAffiliateData;
  }
  async CreateInvoice(input: InvoicesInput): Promise<boolean | null> {
    const statement = `mutation CreateInvoice($input: InvoicesInput!) {
        createInvoice(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <boolean | null>response.data.createInvoice;
  }
  async AskTheAI(input: AiInput): Promise<AskTheAIMutation> {
    const statement = `mutation AskTheAI($input: AiInput!) {
        askTheAI(input: $input) {
          __typename
          generalAnswer
          recommendedPacks {
            __typename
            packId
            reason
            guide
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AskTheAIMutation>response.data.askTheAI;
  }
  async GetInvoicesFromS3(
    input: userInput
  ): Promise<Array<GetInvoicesFromS3Mutation>> {
    const statement = `mutation GetInvoicesFromS3($input: userInput!) {
        getInvoicesFromS3(input: $input) {
          __typename
          key
          data
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <Array<GetInvoicesFromS3Mutation>>response.data.getInvoicesFromS3;
  }
  async GetAllAffiliatesData(
    input: userInput
  ): Promise<Array<GetAllAffiliatesDataMutation>> {
    const statement = `mutation GetAllAffiliatesData($input: userInput!) {
        GetAllAffiliatesData(input: $input) {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
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
    return <Array<GetAllAffiliatesDataMutation>>(
      response.data.GetAllAffiliatesData
    );
  }
  async CreateCommonLink(
    input: CreateCommonLinkInput,
    condition?: ModelCommonLinkConditionInput
  ): Promise<CreateCommonLinkMutation> {
    const statement = `mutation CreateCommonLink($input: CreateCommonLinkInput!, $condition: ModelCommonLinkConditionInput) {
        createCommonLink(input: $input, condition: $condition) {
          __typename
          id
          experationDate
          createdBy
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
    return <CreateCommonLinkMutation>response.data.createCommonLink;
  }
  async UpdateCommonLink(
    input: UpdateCommonLinkInput,
    condition?: ModelCommonLinkConditionInput
  ): Promise<UpdateCommonLinkMutation> {
    const statement = `mutation UpdateCommonLink($input: UpdateCommonLinkInput!, $condition: ModelCommonLinkConditionInput) {
        updateCommonLink(input: $input, condition: $condition) {
          __typename
          id
          experationDate
          createdBy
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
    return <UpdateCommonLinkMutation>response.data.updateCommonLink;
  }
  async DeleteCommonLink(
    input: DeleteCommonLinkInput,
    condition?: ModelCommonLinkConditionInput
  ): Promise<DeleteCommonLinkMutation> {
    const statement = `mutation DeleteCommonLink($input: DeleteCommonLinkInput!, $condition: ModelCommonLinkConditionInput) {
        deleteCommonLink(input: $input, condition: $condition) {
          __typename
          id
          experationDate
          createdBy
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
    return <DeleteCommonLinkMutation>response.data.deleteCommonLink;
  }
  async CreateAffiliate(
    input: CreateAffiliateInput,
    condition?: ModelAffiliateConditionInput
  ): Promise<CreateAffiliateMutation> {
    const statement = `mutation CreateAffiliate($input: CreateAffiliateInput!, $condition: ModelAffiliateConditionInput) {
        createAffiliate(input: $input, condition: $condition) {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
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
    return <CreateAffiliateMutation>response.data.createAffiliate;
  }
  async UpdateAffiliate(
    input: UpdateAffiliateInput,
    condition?: ModelAffiliateConditionInput
  ): Promise<UpdateAffiliateMutation> {
    const statement = `mutation UpdateAffiliate($input: UpdateAffiliateInput!, $condition: ModelAffiliateConditionInput) {
        updateAffiliate(input: $input, condition: $condition) {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
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
    return <UpdateAffiliateMutation>response.data.updateAffiliate;
  }
  async DeleteAffiliate(
    input: DeleteAffiliateInput,
    condition?: ModelAffiliateConditionInput
  ): Promise<DeleteAffiliateMutation> {
    const statement = `mutation DeleteAffiliate($input: DeleteAffiliateInput!, $condition: ModelAffiliateConditionInput) {
        deleteAffiliate(input: $input, condition: $condition) {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
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
    return <DeleteAffiliateMutation>response.data.deleteAffiliate;
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
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
  async CreateCouponCodes(
    input: CreateCouponCodesInput,
    condition?: ModelCouponCodesConditionInput
  ): Promise<CreateCouponCodesMutation> {
    const statement = `mutation CreateCouponCodes($input: CreateCouponCodesInput!, $condition: ModelCouponCodesConditionInput) {
        createCouponCodes(input: $input, condition: $condition) {
          __typename
          id
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
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
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
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
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
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
    return <DeleteCouponCodesMutation>response.data.deleteCouponCodes;
  }
  async CreateOrganizations(
    input: CreateOrganizationsInput,
    condition?: ModelOrganizationsConditionInput
  ): Promise<CreateOrganizationsMutation> {
    const statement = `mutation CreateOrganizations($input: CreateOrganizationsInput!, $condition: ModelOrganizationsConditionInput) {
        createOrganizations(input: $input, condition: $condition) {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
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
    return <CreateOrganizationsMutation>response.data.createOrganizations;
  }
  async UpdateOrganizations(
    input: UpdateOrganizationsInput,
    condition?: ModelOrganizationsConditionInput
  ): Promise<UpdateOrganizationsMutation> {
    const statement = `mutation UpdateOrganizations($input: UpdateOrganizationsInput!, $condition: ModelOrganizationsConditionInput) {
        updateOrganizations(input: $input, condition: $condition) {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
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
    return <UpdateOrganizationsMutation>response.data.updateOrganizations;
  }
  async DeleteOrganizations(
    input: DeleteOrganizationsInput,
    condition?: ModelOrganizationsConditionInput
  ): Promise<DeleteOrganizationsMutation> {
    const statement = `mutation DeleteOrganizations($input: DeleteOrganizationsInput!, $condition: ModelOrganizationsConditionInput) {
        deleteOrganizations(input: $input, condition: $condition) {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
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
    return <DeleteOrganizationsMutation>response.data.deleteOrganizations;
  }
  async CreateOrganizationMembership(
    input: CreateOrganizationMembershipInput,
    condition?: ModelOrganizationMembershipConditionInput
  ): Promise<CreateOrganizationMembershipMutation> {
    const statement = `mutation CreateOrganizationMembership($input: CreateOrganizationMembershipInput!, $condition: ModelOrganizationMembershipConditionInput) {
        createOrganizationMembership(input: $input, condition: $condition) {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
    return <CreateOrganizationMembershipMutation>(
      response.data.createOrganizationMembership
    );
  }
  async UpdateOrganizationMembership(
    input: UpdateOrganizationMembershipInput,
    condition?: ModelOrganizationMembershipConditionInput
  ): Promise<UpdateOrganizationMembershipMutation> {
    const statement = `mutation UpdateOrganizationMembership($input: UpdateOrganizationMembershipInput!, $condition: ModelOrganizationMembershipConditionInput) {
        updateOrganizationMembership(input: $input, condition: $condition) {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
    return <UpdateOrganizationMembershipMutation>(
      response.data.updateOrganizationMembership
    );
  }
  async DeleteOrganizationMembership(
    input: DeleteOrganizationMembershipInput,
    condition?: ModelOrganizationMembershipConditionInput
  ): Promise<DeleteOrganizationMembershipMutation> {
    const statement = `mutation DeleteOrganizationMembership($input: DeleteOrganizationMembershipInput!, $condition: ModelOrganizationMembershipConditionInput) {
        deleteOrganizationMembership(input: $input, condition: $condition) {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
    return <DeleteOrganizationMembershipMutation>(
      response.data.deleteOrganizationMembership
    );
  }
  async DeleteReceiptsId(
    input: DeleteReceiptsIdInput,
    condition?: ModelReceiptsIdConditionInput
  ): Promise<DeleteReceiptsIdMutation> {
    const statement = `mutation DeleteReceiptsId($input: DeleteReceiptsIdInput!, $condition: ModelReceiptsIdConditionInput) {
        deleteReceiptsId(input: $input, condition: $condition) {
          __typename
          id
          counter
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
    return <DeleteReceiptsIdMutation>response.data.deleteReceiptsId;
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
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
          phone
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
          phone
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
  async CreateInvoices(
    input: CreateInvoicesInput,
    condition?: ModelInvoicesConditionInput
  ): Promise<CreateInvoicesMutation> {
    const statement = `mutation CreateInvoices($input: CreateInvoicesInput!, $condition: ModelInvoicesConditionInput) {
        createInvoices(input: $input, condition: $condition) {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
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
    return <CreateInvoicesMutation>response.data.createInvoices;
  }
  async UpdateInvoices(
    input: UpdateInvoicesInput,
    condition?: ModelInvoicesConditionInput
  ): Promise<UpdateInvoicesMutation> {
    const statement = `mutation UpdateInvoices($input: UpdateInvoicesInput!, $condition: ModelInvoicesConditionInput) {
        updateInvoices(input: $input, condition: $condition) {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
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
    return <UpdateInvoicesMutation>response.data.updateInvoices;
  }
  async DeleteInvoices(
    input: DeleteInvoicesInput,
    condition?: ModelInvoicesConditionInput
  ): Promise<DeleteInvoicesMutation> {
    const statement = `mutation DeleteInvoices($input: DeleteInvoicesInput!, $condition: ModelInvoicesConditionInput) {
        deleteInvoices(input: $input, condition: $condition) {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
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
    return <DeleteInvoicesMutation>response.data.deleteInvoices;
  }
  async CreateReceiptsId(
    input: CreateReceiptsIdInput,
    condition?: ModelReceiptsIdConditionInput
  ): Promise<CreateReceiptsIdMutation> {
    const statement = `mutation CreateReceiptsId($input: CreateReceiptsIdInput!, $condition: ModelReceiptsIdConditionInput) {
        createReceiptsId(input: $input, condition: $condition) {
          __typename
          id
          counter
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
    return <CreateReceiptsIdMutation>response.data.createReceiptsId;
  }
  async UpdateReceiptsId(
    input: UpdateReceiptsIdInput,
    condition?: ModelReceiptsIdConditionInput
  ): Promise<UpdateReceiptsIdMutation> {
    const statement = `mutation UpdateReceiptsId($input: UpdateReceiptsIdInput!, $condition: ModelReceiptsIdConditionInput) {
        updateReceiptsId(input: $input, condition: $condition) {
          __typename
          id
          counter
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
    return <UpdateReceiptsIdMutation>response.data.updateReceiptsId;
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
          phone
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
  async GetCommonLink(id: string): Promise<GetCommonLinkQuery> {
    const statement = `query GetCommonLink($id: ID!) {
        getCommonLink(id: $id) {
          __typename
          id
          experationDate
          createdBy
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
    return <GetCommonLinkQuery>response.data.getCommonLink;
  }
  async ListCommonLinks(
    filter?: ModelCommonLinkFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCommonLinksQuery> {
    const statement = `query ListCommonLinks($filter: ModelCommonLinkFilterInput, $limit: Int, $nextToken: String) {
        listCommonLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            experationDate
            createdBy
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
    return <ListCommonLinksQuery>response.data.listCommonLinks;
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
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
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            organization {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          cardsPacksIds
          providerTransactionId
          fullName
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          endOfTrialDate
          createdAt
          updatedAt
          favouritePacks
          entries
          externalPacksSubscriptions {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            includedCardPacksIds {
              __typename
              id
              imgUrl
              description
              tags
              categories
              cards {
                __typename
                categoryName
                categoryStepNumber
                cardsImages {
                  __typename
                  backImgUrl
                  frontImgUrl
                }
              }
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
              isOwnedByOrg
              brief
              likesCounter
              visitorsCounter
              backImgUrl
              isExternalPack
              authorizedDomains
              subscriptionPlans {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              topQuestions
              usersUsage {
                __typename
                user
                entries
              }
              isFree
              language
              isActive
              guidebookUrl
              ownerName
              numberOfCards
              isHardCopyAvailable
              videoUrl
              isReadingGuidebookAMust
              createdAt
              updatedAt
            }
            cancellationDate
            nextBillingDate
          }
          entryDates
          refId
          myAffiliate {
            __typename
            id
            affiliateUrl
            contactEmail
            phoneNumber
            websiteURL
            paymentDetails
            commissionPercentage
            dateJoined
            status
            balance
            withdraws {
              __typename
              id
              date
              amount
              currency
              paymentWay
              transactionId
            }
            createdAt
            updatedAt
          }
          payments {
            __typename
            id
            date
            payedMonths
            amount
            currency
            paymentWay
            transactionId
          }
          profession
          AithreadId
          AiConversations {
            __typename
            question
            answer
            date
          }
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              includedCardPacksIds {
                __typename
                id
                imgUrl
                description
                tags
                categories
                cards {
                  __typename
                  categoryName
                  categoryStepNumber
                  cardsImages {
                    __typename
                    backImgUrl
                    frontImgUrl
                  }
                }
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
                isOwnedByOrg
                brief
                likesCounter
                visitorsCounter
                backImgUrl
                isExternalPack
                authorizedDomains
                subscriptionPlans {
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
                  orgMembership {
                    __typename
                    id
                    name
                    trialPeriodInDays
                    numberOfallowedCardsPacks
                    about {
                      __typename
                      text
                      imgUrl
                      link
                    }
                    createdAt
                    updatedAt
                  }
                  subscriptionProviderPlanId
                  createdAt
                  updatedAt
                }
                topQuestions
                usersUsage {
                  __typename
                  user
                  entries
                }
                isFree
                language
                isActive
                guidebookUrl
                ownerName
                numberOfCards
                isHardCopyAvailable
                videoUrl
                isReadingGuidebookAMust
                createdAt
                updatedAt
              }
              cancellationDate
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
              couponCode
              discount
              trialPeriodInDays
              allowedCardsPacks
              organization {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            cardsPacksIds
            providerTransactionId
            fullName
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            endOfTrialDate
            createdAt
            updatedAt
            favouritePacks
            entries
            externalPacksSubscriptions {
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
                orgMembership {
                  __typename
                  id
                  name
                  trialPeriodInDays
                  numberOfallowedCardsPacks
                  about {
                    __typename
                    text
                    imgUrl
                    link
                  }
                  createdAt
                  updatedAt
                }
                subscriptionProviderPlanId
                createdAt
                updatedAt
              }
              includedCardPacksIds {
                __typename
                id
                imgUrl
                description
                tags
                categories
                cards {
                  __typename
                  categoryName
                  categoryStepNumber
                  cardsImages {
                    __typename
                    backImgUrl
                    frontImgUrl
                  }
                }
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
                isOwnedByOrg
                brief
                likesCounter
                visitorsCounter
                backImgUrl
                isExternalPack
                authorizedDomains
                subscriptionPlans {
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
                  orgMembership {
                    __typename
                    id
                    name
                    trialPeriodInDays
                    numberOfallowedCardsPacks
                    about {
                      __typename
                      text
                      imgUrl
                      link
                    }
                    createdAt
                    updatedAt
                  }
                  subscriptionProviderPlanId
                  createdAt
                  updatedAt
                }
                topQuestions
                usersUsage {
                  __typename
                  user
                  entries
                }
                isFree
                language
                isActive
                guidebookUrl
                ownerName
                numberOfCards
                isHardCopyAvailable
                videoUrl
                isReadingGuidebookAMust
                createdAt
                updatedAt
              }
              cancellationDate
              nextBillingDate
            }
            entryDates
            refId
            myAffiliate {
              __typename
              id
              affiliateUrl
              contactEmail
              phoneNumber
              websiteURL
              paymentDetails
              commissionPercentage
              dateJoined
              status
              balance
              withdraws {
                __typename
                id
                date
                amount
                currency
                paymentWay
                transactionId
              }
              createdAt
              updatedAt
            }
            payments {
              __typename
              id
              date
              payedMonths
              amount
              currency
              paymentWay
              transactionId
            }
            profession
            AithreadId
            AiConversations {
              __typename
              question
              answer
              date
            }
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
  async GetAffiliate(id: string): Promise<GetAffiliateQuery> {
    const statement = `query GetAffiliate($id: ID!) {
        getAffiliate(id: $id) {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
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
    return <GetAffiliateQuery>response.data.getAffiliate;
  }
  async ListAffiliates(
    filter?: ModelAffiliateFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListAffiliatesQuery> {
    const statement = `query ListAffiliates($filter: ModelAffiliateFilterInput, $limit: Int, $nextToken: String) {
        listAffiliates(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            affiliateUrl
            contactEmail
            phoneNumber
            websiteURL
            paymentDetails
            commissionPercentage
            dateJoined
            status
            balance
            withdraws {
              __typename
              id
              date
              amount
              currency
              paymentWay
              transactionId
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
    return <ListAffiliatesQuery>response.data.listAffiliates;
  }
  async GetCouponCodes(id: string): Promise<GetCouponCodesQuery> {
    const statement = `query GetCouponCodes($id: ID!) {
        getCouponCodes(id: $id) {
          __typename
          id
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
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
            couponCode
            discount
            trialPeriodInDays
            allowedCardsPacks
            organization {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
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
    return <ListCouponCodessQuery>response.data.listCouponCodess;
  }
  async GetOrganizations(id: string): Promise<GetOrganizationsQuery> {
    const statement = `query GetOrganizations($id: ID!) {
        getOrganizations(id: $id) {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
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
    return <GetOrganizationsQuery>response.data.getOrganizations;
  }
  async ListOrganizationss(
    filter?: ModelOrganizationsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListOrganizationssQuery> {
    const statement = `query ListOrganizationss($filter: ModelOrganizationsFilterInput, $limit: Int, $nextToken: String) {
        listOrganizationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            membersEmails
            membership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            verifyPersonByEmail
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
    return <ListOrganizationssQuery>response.data.listOrganizationss;
  }
  async GetOrganizationMembership(
    id: string
  ): Promise<GetOrganizationMembershipQuery> {
    const statement = `query GetOrganizationMembership($id: ID!) {
        getOrganizationMembership(id: $id) {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
    return <GetOrganizationMembershipQuery>(
      response.data.getOrganizationMembership
    );
  }
  async ListOrganizationMemberships(
    filter?: ModelOrganizationMembershipFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListOrganizationMembershipsQuery> {
    const statement = `query ListOrganizationMemberships($filter: ModelOrganizationMembershipFilterInput, $limit: Int, $nextToken: String) {
        listOrganizationMemberships(
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
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
    return <ListOrganizationMembershipsQuery>(
      response.data.listOrganizationMemberships
    );
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
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
  async GetInvoices(id: string): Promise<GetInvoicesQuery> {
    const statement = `query GetInvoices($id: ID!) {
        getInvoices(id: $id) {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
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
    return <GetInvoicesQuery>response.data.getInvoices;
  }
  async ListInvoicess(
    filter?: ModelInvoicesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListInvoicessQuery> {
    const statement = `query ListInvoicess($filter: ModelInvoicesFilterInput, $limit: Int, $nextToken: String) {
        listInvoicess(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            fullName
            customerAddress
            date
            invoiceRunningId
            items {
              __typename
              itemName
              pricePerItem
              numberOfItems
            }
            businessName
            businessPhoneNumber
            businessAddress
            businessWebsite
            invoiceType
            s3Url
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
    return <ListInvoicessQuery>response.data.listInvoicess;
  }
  async GetReceiptsId(id: string): Promise<GetReceiptsIdQuery> {
    const statement = `query GetReceiptsId($id: ID!) {
        getReceiptsId(id: $id) {
          __typename
          id
          counter
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
    return <GetReceiptsIdQuery>response.data.getReceiptsId;
  }
  async ListReceiptsIds(
    filter?: ModelReceiptsIdFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListReceiptsIdsQuery> {
    const statement = `query ListReceiptsIds($filter: ModelReceiptsIdFilterInput, $limit: Int, $nextToken: String) {
        listReceiptsIds(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            counter
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
    return <ListReceiptsIdsQuery>response.data.listReceiptsIds;
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
  async GetCardsPack(id: string, link: string): Promise<GetCardsPackQuery> {
    const statement = `query GetCardsPack($id: ID!, $link: String) {
        getCardsPack(id: $id) {
          __typename
          id
          imgUrl
          description
          tags
          categories
          cards (link: $link) {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id, link
    };
    const response = (await API.graphql(
      { query: statement,
        variables: gqlAPIServiceArguments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY}
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
            tags
            categories
            cards {
              __typename
              categoryName
              categoryStepNumber
              cardsImages {
                __typename
                backImgUrl
                frontImgUrl
              }
            }
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
            isOwnedByOrg
            brief
            likesCounter
            visitorsCounter
            backImgUrl
            isExternalPack
            authorizedDomains
            subscriptionPlans {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            topQuestions
            usersUsage {
              __typename
              user
              entries
            }
            isFree
            language          
            ownerName
            numberOfCards
            isHardCopyAvailable
            isActive
            videoUrl
            isReadingGuidebookAMust
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
            cards {
              __typename
              categoryName
              categoryStepNumber
              cardsImages {
                __typename
                backImgUrl
                frontImgUrl
              }
            }
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
            isOwnedByOrg
            brief
            likesCounter
            visitorsCounter
            backImgUrl
            isExternalPack
            authorizedDomains
            subscriptionPlans {
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
              orgMembership {
                __typename
                id
                name
                trialPeriodInDays
                numberOfallowedCardsPacks
                about {
                  __typename
                  text
                  imgUrl
                  link
                }
                createdAt
                updatedAt
              }
              subscriptionProviderPlanId
              createdAt
              updatedAt
            }
            topQuestions
            usersUsage {
              __typename
              user
              entries
            }
            isFree
            language
            isActive
            guidebookUrl
            ownerName
            numberOfCards
            isHardCopyAvailable
            videoUrl
            isReadingGuidebookAMust
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
  async GetContactUsModel(id: string): Promise<GetContactUsModelQuery> {
    const statement = `query GetContactUsModel($id: ID!) {
        getContactUsModel(id: $id) {
          __typename
          id
          name
          content
          email
          phone
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
            phone
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
  OnCreateCommonLinkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCommonLink">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCommonLink {
        onCreateCommonLink {
          __typename
          id
          experationDate
          createdBy
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCommonLink">>
  >;

  OnUpdateCommonLinkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCommonLink">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCommonLink {
        onUpdateCommonLink {
          __typename
          id
          experationDate
          createdBy
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCommonLink">>
  >;

  OnDeleteCommonLinkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCommonLink">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCommonLink {
        onDeleteCommonLink {
          __typename
          id
          experationDate
          createdBy
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCommonLink">>
  >;

  OnCreateAffiliateListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateAffiliate">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateAffiliate {
        onCreateAffiliate {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateAffiliate">>
  >;

  OnUpdateAffiliateListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateAffiliate">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateAffiliate {
        onUpdateAffiliate {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateAffiliate">>
  >;

  OnDeleteAffiliateListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteAffiliate">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteAffiliate {
        onDeleteAffiliate {
          __typename
          id
          affiliateUrl
          contactEmail
          phoneNumber
          websiteURL
          paymentDetails
          commissionPercentage
          dateJoined
          status
          balance
          withdraws {
            __typename
            id
            date
            amount
            currency
            paymentWay
            transactionId
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteAffiliate">>
  >;

  OnCreateCouponCodesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCouponCodes">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCouponCodes {
        onCreateCouponCodes {
          __typename
          id
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCouponCodes">>
  >;

  OnUpdateCouponCodesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCouponCodes">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCouponCodes {
        onUpdateCouponCodes {
          __typename
          id
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCouponCodes">>
  >;

  OnDeleteCouponCodesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCouponCodes">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCouponCodes {
        onDeleteCouponCodes {
          __typename
          id
          couponCode
          discount
          trialPeriodInDays
          allowedCardsPacks
          organization {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCouponCodes">>
  >;

  OnCreateOrganizationsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateOrganizations">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateOrganizations {
        onCreateOrganizations {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateOrganizations">>
  >;

  OnUpdateOrganizationsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateOrganizations">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateOrganizations {
        onUpdateOrganizations {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateOrganizations">>
  >;

  OnDeleteOrganizationsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteOrganizations">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteOrganizations {
        onDeleteOrganizations {
          __typename
          id
          membersEmails
          membership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          verifyPersonByEmail
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteOrganizations">>
  >;

  OnCreateOrganizationMembershipListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateOrganizationMembership">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateOrganizationMembership {
        onCreateOrganizationMembership {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateOrganizationMembership">
    >
  >;

  OnUpdateOrganizationMembershipListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateOrganizationMembership">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateOrganizationMembership {
        onUpdateOrganizationMembership {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateOrganizationMembership">
    >
  >;

  OnDeleteOrganizationMembershipListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteOrganizationMembership">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteOrganizationMembership {
        onDeleteOrganizationMembership {
          __typename
          id
          name
          trialPeriodInDays
          numberOfallowedCardsPacks
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
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteOrganizationMembership">
    >
  >;

  OnCreateGroupListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateGroup">>
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateGroup">>
  >;

  OnUpdateGroupListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateGroup">>
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateGroup">>
  >;

  OnDeleteGroupListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteGroup">>
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteGroup">>
  >;

  OnCreateMessageQueueListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessageQueue">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessageQueue">>
  >;

  OnUpdateMessageQueueListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessageQueue">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessageQueue">>
  >;

  OnDeleteMessageQueueListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessageQueue">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessageQueue">>
  >;

  OnCreateInvoicesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateInvoices">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateInvoices {
        onCreateInvoices {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateInvoices">>
  >;

  OnUpdateInvoicesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateInvoices">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateInvoices {
        onUpdateInvoices {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateInvoices">>
  >;

  OnDeleteInvoicesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteInvoices">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteInvoices {
        onDeleteInvoices {
          __typename
          id
          email
          fullName
          customerAddress
          date
          invoiceRunningId
          items {
            __typename
            itemName
            pricePerItem
            numberOfItems
          }
          businessName
          businessPhoneNumber
          businessAddress
          businessWebsite
          invoiceType
          s3Url
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteInvoices">>
  >;

  OnCreateSubscriptionPlanListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateSubscriptionPlan">
    >
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateSubscriptionPlan">
    >
  >;

  OnUpdateSubscriptionPlanListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateSubscriptionPlan">
    >
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateSubscriptionPlan">
    >
  >;

  OnDeleteSubscriptionPlanListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteSubscriptionPlan">
    >
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
          orgMembership {
            __typename
            id
            name
            trialPeriodInDays
            numberOfallowedCardsPacks
            about {
              __typename
              text
              imgUrl
              link
            }
            createdAt
            updatedAt
          }
          subscriptionProviderPlanId
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteSubscriptionPlan">
    >
  >;

  OnCreateReceiptsIdListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateReceiptsId">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateReceiptsId {
        onCreateReceiptsId {
          __typename
          id
          counter
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateReceiptsId">>
  >;

  OnUpdateReceiptsIdListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateReceiptsId">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateReceiptsId {
        onUpdateReceiptsId {
          __typename
          id
          counter
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateReceiptsId">>
  >;

  OnDeleteReceiptsIdListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteReceiptsId">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteReceiptsId {
        onDeleteReceiptsId {
          __typename
          id
          counter
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteReceiptsId">>
  >;

  OnCreateNewsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateNews">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateNews">>
  >;

  OnUpdateNewsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateNews">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateNews">>
  >;

  OnDeleteNewsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteNews">>
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
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteNews">>
  >;

  OnCreateCardsPackListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCardsPack">>
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCardsPack">>
  >;

  OnUpdateCardsPackListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCardsPack">>
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCardsPack">>
  >;

  OnDeleteCardsPackListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCardsPack">>
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
          cards {
            __typename
            categoryName
            categoryStepNumber
            cardsImages {
              __typename
              backImgUrl
              frontImgUrl
            }
          }
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
                      subElements {
                        __typename
                        name
                      }
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
          isOwnedByOrg
          brief
          likesCounter
          visitorsCounter
          backImgUrl
          isExternalPack
          authorizedDomains
          subscriptionPlans {
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
            orgMembership {
              __typename
              id
              name
              trialPeriodInDays
              numberOfallowedCardsPacks
              about {
                __typename
                text
                imgUrl
                link
              }
              createdAt
              updatedAt
            }
            subscriptionProviderPlanId
            createdAt
            updatedAt
          }
          topQuestions
          usersUsage {
            __typename
            user
            entries
          }
          isFree
          language
          isActive
          guidebookUrl
          ownerName
          numberOfCards
          isHardCopyAvailable
          videoUrl
          isReadingGuidebookAMust
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCardsPack">>
  >;

  OnCreateContactUsModelListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateContactUsModel">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateContactUsModel {
        onCreateContactUsModel {
          __typename
          id
          name
          content
          email
          phone
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateContactUsModel">
    >
  >;

  OnUpdateContactUsModelListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateContactUsModel">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateContactUsModel {
        onUpdateContactUsModel {
          __typename
          id
          name
          content
          email
          phone
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateContactUsModel">
    >
  >;

  OnDeleteContactUsModelListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteContactUsModel">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteContactUsModel {
        onDeleteContactUsModel {
          __typename
          id
          name
          content
          email
          phone
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteContactUsModel">
    >
  >;
}
