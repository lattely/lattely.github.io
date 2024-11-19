import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 'getting-started-with-react',
    title: 'Getting Started with React in 2024',
    date: '2024-11-15',
    excerpt: 'A comprehensive guide to starting with React in 2024, covering the latest features and best practices.',
    content: `
# Getting Started with React in 2024

React continues to evolve and improve, making it an excellent choice for building modern web applications. In this guide, we'll explore the latest features and best practices.

## Setting Up Your Development Environment

First, ensure you have Node.js installed on your system. Then, you can create a new React project using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
\`\`\`

## Key Concepts

### 1. Components

React components are the building blocks of your application:

\`\`\`tsx
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}
\`\`\`

### 2. Hooks

Hooks are a powerful way to add state and side effects to your components:

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Best Practices

1. Use TypeScript for better type safety
2. Implement proper error boundaries
3. Follow the React component lifecycle
4. Optimize performance with useMemo and useCallback
`,
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: 'how-to-test-with-react',
    title: 'How to with React in 2024',
    date: '2024-11-15',
    excerpt: 'A comprehensive guide to starting with React in 2024, covering the latest features and best practices.',
    content: `
# Getting Started with React in 2024

React continues to evolve and improve, making it an excellent choice for building modern web applications. In this guide, we'll explore the latest features and best practices.

## Setting Up Your Development Environment

First, ensure you have Node.js installed on your system. Then, you can create a new React project using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
\`\`\`

## Key Concepts

### 1. Components

React components are the building blocks of your application:

\`\`\`tsx
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}
\`\`\`

### 2. Hooks

Hooks are a powerful way to add state and side effects to your components:

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Best Practices

1. Use TypeScript for better type safety
2. Implement proper error boundaries
3. Follow the React component lifecycle
4. Optimize performance with useMemo and useCallback
`,
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: 'mastering-typescript',
    title: 'Mastering TypeScript: Advanced Techniques',
    date: '2024-11-10',
    excerpt: 'Dive deep into TypeScripts advanced features and learn how to leverage them in your projects.',
    content: `
# Mastering TypeScript: Advanced Techniques

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Conditional Types

Learn how to create powerful type transformations:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## Best Practices

1. Use strict mode
2. Leverage type inference
3. Implement proper error handling
`,
    tags: ['TypeScript', 'Programming', 'Web Development']
  },
  {
    id: 'web-performance',
    title: 'Optimizing Web Performance',
    date: '2024-11-05',
    excerpt: 'Learn essential techniques for improving your websites performance and user experience.',
    content: `
# Optimizing Web Performance

Performance is crucial for providing a great user experience. Here's how to optimize your web applications.

## Key Metrics

1. First Contentful Paint (FCP)
2. Largest Contentful Paint (LCP)
3. Time to Interactive (TTI)

## Optimization Techniques

### 1. Code Splitting

\`\`\`typescript
const MyComponent = lazy(() => import('./MyComponent'));
\`\`\`

### 2. Image Optimization

Use modern image formats and proper sizing:

\`\`\`html
<img
  srcset="image-400.jpg 400w, image-800.jpg 800w"
  sizes="(max-width: 400px) 400px, 800px"
  src="image-800.jpg"
  alt="Optimized image"
/>
\`\`\`

## Best Practices

1. Implement proper caching
2. Use CDNs
3. Optimize bundle size
`,
    tags: ['Performance', 'Web Development', 'Optimization']
  }
];