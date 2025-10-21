import Joi from 'joi';

const stringRule = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: stringRule.required(),
  phoneNumber: stringRule.required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal', 'general').required(),
});

export const updateContactSchema = Joi.object({
  name: stringRule,
  phoneNumber: stringRule,
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal', 'general'),
});
