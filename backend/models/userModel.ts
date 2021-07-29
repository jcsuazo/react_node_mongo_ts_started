// import { Schema, model, Document, Model } from 'mongoose';
import { Document, Model, model, Types, Schema, Query } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserDocument extends IUser, Document {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // let plaintext = this.get('password');
  // this.set('password', await bcrypt.hash(plaintext, salt));
  // (this as any).password = await bcrypt.hash((this as any).password, salt)
});
const User = model<UserDocument>('User', userSchema);

export default User;
