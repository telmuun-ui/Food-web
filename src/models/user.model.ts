import { Schema, model, models, Types, Model } from "mongoose";

export enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}


export type User = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: Types.ObjectId[];
  ttl: Date;
  isVerified: boolean;
};

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
    },

    orderedFoods: [
      {
        type: Schema.Types.ObjectId,
        ref: "FoodOrder",
      },
    ],

    ttl: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 24),
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);
export const UserModel: Model<User> =
  models.User || model<User>("User", UserSchema);
