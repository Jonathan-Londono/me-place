import { z, defineCollection } from 'astro:content';

/** Transform elements before use it */
const zz = {
  /** Transform empty strings or null to undefined */
  undef(format) {
    return z.union([z.literal('').transform(() => undefined), z.literal(null).transform(() => undefined), format.nullable()]);
  },
};

const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.date(),
    expirationDate: zz.undef(z.date()),
    author: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string())
  }),
});

const menuCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.date(),
    expirationDate: zz.undef(z.date()),
    author: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string())
  }),
});

const priceCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    type: z.string(),
    price: z.object({
      current: zz.undef(z.number()),
      previous: zz.undef(z.number()),
    }),
    currency: z.string().default('$'),
    popular: z.boolean(),
    description: z.string(),
    features: z.array(z.string()),
    publishDate: z.date(),
    expirationDate: zz.undef(z.date()),
    button: z.object({
      text: z.string(),
      link: z.string(),
    }),
    order: zz.undef(z.number()),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'menu': menuCollection,
  'prices': priceCollection,
  'team': teamCollection,
};
