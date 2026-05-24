import { UserRoleEnum } from "../enum/user";

export const USER_ROLE_OPTIONS = [
  {
    label: "Shop Admin",
    value: UserRoleEnum.SHOP_ADMIN,
  },
  {
    label: "Branch Admin",
    value: UserRoleEnum.BRANCH_ADMIN,
  },
  {
    label: "Pharmacist",
    value: UserRoleEnum.PHARMACIST,
  },
  {
    label: "Inventory Manager",
    value: UserRoleEnum.INVENTORY_MANAGER,
  },
  {
    label: "POS User",
    value: UserRoleEnum.POS_USER,
  },
  {
    label: "Delivery",
    value: UserRoleEnum.DELIVERY,
  },
  {
    label: "Accountant",
    value: UserRoleEnum.ACCOUNTANT,
  },
  {
    label: "Staff",
    value: UserRoleEnum.STAFF,
  },
];